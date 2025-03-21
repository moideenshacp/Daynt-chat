export const isImageFile = (url: string): boolean => {
    return /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url);
  };
  