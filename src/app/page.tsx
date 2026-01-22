import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, FileText, TestTube2 } from 'lucide-react';

export default function Home() {

  const featureCards = [
    {
      title: 'Base de Datos de Fármacos',
      description: 'Consulta fármacos y concentraciones para tests de alergia.',
      href: '/database',
      icon: <TestTube2 className="size-10 text-primary" />,
    },
    {
      title: 'Calculadora de Concentraciones',
      description: 'Calcula diluciones para fármacos inyectables.',
      href: '/calculator',
      icon: <Calculator className="size-10 text-primary" />,
    },
    {
      title: 'Protocolo de Pruebas',
      description: 'Guías para realizar tests prick e intradérmicos.',
      href: '/testing-protocol',
      icon: <FileText className="size-10 text-primary" />,
    },
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-4 mb-4">
        <h1 className="font-headline text-3xl font-bold tracking-tight uppercase">
          AllergyTest
        </h1>
        <p className="text-muted-foreground">
          Tu recurso completo para concentraciones y protocolos de pruebas de alergia.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featureCards.map((feature) => (
          <Card key={feature.title} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">{feature.title}</CardTitle>
              {feature.icon}
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
            <div className="p-6 pt-0">
              <Button asChild className="w-full">
                <Link href={feature.href}>
                  Ir a la sección <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
