// src/components/Layout/MainLayout.tsx
import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Navbar from "./NavBar";

const MainLayout = ({ children }: PropsWithChildren) => (
  <>
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <Navbar />
        </div>
      </header>
      
      <main className="flex-1 mt-16"> {/* Add margin-top to account for fixed header */}
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  </>
);

export default MainLayout;