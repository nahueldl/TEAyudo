import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
const Pictogramas: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Pictogramas</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                Cosas del Pictogramas
            </IonContent>
        </IonPage>
    )
}

export default Pictogramas;