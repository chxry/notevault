export const redirect = (to: string) => (window.location.pathname = to);
export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);
