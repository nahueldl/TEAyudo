import { IonCard, IonImg, IonCardTitle } from "@ionic/react";
import React from "react";
import styles from "./styles.module.css";

const CardWithImage: React.FC<CardProps> = ({ img, title, touchable }) => {
  return (
    <IonCard button={touchable} className={styles.ionCard}>
      <IonImg src={img.src} />
      <IonCardTitle className={styles.cardTitle}>{title}</IonCardTitle>
    </IonCard>
  );
};

interface CardProps {
  img: any;
  title: string;
  touchable: boolean;
}

export default CardWithImage;
