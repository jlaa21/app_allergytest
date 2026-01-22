import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { BackButton } from '@/components/back-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
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
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Condiciones de Uso y Política de Privacidad</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground space-y-6">
            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">1. Aceptación de los Términos</h2>
              <p>Al utilizar la aplicación AllergyTest (en adelante, "la App"), usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso. Si no está de acuerdo con estos términos, no debe utilizar la App.</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">2. Propósito y Exención de Responsabilidad Médica</h2>
              <p>La App está diseñada como una herramienta de referencia y apoyo para profesionales de la salud cualificados. La información proporcionada no sustituye el juicio clínico profesional. Los desarrolladores no se hacen responsables de ninguna decisión clínica que pueda surgir del uso de esta herramienta. Es responsabilidad exclusiva del usuario verificar y aplicar la información según su criterio.</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">3. Política de Privacidad y Protección de Datos</h2>
              <p>Su privacidad es fundamental. Esta aplicación opera de forma completamente anónima.</p>
              
              <div className="pl-4 border-l-2 border-primary/50 space-y-2">
                <h3 className="text-lg font-semibold text-foreground">3.1. No Recopilación de Datos</h3>
                <p>La App no requiere la creación de cuentas de usuario y no recopila, almacena ni procesa ningún tipo de información personal, incluyendo, entre otros, correos electrónicos, nombres o datos de pacientes.</p>
              </div>

               <div className="pl-4 border-l-2 border-primary/50 space-y-2 mt-4">
                <h3 className="text-lg font-semibold text-foreground">3.2. Uso Anónimo</h3>
                 <p>El uso de la calculadora y la consulta de la base de datos son completamente anónimos. No se asocia ninguna actividad dentro de la aplicación a ningún individuo.</p>
              </div>

               <div className="pl-4 border-l-2 border-primary/50 space-y-2 mt-4">
                <h3 className="text-lg font-semibold text-foreground">3.3. Uso de Cookies y Análisis</h3>
                 <p>La App no utiliza cookies de seguimiento ni servicios de análisis de terceros. Solo se emplean los mecanismos técnicos esenciales para el funcionamiento básico del sitio web, sin rastrear la actividad del usuario.</p>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">4. Propiedad Intelectual</h2>
              <p>El contenido, diseño y código de la App son propiedad de sus desarrolladores y están protegidos por las leyes de propiedad intelectual. No está permitida su reproducción, distribución o modificación sin el consentimiento explícito por escrito.</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">5. Modificaciones de los Términos</h2>
              <p>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. El uso continuado de la App después de la publicación de cambios constituye la aceptación de dichos cambios.</p>
            </section>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
