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
      onClick("patient", patient);
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
      <IonCardTitle className="title">{title}</IonCardTitle>
    </IonCard>
  );
};

interface CardProps {
  img: IImage;
  title: string;
  touchable: boolean;
  onClick: any;
  patient?: Patient;
}

interface IImage {
  src: string;
  alt: string;
}

interface Patient {
  name: string;
  lastName: string;
  birthday: string;
  fase: any;
  avatar: string;
}

export default CardWithImage;
