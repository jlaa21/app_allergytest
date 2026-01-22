"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Calculator,
  FileText,
  LayoutDashboard,
  TestTube2,
} from "lucide-react";

export function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Inicio", icon: LayoutDashboard },
    { href: "/database", label: "Base de Datos", icon: TestTube2 },
    { href: "/calculator", label: "Calculadora", icon: Calculator },
    { href: "/testing-protocol", label: "Protocolo", icon: FileText },
  ];

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary">
                <TestTube2 className="size-5 text-primary-foreground" />
            </div>
            <h1 className="font-headline text-lg font-bold">AllergyTest</h1>
            <div className="ml-auto">
                <SidebarTrigger />
            </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs text-muted-foreground p-2">
          © 2024 AllergyTest. Todos los derechos reservados.
        </p>
      </SidebarFooter>
    </>
  );
}
