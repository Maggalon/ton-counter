import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

const manifest = "https://tan-worried-grasshopper-459.mypinata.cloud/ipfs/QmP3VUhkAtUgZzK2MzQ3MeQLpBk23LUemS492V8QDmx3sR"

createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifest}>
    <StrictMode>
      <App />
    </StrictMode>
  </TonConnectUIProvider>,
)
