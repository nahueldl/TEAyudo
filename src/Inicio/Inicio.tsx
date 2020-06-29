import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
const Inicio: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Inicio</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                Cosas del inicio
            </IonContent>
        </IonPage>
    )
}

export default Inicio;