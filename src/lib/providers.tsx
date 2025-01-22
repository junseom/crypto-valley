'use client';

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";


export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {

  

  return (
    <DynamicContextProvider
      theme="auto"
      settings={{
        environmentId: "e5bd8af6-a452-4bf9-a212-96b6064c43bc",
           walletConnectors: [EthereumWalletConnectors],
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}