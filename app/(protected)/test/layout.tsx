import { AppSidebar } from "@/components/appSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import HomePageHeader from "./header";

export default function LayoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HomePageHeader></HomePageHeader>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger className="mt-13 " />

          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
