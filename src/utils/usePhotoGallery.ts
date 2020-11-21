import { useState } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { CameraResultType, CameraSource } from "@capacitor/core";


const PHOTO_STORAGE = "photos";

export function usePhotoGallery() {

    const [ photos, setPhotos ] = useState<Photo[]>([]);
    const { getPhoto } = useCamera();
  
    const takePhoto = async () => {
      const cameraPhoto = await getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      });
      const fileName = new Date().getTime() + '.jpeg';
      const newPhotos = [{
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      }, ...photos];
      setPhotos(newPhotos)
    };
  
    return {
      photos,
      takePhoto
    };
}

export interface Photo {
    filepath: string;
    webviewPath?: string;
  }