import { Button } from "@/components/ui/button";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  return (
    <>
      <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
        <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
          <div className="flex h-14 items-center justify-between border-b border-zinc-200">
            <div className="hidden items-center space-x-4 sm:flex text-zinc-600">
              {location.pathname !== "/" && (
                <NavLink to="/">
                  <Button variant="ghost" className="text-sm">
                    <ArrowLeft />
                  </Button>
                </NavLink>
              )}
            </div>

            <div className="hidden items-center space-x-4 sm:flex text-zinc-800">
              <h1 className="font-extrabold">Candidate Details</h1>
            </div>

            <div className="hidden items-center space-x-4 sm:flex text-blue-600">
              {location.pathname === "/" && (
                <NavLink to="/candidate">
                  <Button variant="ghost" className="text-sm">
                    Create
                  </Button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
