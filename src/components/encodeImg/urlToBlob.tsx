export const getBlobFromURL = (url: string): Promise<Blob> =>
  new Promise((resolve, reject) => {
    debugger;
    fetch(url).then(r => resolve(r.blob()));
  });