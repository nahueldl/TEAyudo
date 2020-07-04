import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
const Configuracion: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Configuracion</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                Cosas del Configuracion
            </IonContent>
        </IonPage>
    )
}

export default Configuracion;