import { IonCard, IonImg, IonCardTitle } from "@ionic/react";
import React from "react";
import "./styles.css";

const CardWithImage: React.FC<CardProps> = ({
  img,
  title,
  touchable,
  onClick,
  patient,
}) => {
  const handleClick = () => {
    if (patient !== undefined) {
      onClick(patient);
    } else {
      onClick(title);
    }
  };

  return (
    <IonCard
      button={touchable}
      className="card"
      type="button"
      onClick={handleClick}
    >
      <IonImg src={img.src} />
      {title ? <IonCardTitle className="title">{title}</IonCardTitle> : null}
    </IonCard>
  );
};

interface CardProps {
  img: IImage;
  title?: string;
  touchable: boolean;
  onClick?: any;
  patient?: Patient;
}

interface IImage {
  src: string;
  alt: string;
}

export interface Patient {
  id_paciente?: any;
  nombre?: string;
  apellido?: string;
  avatar?: string;
}

export interface Professional {
  id_profesional?: any;
  nombre?: string;
  apellido?: string;
  avatar?: string;
}

export default CardWithImage;
