import type { Metadata } from 'next';
import { Inter, Roboto_Slab } from 'next/font/google';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-roboto-slab',
});

export const metadata: Metadata = {
  title: 'AllergyTest',
  description: 'Consulta de concentraciones de fármacos para tests prick e intradérmicos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn('font-body antialiased', inter.variable, robotoSlab.variable)}>
        <SidebarProvider>
          <div className="flex min-h-screen">
            <Sidebar>
              <SidebarNav />
            </Sidebar>
            <SidebarInset>
                <Header />
                {children}
            </SidebarInset>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
