import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = (props: AppProviderProps) => {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
