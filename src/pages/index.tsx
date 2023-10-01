import Head from "next/head";
import { DefaultLayout } from "@/layouts/default";
import { LoginContainer } from "@/styles/pages/styles";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { api } from "@/services/api";
import { Alerts } from "@/utils/AlertsContainers";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { AuthContext, IUserProps } from "@/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const decodeJwt = async (token: string) => {
    const decoding = jwt.decode(token);

    if (typeof decoding === "object" && decoding !== null) {
      const userProps = decoding as IUserProps;
      const { login, roles } = userProps;
      setUser({ login, roles });
    } else {
      return false;
    }
  };

  const handleLogin = async (data: { login: string; senha: string }) => {
    try {
      const response = await api.post("/seguranca/login", data);
      if (response.status === 200) {
        console.log(response.data);
        const expirationHour = 5;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        expirationDate.setHours(expirationHour, 0, 0, 0);
        Cookies.set("token", response.data.token, { expires: expirationDate });
        await decodeJwt(response.data.token);
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      Alerts.errorDark("Usuário ou senha incorretos");
    }
  };

  return (
    <>
      <Head>
        <title>e-cars | Sign in</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <LoginContainer>
        <main>
          <img src="/logo-72.png" />
          <h1>Olá, bem vindo.</h1>
          <h4>Por favor, entre com as suas credenciais.</h4>
          <form>
            <fieldset>
              <label>Usuário</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </fieldset>
            <fieldset>
              <label>Senha</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </form>
          <footer>
            <button
              onClick={() => {
                handleLogin({ login: username, senha: password });
              }}
            >
              Entrar
            </button>
          </footer>
        </main>
      </LoginContainer>
    </>
  );
}

Home.PageLayout = DefaultLayout;
