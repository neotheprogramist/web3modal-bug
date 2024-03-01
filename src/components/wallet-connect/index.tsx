import { component$, $, noSerialize, useStore } from "@builder.io/qwik";

import { mainnet, arbitrum, type Chain } from "viem/chains";
import { reconnect } from "@wagmi/core";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi";

const projectId = "26aebf5aa6f44cc2a8f74e674e0617b9";

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const returnWeb3ModalAndClient = async () => {
  const chains: [Chain, ...Chain[]] = [arbitrum, mainnet];
  const config = defaultWagmiConfig({
    chains, // required
    projectId, // required
    metadata, // required
    enableWalletConnect: true, // Optional - true by default
    enableInjected: true, // Optional - true by default
    enableEIP6963: true, // Optional - true by default
    enableCoinbase: true, // Optional - true by default
  });
  reconnect(config);
  const modal = createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
  });
  return { modal };
};

export const WalletConnect = component$(() => {
  const state = useStore<any>({
    web3modal: undefined,
    ethereumClient: undefined,
  });

  const setWeb3Modal = $(async () => {
    const { modal } = await returnWeb3ModalAndClient();
    state.web3modal = noSerialize(modal);
  });

  const openWeb3Modal = $(async () => {
    await setWeb3Modal();
    await state.web3modal.open();
  });

  return (
    <>
      <button onClick$={openWeb3Modal}>Wallet connect</button>
    </>
  );
});
