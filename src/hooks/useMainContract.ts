import { useEffect, useState } from "react";
import { MainContract } from "../contracts/MainContract";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "ton-core";
import { toNano } from "ton-core";
import { useTonConnect } from "./useTonConnect";

export function useMainContract() {
    const client = useTonClient();
    const [contractData, setContractData] = useState<null | {
        counter_value: number;
        recent_sender: Address;
        owner_address: Address;
    }>();
    const [balance, setBalance] = useState<null | number>(0);

    const { sender } = useTonConnect();

    const sleep = (time: number) => new Promise(resolve => {
        return setTimeout(resolve, time);
    })

    const mainContract = useAsyncInitialize(
        async () => {
            if (!client) return;
            const contract = new MainContract(
                Address.parse("EQCiRfYlGuY8kEgTUQL-THXBxnWLF0O6jmq8rMQYt6mh1kFF")
            );
            return client.open(contract) as OpenedContract<MainContract>;
        },
        [client]
    );

    useEffect(() => {
        async function getValue() {
            if (!mainContract) return;
            setContractData(null);
            const val = await mainContract.getData();
            const { number } = await mainContract.getBalance();
            setContractData({
                counter_value: val.number,
                recent_sender: val.recent_sender,
                owner_address: val.owner_address,
            });
            setBalance(number);

            await sleep(5000);
            getValue();
        }
        getValue();
    }, [mainContract]);

    return {
        contract_address: mainContract?.address.toString(),
        contract_balance: balance,
        ...contractData,
        sendIncrement: async () => {
            return mainContract?.sendIncrement(sender, toNano("0.05"), 1);
        },
        sendDeposit: async () => {
            return mainContract?.sendDeposit(sender, toNano("1"));
        },
        sendWithdrawal: async () => {
            return mainContract?.sendWithdrawalRequest(sender, toNano("0.05"), toNano("0.5"));
        }
    }
}