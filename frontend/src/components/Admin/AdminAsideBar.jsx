import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ListCheck, 
  PanelLeftClose, 
  PanelLeft 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: ShoppingBag,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: ListCheck,
  },
];

export function AdminAsideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, toggleSidebar, setOpenMobile, isMobile } = useSidebar();

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar 
      collapsible="icon" //Réduit la barre en barre d'icônes au lieu de la cacher !
      className="border-r border-slate-300 bg-white"
    >
      <SidebarHeader className="p-3">
        <div className="flex items-center justify-between w-full">
          <div 
            onClick={() => handleNavigation("/admin/dashboard")}
            className="flex items-center gap-3 cursor-pointer overflow-hidden"
          >
            <img
              src="/logo_articia.webp"
              alt="logo"
              className="rounded-xl w-9 h-9 object-cover shrink-0"
            />
            {state === "expanded" && (
              <h1 className="font-bold text-base tracking-wide text-slate-800 truncate">
                Articia 
              </h1>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {state === "expanded" ? (
              <PanelLeftClose className="w-5 h-5" />
            ) : (
              <PanelLeft className="w-5 h-5" />
            )}
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.label} 
                      onClick={() => handleNavigation(item.path)}
                      className={'w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-600 hover:bg-slate-200 hover:text-slate-900'}
                    >
                      <Icon className={"w-5 h-5 shrink-0 text-slate-500"} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AdminAsideBar;