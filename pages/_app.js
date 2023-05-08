import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  // https://prateeksurana.me/blog/mastering-data-fetching-with-react-query-and-next-js/

  const [queryClient] = React.useState(() => new QueryClient());

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp
