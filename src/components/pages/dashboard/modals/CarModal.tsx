import { Archive } from "@phosphor-icons/react";
import { ModalDark } from "@orioncore/react";
import { useEffect, useState } from "react";
import { ICars } from "@/pages/dashboard";
import { apiI } from "@/services/api";
import { set } from "zod";
import { Alerts } from "@/utils/AlertsContainers";
import { CarModalContainer, LoadingContainer } from "./styles";
import { useRouter } from "next/navigation";

interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  idSelectedCar: string;
}

export function ModalCar({ isOpen, onRequestClose, onOpenChange, idSelectedCar }: ModalComponentProps) {
  const router = useRouter();
  const [car, setCar] = useState<ICars>();
  const [loading, setLoading] = useState(true);
  const handleCloseModal = () => {
    onRequestClose();
  };

  const getCarData = async (idCar: string) => {
    setLoading(true);
    try {
      const response = await apiI.get(`/carros/${idCar}`);
      if (response.status === 200) {
        setCar(response.data);
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
      $title="Detalhes Carro"
      $width="fit-content"
    >
      {loading ? (
        <LoadingContainer>
          <span>Carregando ...</span>
        </LoadingContainer>
      ) : (
        <CarModalContainer>
          <span>
            <strong>Marca: </strong>
            {car?.marca}
          </span>
          <span>
            <strong>Modelo: </strong>
            {car?.modelo}
          </span>
          <span>
            <strong>Placa: </strong>
            {car?.placa}
          </span>
          <span>
            <strong>Valor: </strong>
            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(car?.valor ? car?.valor : 0)}
          </span>
        </CarModalContainer>
      )}
    </ModalDark>
  );
}
