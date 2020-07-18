import { IonCard, IonImg, IonCardTitle } from "@ionic/react";
import React from "react";
import "./styles.css";

const CardWithImage: React.FC<CardProps> = ({ img, title, touchable }) => {
  return (
    <IonCard button={touchable} className="card">
      <IonImg src={img.src} />
      <IonCardTitle className="title">{title}</IonCardTitle>
    </IonCard>
  );
};

interface CardProps {
  img: IImage;
  title: string;
  touchable: boolean;
}

interface IImage {
  src: string;
  alt: string;
}

export default CardWithImage;
