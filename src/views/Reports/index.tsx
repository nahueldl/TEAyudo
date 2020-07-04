import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
const ReportsPage: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Informes</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                Cosas del Informe
            </IonContent>
        </IonPage>
    )
}

export default ReportsPage;