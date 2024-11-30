import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useMainContract } from './hooks/useMainContract'
import { useTonConnect } from './hooks/useTonConnect';
import { fromNano } from 'ton-core';

function App() {

  const {
    contract_address,
    counter_value,
    recent_sender,
    owner_address,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawal
  } = useMainContract();

  const {connected} = useTonConnect();

  //console.log(connected);
  

  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          <div className='Hint'>{fromNano(contract_balance)}</div>
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>

        {connected && (
          <div style={{display: "flex", flexDirection: "column", cursor: "pointer"}}>
            <a onClick={() => {
              sendIncrement()
            }}>
              Increment
            </a>
            <a onClick={() => {
              sendDeposit()
            }}>
              Deposit 1 TON
            </a>
            <a onClick={() => {
              sendWithdrawal()
            }}>
              Withdraw 0.5 TON
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App

//EQCiRfYlGuY8kEgTUQL-THXBxnWLF0O6jmq8rMQYt6mh1kFF