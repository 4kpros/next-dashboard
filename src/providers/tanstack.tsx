"use client";

import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function CustomQueryClientProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnMount: true,
          refetchOnReconnect: true,
          retry: 1,
          staleTime: 5 * 1000,
        },
      },
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default CustomQueryClientProvider;
