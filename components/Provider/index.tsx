"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Criação de um QueryClient
const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
