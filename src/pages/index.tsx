import { DefaultLayout } from "@/layouts/default";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Template | jhow.dev</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <section
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#333333",
        }}
      >
        <img src="/next.svg" />
      </section>
    </>
  );
}

Home.PageLayout = DefaultLayout;
