import { IonCard, IonIcon, IonCardTitle } from "@ionic/react";
import React from "react";
import "./styles.css";

const CardWithIcon: React.FC<CardProps> = ({ icon, title, touchable }) => {
  return (
    <IonCard button={touchable} className="card mt-5p">
      <IonIcon className="icon" icon={icon} />
      <IonCardTitle className="title">{title}</IonCardTitle>
    </IonCard>
  );
};

interface CardProps {
  icon: string;
  title: string;
  touchable: boolean;
}

export default CardWithIcon;
