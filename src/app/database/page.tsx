import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { BackButton } from '@/components/back-button';
import { drugs } from '@/lib/drugs';
import { DrugSearch } from '@/components/drug-search';

export default function DatabasePage() {
  
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
      <div className="flex flex-col gap-4">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Base de Datos de Fármacos
        </h1>
        <p className="text-muted-foreground">
          Navega y busca fármacos y sus concentraciones estándar para pruebas de alergia.
        </p>
        <DrugSearch drugs={drugs} />
      </div>
    </main>
  );
}
