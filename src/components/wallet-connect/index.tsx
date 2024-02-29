import { component$, $, noSerialize, useStore } from '@builder.io/qwik';
import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createConfig } from "@wagmi/core";
import { arbitrum, mainnet, polygon, sepolia } from "@wagmi/core/chains";
import { Web3Modal } from "@web3modal/html";

export const chains = [arbitrum, mainnet, polygon, sepolia];
const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId: "26aebf5aa6f44cc2a8f74e674e0617b9" }),
]);
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({
        projectId: "26aebf5aa6f44cc2a8f74e674e0617b9",
        chains,
    }),
    publicClient,
});

export const returnWeb3ModalAndClient = async () => {
    const ethereumClient = new EthereumClient(wagmiConfig, chains);
    const web3modal = new Web3Modal(
        { projectId: "26aebf5aa6f44cc2a8f74e674e0617b9", themeMode: "dark" },
        ethereumClient
    );
    return { web3modal, ethereumClient };
};


export const WalletConnect = component$(() => {
    const state = useStore<any>({
        web3modal: undefined,
        ethereumClient: undefined,
    })

    const setWeb3Modal = $(async () => {
        const { web3modal, ethereumClient } = await returnWeb3ModalAndClient();
        state.web3modal = noSerialize(web3modal);
        state.ethereumClient = noSerialize(ethereumClient);
    });

    const openWeb3Modal = $(async () => {
        await setWeb3Modal();
        await state.web3modal.openModal();
    })

    return <>
        <button onClick$={openWeb3Modal}>
            Wallet connect
        </button>
    </>
});
