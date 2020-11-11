export const getBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64Index = result.indexOf(',') + 1;
      resolve(result.substring(base64Index));
    };
    reader.onerror = error => reject(error);
  });