"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider, theme, ColorModeScript } from "@chakra-ui/react";
import Header from "../app/component/layout/Header/page";
import Footer from "../app/component/layout/Footer/page";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import{ Toaster } from "react-hot-toast";
import App from '../app/component/layout/App/page'


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // window.addEventListener('contextmenu',(e)=>{
  //   e.preventDefault()
  // })
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <Header  />
            <App />
            {children}
            <Footer />
            <Toaster />
          </ChakraProvider>
        </Provider>
      </body>
    </html>
  );
}
