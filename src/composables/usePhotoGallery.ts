import { ref, 
  // onMounted, watch
 } from 'vue';
import { Plugins, CameraResultType, CameraSource, CameraPhoto,
  // Capacitor, FilesystemDirectory
 } from "@capacitor/core";
const photos = ref<Photo>();

export interface Photo {
  filepath: string;
  webviewPath?: string;
}

const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader;
  reader.onerror = reject;
  reader.onload = () => {
      resolve(reader.result);
  };
  reader.readAsDataURL(blob);
});

const transformPicture = async (photo: CameraPhoto): Promise<string> => {

  // Fetch the photo, read as a blob, then convert to base64 format
  const response = await fetch(photo.webPath!);
  const blob = await response.blob();
  const base64Data = await convertBlobToBase64(blob) as string;


  return base64Data;
}

export function usePhotoGallery() {
    const { Camera } = Plugins;
  
    const takePhoto = async () => {
      const cameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      });
      
      const fileName = new Date().getTime() + '.jpeg';
      
      const savedFileImage = {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      };
      
      photos.value = savedFileImage;
      return await transformPicture(cameraPhoto)
    };   

    return {
      photos,
      takePhoto
    };
  }

