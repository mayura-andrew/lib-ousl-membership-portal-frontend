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
import {
  Library,
  Menu,
  LogIn,
  ClipboardCheck,
  Home,
  X,
  Bell,
} from "lucide-react";

interface DialogProps {
  onClose: () => void;
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const StatusCheckDialog: React.FC<DialogProps> = ({ onClose }) => (
    <DialogContent className="sm:max-w-[425px] bg-white">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">Check Application Status</DialogTitle>
        <DialogDescription className="text-gray-600">
          Enter your registration number to check your application status
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Input 
          placeholder="Reference Number (e.g., APP-2024-001)" 
          className="w-full focus:ring-orange-500"
        />
        <Button 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-colors"
          onClick={onClose}
        >
          Check Status
        </Button>
      </div>
    </DialogContent>
  );

  const AdminLoginDialog: React.FC<DialogProps> = ({ onClose }) => (
    <DialogContent className="sm:max-w-[425px] bg-white">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">Admin Login</DialogTitle>
        <DialogDescription className="text-gray-600">
          Please enter your credentials to access the admin panel
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Input 
          placeholder="Username" 
          type="text" 
          className="focus:ring-orange-500"
        />
        <Input 
          placeholder="Password" 
          type="password" 
          className="focus:ring-orange-500"
        />
        <Button 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-colors"
          onClick={onClose}
        >
          Login
        </Button>
      </div>
    </DialogContent>
  );

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <Library className="h-8 w-8 text-orange-600" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">
                OUSL Library
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className=" md:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              className="text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>

            <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  Check Status
                </Button>
              </DialogTrigger>
              <StatusCheckDialog onClose={() => setIsStatusDialogOpen(false)} />
            </Dialog>

            <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Admin Login
                </Button>
              </DialogTrigger>
              <AdminLoginDialog onClose={() => setIsLoginDialogOpen(false)} />
            </Dialog>

            <Button 
              variant="ghost" 
              className="text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
            >
              <Bell className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-orange-50"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6 text-gray-600" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-600" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[300px] bg-white p-0"
              >
                <SheetHeader className="p-6 border-b">
                  <SheetTitle className="text-xl font-bold text-gray-900">
                    OUSL Library
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-4 space-y-2">
                  <Button 
                    variant="ghost"   
                    className="w-full justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsStatusDialogOpen(true);
                    }}
                  >
                    <ClipboardCheck className="h-4 w-4 mr-2" />
                    Check Status
                  </Button>

                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsLoginDialogOpen(true);
                    }}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Admin Login
                  </Button>

                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;