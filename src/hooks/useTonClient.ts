import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "ton";
import { useAsyncInitialize } from "./useAsyncInitialize";

export function useTonClient() {
    return useAsyncInitialize(
        async () => {
            return new TonClient({
                endpoint: await getHttpEndpoint({network: 'testnet'}),
            })
        }
    );
}