import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { Provider } from "react-redux/es/exports"
import { store, persistor } from "./app/store.ts"
import { Notifications } from '@mantine/notifications'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Notifications />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
