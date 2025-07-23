'use client';

import React from 'react';
import {

  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useUser } from '@/context/UserContext';



const Header: React.FC = () => {
  const { user } = useUser();
  console.log('user', user);
  
  const handleKeyCloakSignoutClick = () => {
    const kcConfig = {
      host: process.env.NEXT_PUBLIC_BASE_URL_KEYCLOAK_LOGOUT,
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID      ,
      grantType: 'authorization_code',
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth/kc/logout`,
    }
    const redirect_url = encodeURIComponent(kcConfig.redirect_url)
    const oauthlocation = `${process.env.NEXT_PUBLIC_BASE_URL_KEYCLOAK_LOGOUT}?post_logout_redirect_uri=${redirect_url}&client_id=${kcConfig.clientId}`
    window.location.href = oauthlocation
  }
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4 justify-between">
      <SidebarTrigger className="-ml-1" />
      <div className="flex items-center gap-4 ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <span className="truncate max-w-[120px] text-sm font-medium">
                {user?.name}
              </span>
             
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>EN</DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem className="text-destructive" onClick={handleKeyCloakSignoutClick}>ออกจากระบบ</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
};

export default Header;
