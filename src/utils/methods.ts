export const capitalizeFirstLetter = (string: string) => {
  const response = string[0].toUpperCase() + string.substring(1);
  console.log(response);
  return response;
};
