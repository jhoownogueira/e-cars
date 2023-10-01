import Head from "next/head";
import { DefaultLayout } from "@/layouts/default";
import { DashboardContainer } from "@/styles/pages/dashboard/styles";
import { useContext, useEffect, useState } from "react";
import { ModalCar } from "@/components/pages/dashboard/modals/CarModal";
import { ModalEditCar } from "@/components/pages/dashboard/modals/EditCarModal";
import { AuthContext, IUserProps } from "@/context/AuthContext";
import { apiI } from "@/services/api";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { ModalCadastrarCar } from "@/components/pages/dashboard/modals/CadastrarCarModal";
import { Alerts } from "@/utils/AlertsContainers";
import { useRouter } from "next/navigation";

export interface ICars {
  id: string;
  marca: string;
  modelo: string;
  placa: string;
  valor: number;
}

export default function Dashboard() {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const [carsList, setCarsList] = useState<ICars[]>([]);
  const [refreshList, setRefreshList] = useState(false);
  const [modalCarIsOpen, setModalCarIsOpen] = useState(false);
  const [modalEditCarIsOpen, setModalEditCarIsOpen] = useState(false);
  const [modalCadastrarCarIsOpen, setModalCadastrarCarIsOpen] = useState(false);
  const [idSelectedCar, setIdSelectedCar] = useState<string>("");

  const getUserData = async () => {
    const token = Cookies.get("token");
    if (token) {
      const decoding = jwt.decode(token);
      if (typeof decoding === "object" && decoding !== null) {
        const userProps = decoding as IUserProps;
        const { login, roles } = userProps;
        setUser({ login, roles });
      } else {
        return false;
      }
    }
  };

  function onRefreshCarsList() {
    setRefreshList(!refreshList);
  }

  function OpenChangeCarModal(open: boolean) {
    setModalCarIsOpen(open);
  }
  function handleOpenCarModal(id: string) {
    setModalCarIsOpen(true);
    setIdSelectedCar(id);
  }
  function handleCloseCarModal() {
    setModalCarIsOpen(false);
  }

  function OpenChangeEditCarModal(open: boolean) {
    setModalEditCarIsOpen(open);
  }
  function handleOpenEditCarModal(id: string) {
    setModalEditCarIsOpen(true);
    setIdSelectedCar(id);
  }
  function handleCloseEditCarModal() {
    setModalEditCarIsOpen(false);
  }

  function OpenChangeCadastrarCarModal(open: boolean) {
    setModalCadastrarCarIsOpen(open);
  }
  function handleOpenCadastrarCarModal() {
    setModalCadastrarCarIsOpen(true);
  }
  function handleCloseCadastrarCarModal() {
    setModalCadastrarCarIsOpen(false);
  }

  const getAllCars = async () => {
    try {
      const response = await apiI.get("/carros");
      if (response.status === 200) {
        setCarsList(response.data);
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        router.push("/");
      } else {
        console.log(error);
      }
    }
  };

  const handleDeleteCar = async (idCar: string) => {
    try {
      const response = await apiI.delete(`/carros/${idCar}`);
      if (response.status === 200) {
        Alerts.successDark("Carro deletado com sucesso");
        onRefreshCarsList();
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        router.push("/");
      } else {
        console.log(error);
        Alerts.errorDark("Erro ao deletar carro");
      }
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setUser({ login: "", roles: "" });
    router.push("/");
  };

  useEffect(() => {
    getAllCars();
    getUserData();
  }, [refreshList]);

  return (
    <>
      <Head>
        <title>e-cars | Dashboard</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <DashboardContainer>
        <header>
          <div className="left">
            <img src="logo-72.png" alt="" />
            <h1>Dashboard |</h1>
            <h1>Olá, {user?.login}</h1>
          </div>
          <div className="right">
            {user?.roles === "USER" ? null : <button onClick={handleOpenCadastrarCarModal}>Cadastrar</button>}
            <button className="sair" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </header>
        <main>
          <table>
            <thead>
              <tr>
                <th>Modelo</th>
                <th>Placa</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {carsList.map((car) => (
                <tr>
                  <td>{car.modelo}</td>
                  <td>{car.placa}</td>
                  <td>
                    <button onClick={() => handleOpenCarModal(car.id)}>Visualizar</button>
                    {user?.roles === "USER" ? null : (
                      <button onClick={() => handleOpenEditCarModal(car.id)}>Editar</button>
                    )}
                    {user?.roles === "USER" ? null : <button onClick={() => handleDeleteCar(car.id)}>Excluir</button>}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr></tr>
            </tfoot>
          </table>
        </main>
      </DashboardContainer>
      {/* Modals */}
      <ModalCar
        isOpen={modalCarIsOpen}
        onRequestClose={handleCloseCarModal}
        onOpenChange={OpenChangeCarModal}
        idSelectedCar={idSelectedCar}
      />
      <ModalEditCar
        isOpen={modalEditCarIsOpen}
        onRequestClose={handleCloseEditCarModal}
        onOpenChange={OpenChangeEditCarModal}
        onRefreshCarsList={onRefreshCarsList}
        idSelectedCar={idSelectedCar}
      />
      <ModalCadastrarCar
        isOpen={modalCadastrarCarIsOpen}
        onRequestClose={handleCloseCadastrarCarModal}
        onOpenChange={OpenChangeCadastrarCarModal}
        onRefreshCarsList={onRefreshCarsList}
      />
    </>
  );
}

Dashboard.PageLayout = DefaultLayout;
