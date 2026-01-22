import { CalculatorForm } from '@/components/calculator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, FlaskConical, Beaker } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BackButton } from '@/components/back-button';

export default function CalculatorPage() {
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
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex flex-col gap-2 mb-8 text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight">
            Calculadora de Concentración
            </h1>
            <p className="text-muted-foreground">
            Calcula diluciones seriadas para fármacos inyectables de la base de datos.
            </p>
        </div>

        <Alert className="mb-8">
            <Beaker className="h-4 w-4" />
            <AlertTitle>Método de Dilución Seriada (1:10)</AlertTitle>
            <AlertDescription>
                <p>Esta calculadora genera instrucciones paso a paso para realizar diluciones seriadas 1:10 para alcanzar la concentración de test deseada desde una solución madre.</p>
                 <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                    <li><b>Dilución Estándar:</b> 1 parte de solución + 9 partes de diluyente (ej. suero salino).</li>
                    <li><b>Ejemplo:</b> 1 ml de solución madre + 9 ml de suero salino en un tubo de 10 ml.</li>
                </ul>
            </AlertDescription>
        </Alert>
        
        <Card>
            <CardHeader>
                <CardTitle>Calculadora de Dilución</CardTitle>
                <CardDescription>Selecciona un fármaco y el tipo de test para calcular las diluciones seriadas requeridas.</CardDescription>
            </CardHeader>
            <CardContent>
                <CalculatorForm />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
