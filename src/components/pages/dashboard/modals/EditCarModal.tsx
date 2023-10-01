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
  idSelectedCar: string;
}

interface IEditCars {
  marca: string;
  modelo: string;
  placa: string;
  valor: number;
}

export function ModalEditCar({
  isOpen,
  onRequestClose,
  onOpenChange,
  onRefreshCarsList,
  idSelectedCar,
}: ModalComponentProps) {
  const router = useRouter();
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [valor, setValor] = useState("");
  const [loading, setLoading] = useState(true);
  const handleCloseModal = () => {
    onRequestClose();
  };

  const getCarData = async (idCar: string) => {
    setLoading(true);
    try {
      const response = await apiI.get(`/carros/${idCar}`);
      if (response.status === 200) {
        setMarca(response.data.marca);
        setModelo(response.data.modelo);
        setPlaca(response.data.placa);
        setValor(response.data.valor);
        setLoading(false);
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        router.push("/");
      } else {
        console.log(error);
        Alerts.errorDark("Erro na consulta");
        handleCloseModal();
      }
    }
  };

  const handleEditCar = async (idCar: string, data: IEditCars) => {
    try {
      const response = await apiI.put(`/carros/${idCar}`, data);
      if (response.status === 200) {
        Alerts.successDark("Carro editado com sucesso");
        onRefreshCarsList();
        handleCloseModal();
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        router.push("/");
      } else {
        console.log(error);
        Alerts.errorDark("Erro ao editar carro");
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      getCarData(idSelectedCar);
    }
  }, [isOpen]);

  return (
    <ModalDark
      $iconTitle={<Archive size={20} />}
      $iconBgColor="orion_black_box"
      $iconColor="orion_white"
      $isOpen={isOpen}
      $onOpenChange={onOpenChange}
      $closable
      $title="Editar Carro"
      $width="fit-content"
    >
      {loading ? (
        <LoadingContainer>
          <span>Carregando ...</span>
        </LoadingContainer>
      ) : (
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
              handleEditCar(idSelectedCar, { marca, modelo, placa, valor: parseFloat(valor) });
            }}
          >
            Salvar Alterações
          </button>
        </CarModalContainer>
      )}
    </ModalDark>
  );
}
