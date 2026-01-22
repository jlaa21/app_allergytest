'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { createSlug } from '@/lib/utils';
import type { Drug } from '@/lib/drugs';

interface DrugSearchProps {
  drugs: Drug[];
}

export function DrugSearch({ drugs }: DrugSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrugs = drugs.filter((drug) =>
    drug['Nombre medicamento']?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar un fármaco..."
          className="w-full rounded-lg bg-background pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDrugs.map((drug, index) => {
          const drugName = drug['Nombre medicamento'];
          if (!drugName) return null;
          const slug = createSlug(drugName);
          if (!slug) return null;

          return (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{drugName}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-muted-foreground">Prick Test:</span>
                    {drug['Intraepidérmica (prick)'] && drug['Intraepidérmica (prick)'] !== '--' && drug['Intraepidérmica (prick)'] !== '–' ? (
                        <Badge variant="secondary">{drug['Intraepidérmica (prick)']}</Badge>
                    ) : (
                        <span className="text-xs text-muted-foreground">N/A</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-muted-foreground">Intradérmico:</span>
                    {drug['Intradérmica'] && drug['Intradérmica'] !== '--' && drug['Intradérmica'] !== '–' ? (
                        <Badge variant="secondary">{drug['Intradérmica']}</Badge>
                    ) : (
                        <span className="text-xs text-muted-foreground">N/A</span>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/database/${slug}`}>
                    Ver Detalles <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      {filteredDrugs.length === 0 && (
         <Card className="md:col-span-2 lg:col-span-3 xl:col-span-4">
            <CardContent className="p-10 flex flex-col items-center justify-center gap-4 text-center">
                <Search className="size-12 text-muted-foreground" />
                <h3 className="font-semibold text-xl">No se encontraron fármacos</h3>
                <p className="text-muted-foreground">Tu búsqueda de "{searchTerm}" no coincidió con ningún fármaco.</p>
            </CardContent>
         </Card>
      )}
    </>
  );
}
