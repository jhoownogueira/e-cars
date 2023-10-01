import { Archive } from "@phosphor-icons/react";
import { ModalDark } from "@orioncore/react";
import { useEffect, useState } from "react";
import { apiI } from "@/services/api";
import { Alerts } from "@/utils/AlertsContainers";
import { CarModalContainer, LoadingContainer } from "./styles";
import { maskDecimalNumber } from "@/utils/Masks";
import { useRouter } from "next/navigation";

interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  onRefreshCarsList: () => void;
}

interface ISaveCar {
  marca: string;
  modelo: string;
  placa: string;
  valor: number;
}

export function ModalCadastrarCar({ isOpen, onRequestClose, onOpenChange, onRefreshCarsList }: ModalComponentProps) {
  const router = useRouter();
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [valor, setValor] = useState("");

  const resetFields = () => {
    setMarca("");
    setModelo("");
    setPlaca("");
    setValor("");
  };

  const handleCloseModal = () => {
    onRequestClose();
    resetFields();
  };

  const handleRegisterCar = async (data: ISaveCar) => {
    try {
      const response = await apiI.post(`/carros`, data);
      if (response.status === 201) {
        Alerts.successDark("Carro cadastrado com sucesso");
        onRefreshCarsList();
        handleCloseModal();
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        router.push("/");
      } else {
        console.log(error);
        Alerts.errorDark("Erro ao editar carro, verifique a placa");
      }
    }
  };

  const saveCar = (data: ISaveCar) => {
    if (data.marca === "" || data.modelo === "" || data.placa === "" || data.valor === 0) {
      Alerts.errorDark("Preencha todos os campos");
    } else {
      handleRegisterCar(data);
    }
  };

  return (
    <ModalDark
      $iconTitle={<Archive size={20} />}
      $iconBgColor="orion_black_box"
      $iconColor="orion_white"
      $isOpen={isOpen}
      $onOpenChange={onOpenChange}
      $closable
      $title="Cadastrar Carro"
      $width="fit-content"
    >
      <CarModalContainer>
        <fieldset>
          <label>Marca</label>
          <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} />
        </fieldset>
        <fieldset>
          <label>Modelo</label>
          <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} />
        </fieldset>
        <fieldset>
          <label>Placa</label>
          <input type="text" value={placa} onChange={(e) => setPlaca(e.target.value)} />
        </fieldset>
        <fieldset>
          <label>Valor</label>
          <input type="text" value={valor} onChange={(e) => setValor(maskDecimalNumber(e.target.value))} />
        </fieldset>
        <button
          onClick={() => {
            saveCar({ marca, modelo, placa, valor: parseFloat(valor) });
          }}
        >
          Cadastrar
        </button>
      </CarModalContainer>
    </ModalDark>
  );
}
