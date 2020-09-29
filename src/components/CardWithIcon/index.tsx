import { IonCard, IonIcon, IonCardTitle } from "@ionic/react";
import React from "react";
import "./styles.css";

const CardWithIcon: React.FC<CardProps> = ({
  icon,
  title,
  touchable,
  onClick,
}) => {
  const handleClick = () => {
    onClick(title);
  };

  return (
    <IonCard button={touchable} className="card mt-5p">
      <IonIcon className="icon" icon={icon} onClick={handleClick} />
      <IonCardTitle className="title">{title}</IonCardTitle>
    </IonCard>
  );
};

interface CardProps {
  icon: string;
  title: string;
  touchable: boolean;
  onClick: any;
}

export default CardWithIcon;
