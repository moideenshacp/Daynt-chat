"use client";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/redux/store";
import { SocketProvider } from "@/context/SocketContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SocketProvider> 
              {children}
            </SocketProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
