import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useMainContract } from './hooks/useMainContract'
import { useTonConnect } from './hooks/useTonConnect';
import { fromNano } from 'ton-core';
import WebApp from '@twa-dev/sdk';


function App() {

  const {
    contract_address,
    counter_value,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawal
  } = useMainContract();

  const {connected} = useTonConnect();

  const showAlert = () => {
    WebApp.showAlert("Hey there");
  }

  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>{WebApp.platform}</b>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          <div className='Hint'>{contract_balance && fromNano(contract_balance)}</div>
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>

        <a onClick={() => {
          showAlert()
        }}>
          Show alert
        </a>

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