import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "@/styles/themes/default";
import { GlobalStyles } from "@/styles/global";
import React from "react";
import { AlertsContainers } from "@/utils/AlertsContainers";
import { AuthContextProvider } from "@/context/AuthContext";

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType | any;
  };
};

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />

        {Component.PageLayout ? (
          <Component.PageLayout>
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
        <AlertsContainers />
      </ThemeProvider>
    </AuthContextProvider>
  );
}
