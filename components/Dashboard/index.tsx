"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { getWindowWidth } from "../../lib/utils/getWindowWidth";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [width, setWidth] = useState(() => getWindowWidth());
  const [isOpen, setIsOpen] = useState(() =>
    getWindowWidth() < 760 ? false : true
  );
  useEffect(() => {
    // Atualiza a largura da janela sempre que a tela for redimensionada
    const handleResize = () => {
      setWidth(getWindowWidth());
    };

    window.addEventListener("resize", handleResize);

    // Limpeza do event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Ícone para abrir a sidebar no mobile */}
      <div className="absolute top-4 left-4 z-50 md:hidden">
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Sidebar com animação */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-6 shadow-lg
        md:absolute md:translate-x-0 md:w-60 md:flex md:flex-col w-60`}
      >
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <nav>
          <ul>
            <li>
              <Button variant="link" className="text-white mb-4">
                Home
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-white">
                Settings
              </Button>
            </li>
          </ul>
        </nav>
      </motion.div>

      {/* Conteúdo principal */}
      <div className="flex justify-center items-center md:ml-20 w-full">
        {children}
      </div>
    </div>
  );
}
