"use client";

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
  isServer,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { message } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { ReactNode } from "react";

function makeQueryClient(messageApi: MessageInstance) {
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
        messageApi.open({
          type: "error",
          content: "Failed to fetch data! Please check your connection and try again.",
        });
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient(messageApi: MessageInstance) {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient(messageApi);
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient(messageApi);
    return browserQueryClient;
  }
}
export default function CustomQueryClientProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  // Toast message
  const [messageApi, contextHolder] = message.useMessage();

  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient(messageApi);

  return (
    <>
      {contextHolder}
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}

// "use client";

// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { useState } from "react";

// export default function CustomQueryClientProvider({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   const [client] = useState(
//     new QueryClient({
//       defaultOptions: {
//         queries: {
//           refetchOnWindowFocus: false,
//           refetchOnMount: true,
//           refetchOnReconnect: true,
//           retry: 1,
//           staleTime: 5 * 1000,
//         },
//       },
//     })
//   );

//   return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
// }
