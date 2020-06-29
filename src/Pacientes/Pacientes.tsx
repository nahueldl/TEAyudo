import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
const Pacientes: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Pacientes</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                Cosas del Pacientes
            </IonContent>
        </IonPage>
    )
}

export default Pacientes;