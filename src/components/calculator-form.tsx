'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { drugs, parseConcentration, type Concentration } from '@/lib/drugs';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Beaker, Pipette, AlertTriangle, TestTube, FileDown, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const formSchema = z.object({
  drugName: z.string().min(1, 'Por favor, selecciona un fármaco.'),
  testType: z.enum(['prick', 'intradermal'], {
    required_error: 'Debes seleccionar un tipo de test.',
  }),
  stockConcentration: z.coerce.number().optional(),
});

export type DilutionStep = {
  step: number;
  from: string;
  solutionVolume: string;
  diluentVolume: string;
  tube: string;
  resultingConcentration: string;
};

export type CalculationResult = {
  drugName: string;
  testType: 'prick' | 'intradermal';
  steps: DilutionStep[];
  stockConcentration: Concentration;
  targetConcentration: Concentration;
};

export function CalculatorForm() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const resultCardRef = useRef<HTMLDivElement>(null);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      drugName: '',
      stockConcentration: undefined,
    },
  });

   function getConcentrationForTest(drug: any, testType: 'prick' | 'intradermal'): string {
    if (testType === 'prick') {
      return drug['Intraepidérmica (prick)'];
    }
    return drug['Intradérmica'];
  }

  const handleExportToPDF = async () => {
    if (!resultCardRef.current || !result) return;
    setIsExporting(true);

    try {
        const canvas = await html2canvas(resultCardRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const width = pdfWidth - 20; // with margin
        const height = width / ratio;

        pdf.addImage(imgData, 'PNG', 10, 10, width, height);

        const filename = `protocolo_${result.drugName.toLowerCase().replace(/ /g, '_')}.pdf`;
        pdf.save(filename);
    } catch (e) {
        console.error("Error exporting to PDF: ", e);
        toast({
            title: "Error de Exportación",
            description: "No se pudo generar el archivo PDF. Por favor, inténtalo de nuevo.",
            variant: "destructive",
        });
    } finally {
        setIsExporting(false);
    }
};

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    setError(null);

    const selectedDrug = drugs.find((d) => d['Nombre medicamento'] === values.drugName);
    if (!selectedDrug) {
      setError('Fármaco seleccionado no encontrado.');
      return;
    }

    let stockConcentration: Concentration | null = null;
    if(values.stockConcentration) {
        stockConcentration = { value: values.stockConcentration, unit: 'mg/mL' };
    } else {
        const stockConcentrationStr = selectedDrug['Intraepidérmica (prick)'];
        stockConcentration = parseConcentration(stockConcentrationStr);
    }
    
    if (!stockConcentration || stockConcentration.value <= 0) {
      setError(`La concentración de stock para "${selectedDrug['Nombre medicamento']}" no está disponible, es cero o no se pudo analizar. Por favor, introduce una concentración de stock manual.`);
      return;
    }
    
    const targetConcentrationStr = getConcentrationForTest(selectedDrug, values.testType);
    const targetConcentration = parseConcentration(targetConcentrationStr, stockConcentration);

    if (!targetConcentration || targetConcentration.value <= 0) {
      setError(`El tipo de test seleccionado (${values.testType}) no es aplicable o tiene una concentración inválida para "${selectedDrug['Nombre medicamento']}".`);
      return;
    }
    
    const C_stock = stockConcentration.value;
    const C_target = targetConcentration.value;

    if (C_target > C_stock) {
        setError(`La concentración objetivo (${C_target.toPrecision(3)} mg/mL) no puede ser mayor que la concentración de stock (${C_stock.toPrecision(3)} mg/mL).`);
        return;
    }

    const baseResult: Omit<CalculationResult, 'steps'> = {
        drugName: values.drugName,
        testType: values.testType,
        stockConcentration,
        targetConcentration,
    };

    if (C_target === C_stock) {
        setResult({
            ...baseResult,
            steps: [{
                step: 1,
                from: "solución de stock",
                solutionVolume: "Usar directamente",
                diluentVolume: "No se necesita dilución",
                tube: "N/A",
                resultingConcentration: `${C_target.toPrecision(3)} mg/mL`,
            }]
        })
        return;
    }

    const steps: DilutionStep[] = [];
    let currentConcentration = C_stock;
    const dilutionFactor = 10;
    
    const totalDilutionFactor = C_stock / C_target;

    if (totalDilutionFactor <= dilutionFactor) {
        const V_final_step = 10; // mL
        const V_source = (C_target * V_final_step) / C_stock;
        const V_diluent = V_final_step - V_source;
        steps.push({
            step: 1,
            from: "solución de stock",
            solutionVolume: `${V_source.toPrecision(2)} mL`,
            diluentVolume: `${V_diluent.toPrecision(2)} mL`,
            tube: `Jeringa/Tubo Final (${V_final_step} mL)`,
            resultingConcentration: `${C_target.toPrecision(3)} mg/mL`,
        });
    } else {
        const numTenFoldDilutions = Math.floor(Math.log10(totalDilutionFactor) - 0.00001);

        for (let i = 1; i <= numTenFoldDilutions; i++) {
            const sourceName = i === 1 ? "solución de stock" : `Tubo ${i - 1}`;
            currentConcentration /= dilutionFactor;
            steps.push({
                step: i,
                from: sourceName,
                solutionVolume: "1 mL",
                diluentVolume: "9 mL",
                tube: `Tubo ${i} (10 mL)`,
                resultingConcentration: `${currentConcentration.toPrecision(3)} mg/mL`,
            });
        }
        
        const finalDilutionNeeded = currentConcentration / C_target;
        if (finalDilutionNeeded > 1) {
            const V_final_step = 10; // mL
            const V_source = V_final_step / finalDilutionNeeded;
            const V_diluent = V_final_step - V_source;
            steps.push({
                step: numTenFoldDilutions + 1,
                from: `Tubo ${numTenFoldDilutions}`,
                solutionVolume: `${V_source.toPrecision(2)} mL`,
                diluentVolume: `${V_diluent.toPrecision(2)} mL`,
                tube: `Jeringa/Tubo Final (${V_final_step} mL)`,
                resultingConcentration: `${C_target.toPrecision(3)} mg/mL`,
            });
        }
    }


    setResult({
        ...baseResult,
        steps,
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="drugName"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Fármaco</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Selecciona un fármaco a diluir" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {drugs.map((drug) => (
                            <SelectItem key={drug['Nombre medicamento']} value={drug['Nombre medicamento']}>
                                {drug['Nombre medicamento']}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="stockConcentration"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Conc. de stock (mg/mL)</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="Opcional, ej: 100" {...field} value={field.value ?? ""} min="0" step="any" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
          <FormField
            control={form.control}
            name="testType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Tipo de Test</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="prick" />
                      </FormControl>
                      <FormLabel className="font-normal">Prick Test</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="intradermal" />
                      </FormControl>
                      <FormLabel className="font-normal">Test Intradérmico</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Calcular Pasos de Dilución</Button>
        </form>
      </Form>
      
      {error && (
        <Alert variant="destructive" className="mt-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error de Cálculo</AlertTitle>
            <AlertDescription>
                {error}
            </AlertDescription>
        </Alert>
      )}

      {result && (
        <div ref={resultCardRef} className="mt-8">
            <Card className="bg-secondary">
            <CardHeader>
                <div className="flex justify-between items-start">
                <div>
                    <CardTitle>Protocolo de Dilución Seriada</CardTitle>
                    <CardDescription className="mt-2">
                        Para alcanzar una concentración final de <strong>{result.targetConcentration.value.toPrecision(3)} mg/mL</strong> desde un stock de <strong>{result.stockConcentration.value.toPrecision(3)} mg/mL</strong>.
                    </CardDescription>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleExportToPDF} disabled={isExporting}>
                        {isExporting ? <Loader2 className="mr-2 size-4 animate-spin" /> : <FileDown className="mr-2 size-4" />}
                        {isExporting ? 'Exportando...' : 'Exportar PDF'}
                    </Button>
                </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col gap-4">
                    {result.steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-background rounded-lg">
                            <div className='flex flex-col items-center gap-1'>
                                <div className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                                    {step.step}
                                </div>
                                {index < result.steps.length - 1 && <div className="w-px h-4 bg-border"></div>}
                            </div>
                            
                            <div className="flex-1">
                                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                    <Pipette className="size-4" />
                                    <span>Tomar <strong>{step.solutionVolume}</strong> de <strong>{step.from}</strong></span>
                                </div>
                                <div className='flex items-center gap-2 text-sm text-muted-foreground mt-2'>
                                    <Beaker className="size-4" />
                                    <span>Añadir a <strong>{step.diluentVolume}</strong> de suero en un(a) <strong>{step.tube}</strong>.</span>
                                </div>
                                <div className='flex items-center gap-2 text-sm font-semibold text-primary mt-3'>
                                    <TestTube className="size-4" />
                                    <span>Concentración Resultante: <strong>{step.resultingConcentration}</strong></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Alert className="mt-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Importante</AlertTitle>
                    <AlertDescription>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Utiliza siempre suero salino estéril para las diluciones.</li>
                            <li>Usa una jeringa estéril nueva para cada transferencia para evitar la contaminación.</li>
                            <li>Etiqueta todos los tubos claramente con la concentración de cada paso.</li>
                        </ul>
                    </AlertDescription>
                </Alert>
            </CardContent>
            </Card>
        </div>
      )}
    </>
  );
}
