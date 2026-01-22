import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { BackButton } from '@/components/back-button';

const prickTestSteps = [
    "Limpiar el área de la prueba (ej., antebrazo o espalda) con alcohol y dejar secar.",
    "Colocar una pequeña gota de cada extracto de alérgeno sobre la piel, a unos 2-3 cm de distancia. Incluir controles positivo (histamina) y negativo (solución salina).",
    "Usar una lanceta estéril para picar suavemente la piel a través de cada gota. Usar una lanceta nueva para cada alérgeno.",
    "Esperar 15-20 minutos. No permitir que el paciente se rasque o frote el área de la prueba.",
    "Observar la piel en busca de una pápula (una protuberancia elevada, roja y que pica) y eritema (enrojecimiento alrededor de la pápula).",
    "Medir el diámetro de la pápula y el eritema para cada alérgeno. Una pápula de 3 mm o más que el control negativo se considera típicamente positiva.",
    "Registrar los resultados y limpiar el área de la prueba."
];

const intradermalTestSteps = [
    "Preparar las diluciones del alérgeno según la calculadora o los protocolos estándar. Comenzar con la dilución más alta (concentración más baja).",
    "Limpiar el área de la prueba (típicamente el antebrazo) con alcohol.",
    "Usando una jeringa de tuberculina, inyectar una pequeña cantidad (aprox. 0.02 ml) del alérgeno por vía intradérmica para levantar una pequeña ampolla (de unos 3 mm).",
    "Inyectar los controles positivo y negativo de la misma manera.",
    "Esperar 15-20 minutos, vigilando de cerca al paciente por cualquier reacción adversa.",
    "Medir el diámetro de la pápula que se forma. Una pápula que crece 3 mm o más desde la ampolla inicial generalmente se considera positiva.",
    "Si la prueba inicial es negativa, proceder a la siguiente concentración más alta si así lo indica la estrategia de prueba.",
    "Tener siempre a mano equipo y medicamentos de emergencia (ej., epinefrina) debido al mayor riesgo de reacciones sistémicas."
];


export default function TestingProtocolPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <div className="flex justify-start gap-2">
        <BackButton />
        <Button variant="outline" asChild>
          <Link href="/">
            <Home className="mr-2 size-4" />
            Volver al inicio
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Protocolos de Pruebas
        </h1>
        <p className="text-muted-foreground">
          Guías paso a paso para realizar pruebas de alergia prick e intradérmicas.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="prick-test">
              <AccordionTrigger className="px-6 py-4 text-lg">Protocolo de Prick Test</AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <ol className="list-decimal pl-5 space-y-3 text-muted-foreground">
                    {prickTestSteps.map((step, index) => <li key={index}>{step}</li>)}
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="intradermal-test">
              <AccordionTrigger className="px-6 py-4 text-lg">Protocolo de Test Intradérmico</AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                 <div className="bg-destructive/10 border-l-4 border-destructive text-destructive p-4 rounded-md mb-4">
                    <p className="font-bold">¡Atención!</p>
                    <p>Las pruebas intradérmicas tienen un mayor riesgo de reacciones sistémicas que las pruebas prick. Realizar con precaución y asegurarse de que los protocolos de emergencia estén en su lugar.</p>
                 </div>
                <ol className="list-decimal pl-5 space-y-3 text-muted-foreground">
                    {intradermalTestSteps.map((step, index) => <li key={index}>{step}</li>)}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </main>
  );
}
