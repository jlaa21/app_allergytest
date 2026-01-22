'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { MoreVertical, Info, FileText, Share2, Star, BookType } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { UserNav } from './user-nav';

export function Header() {
  const { toast } = useToast();

  const handleRecommend = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AllergyTest App',
          text: '¡Echa un vistazo a esta útil aplicación para protocolos y cálculos de pruebas de alergia!',
          url: window.location.origin,
        });
      } catch (error) {
        // No loguear el error si es una cancelación del usuario.
        if (error instanceof Error && error.name !== 'AbortError') {
            toast({
            title: 'Error',
            description: 'No se pudo compartir la aplicación en este momento.',
            variant: 'destructive',
            });
        }
      }
    } else {
      toast({
        title: 'Compartir no disponible',
        description: 'Tu navegador no es compatible con la API para compartir.',
      });
    }
  };

  return (
    <header className="flex h-14 items-center justify-end gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <UserNav />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="size-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Info className="mr-2 size-4" />
                <span>Acerca de</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Acerca de AllergyTest</AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="text-sm text-muted-foreground space-y-4 pt-4">
                    <p>Esta app va dirigida a todo el personal sanitario que quiera complementar sus conocimientos relacionados con la realización de pruebas cutáneas en alergología. En su diseño se ha tenido en cuenta su orientación práctica con el fin de que sea de especial utilidad para el alergólogo/a y el personal de enfermería.</p>
                    <p>Toda la información ha sido recopilada y revisada cuidadosamente a partir de evidencia científica en vigor. Las fuentes utilizadas han sido las guías clínicas y documentos de las principales sociedades científicas que se basan en la revisión sistemática de la literatura y los estudios de validación.</p>
                    <p>El objetivo de esta app es facilitar la práctica clínica diaria con los mejores estándares de seguridad y calidad.</p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Cerrar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <BookType className="mr-2 size-4" />
                <span>Abreviaturas</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Glosario de Abreviaturas</AlertDialogTitle>
                <div className="text-sm text-muted-foreground pt-4">
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong className="text-foreground">TC:</strong> Test Cutáneo. Se refiere al uso del fármaco en su concentración comercial sin diluir para el prick test.</li>
                    <li><strong className="text-foreground">C:</strong> Concentración comercial del fármaco sin diluir.</li>
                    <li><strong className="text-foreground">UI:</strong> Unidades Internacionales.</li>
                    <li><strong className="text-foreground">mg/mL, µg/mL:</strong> Miligramos o microgramos por mililitro, unidades de concentración.</li>
                    <li><strong className="text-foreground">--, –, N/A:</strong> Indica que el test no es aplicable, no se recomienda o no hay datos disponibles.</li>
                  </ul>
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Entendido</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DropdownMenuItem asChild>
            <Link href="/privacy-policy">
              <FileText className="mr-2 size-4" />
              <span>Condiciones de uso</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
               <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Share2 className="mr-2 size-4" />
                <span>Recomienda</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Recomendar AllergyTest</AlertDialogTitle>
                <AlertDialogDescription>
                  Comparte esta aplicación con tus colegas para ayudarles a acceder a protocolos y cálculos de pruebas de alergia de manera rápida y sencilla.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleRecommend}>Compartir ahora</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>


          <DropdownMenuItem asChild>
            <a href="https://play.google.com/store/apps" target="_blank" rel="noopener noreferrer">
              <Star className="mr-2 size-4" />
              <span>Puntúa</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
