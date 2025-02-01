import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Library, Menu, LogIn, ClipboardCheck, Home } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  // Common dialog content components
  const StatusCheckDialog = ({ onClose }) => (
    <DialogContent className="bg-white">
      <DialogHeader>
        <DialogTitle>Check Application Status</DialogTitle>
        <DialogDescription>
          Enter your registration number below
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Input 
          placeholder="Reference Number (e.g., APP-2024-001)" 
          className="w-full"
        />
        <Button 
          className="bg-orange-500 hover:bg-orange-600"
          onClick={onClose}
        >
          Check Status
        </Button>
      </div>
    </DialogContent>
  );

  const AdminLoginDialog = ({ onClose }) => (
    <DialogContent className="bg-white">
      <DialogHeader>
        <DialogTitle>Admin Login</DialogTitle>
        <DialogDescription>
          Please enter your credentials to access the admin panel
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Input placeholder="Username" type="text" />
        <Input placeholder="Password" type="password" />
        <Button 
          className="bg-orange-500 hover:bg-orange-600"
          onClick={onClose}
        >
          Login
        </Button>
      </div>
    </DialogContent>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Library className="h-8 w-8 text-orange-600" />
            <div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">
                OUSL Library Membership Portal
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className=" items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
            <Home className="h-4 w-4 mr-2" />
              Home
            </Button>

            {/* Desktop Status Check Dialog */}
            <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  Check Status
                </Button>
              </DialogTrigger>
              <StatusCheckDialog onClose={() => setIsStatusDialogOpen(false)} />
            </Dialog>

            {/* Desktop Admin Login Dialog */}
            <Dialog onOpenChange={setIsLoginDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  <LogIn className="h-4 w-4 mr-2" />
                  Admin Login
                </Button>
              </DialogTrigger>
              <AdminLoginDialog onClose={() => setIsLoginDialogOpen(false)} />
            </Dialog>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] bg-white">
                <SheetHeader className="border-b pb-4">
                  <SheetTitle>OUSL Library Membership Portal</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <Button variant="ghost"   className="w-full justify-start transition-all duration-200 hover:bg-orange-50 hover:text-orange-600 active:bg-orange-100 rounded-lg py-3"
                  >
                  <Home className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                  
                  {/* Mobile Status Check Button */}
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start transition-all duration-200 hover:bg-orange-50 hover:text-orange-600 active:bg-orange-100 rounded-lg py-3"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsStatusDialogOpen(true);
                    }}
                  >
                    <ClipboardCheck className="h-4 w-4 mr-2" />
                    Check Status
                  </Button>

                  {/* Mobile Admin Login Button */}
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start transition-all duration-200 hover:bg-orange-50 hover:text-orange-600 active:bg-orange-100 rounded-lg py-3"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsLoginDialogOpen(true);
                    }}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Admin Login
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Separate Status Check Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <StatusCheckDialog onClose={() => setIsStatusDialogOpen(false)} />
      </Dialog>

      {/* Separate Admin Login Dialog */}
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <AdminLoginDialog onClose={() => setIsLoginDialogOpen(false)} />
      </Dialog>
    </nav>
  );
};

export default Navbar;
