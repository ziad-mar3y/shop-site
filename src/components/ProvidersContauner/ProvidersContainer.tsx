"use client"
import CartContextProvider from "@/Contexts/cartContext";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export default function ProvidersContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Provider store={store}>
      <CartContextProvider>{children}</CartContextProvider>;
    </Provider>
  );
}
