import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
const Profesionales: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Profesionales</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                Cosas del Profesionales
            </IonContent>
        </IonPage>
    )
}

export default Profesionales;