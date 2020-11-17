export const getBlobFromURL = (url: string): Promise<Blob> =>
  new Promise((resolve, reject) => {
    fetch(url).then(r => resolve(r.blob()));
  });