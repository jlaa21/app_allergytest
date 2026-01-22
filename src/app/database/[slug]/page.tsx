import { notFound } from 'next/navigation';
import { drugs } from '@/lib/drugs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BackButton } from '@/components/back-button';
import { createSlug } from '@/lib/utils';

type DrugDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
   return drugs.map((drug) => {
    const name = drug['Nombre medicamento'];
    if (!name) return null;
     return {
       slug: createSlug(name),
     }
   }).filter((param): param is { slug: string } => param !== null && param.slug !== '');
}

export default function DrugDetailPage({ params }: DrugDetailPageProps) {
  const drug = drugs.find((d) => {
    const name = d['Nombre medicamento'];
    return name && createSlug(name) === params.slug;
  });

  if (!drug) {
    notFound();
  }
  
  const drugName = drug['Nombre medicamento'];
   if (!drugName) {
    notFound();
  }
  
  const activeIngredient = drugName.split('(')[0].trim();
  const drugBankSearchUrl = `https://go.drugbank.com/unearth/q?searcher=drugs&query=${encodeURIComponent(activeIngredient)}`;

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
      <div className="flex flex-col gap-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">{drugName}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Detalles de Concentración</CardTitle>
                    <CardDescription>Concentraciones estándar para diferentes tipos de tests de alergia.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="font-semibold mb-2">Prick Test (Intraepidérmico)</h3>
                        {drug['Intraepidérmica (prick)'] && drug['Intraepidérmica (prick)'] !== '--' ? (
                             <Badge variant="outline" className="text-base p-2">{drug['Intraepidérmica (prick)']}</Badge>
                        ) : (
                            <p className="text-sm text-muted-foreground">No aplicable o no especificado.</p>
                        )}
                    </div>
                    <Separator />
                     <div>
                        <h3 className="font-semibold mb-2">Test Intradérmico</h3>
                        {drug.Intradérmica && drug.Intradérmica !== '--' ? (
                             <Badge variant="outline" className="text-base p-2">{drug.Intradérmica}</Badge>
                        ) : (
                            <p className="text-sm text-muted-foreground">No aplicable o no especificado.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Recursos Externos</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                      <a href={drugBankSearchUrl} target="_blank" rel="noopener noreferrer">
                        <Search className="mr-2 size-4" />
                        Buscar en DrugBank
                      </a>
                    </Button>
                </CardContent>
            </Card>
        </div>
        
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Aviso Legal</CardTitle>
                </CardHeader>
                <CardContent>
                   <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Solo como Referencia</AlertTitle>
                        <AlertDescription>
                            La información proporcionada es para fines de referencia. Consulta siempre la documentación oficial y ejerce el juicio médico profesional.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
