import { IonCard, IonImg, IonCardTitle } from "@ionic/react";
import React from "react";
import "./styles.css";

const CardWithImage: React.FC<CardProps> = ({
  img,
  title,
  touchable,
  onClick,
}) => {
  const handleClick = () => {
    onClick(title);
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
  onClick: any;
}

interface IImage {
  src: string;
  alt: string;
}

export default CardWithImage;
