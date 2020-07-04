import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const CategoriesPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Categorias</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                Cosas del Categorias
            </IonContent>
        </IonPage>
    )
}

export default CategoriesPage;