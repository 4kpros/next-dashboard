"use client";

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
  isServer,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { App } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { ReactNode } from "react";

function makeQueryClient(message: MessageInstance) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: 1,
        staleTime: 5 * 1000,
      },
    },
    queryCache: new QueryCache({
      onError: (_error, _query) => {
        message.error(
          "Failed to fetch data! Please check your connection and try again."
        );
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient(message: MessageInstance) {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient(message);
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient(message);
    return browserQueryClient;
  }
}
export default function CustomQueryClientProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  // Toast message
  const { message } = App.useApp();

  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient(message);

  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
