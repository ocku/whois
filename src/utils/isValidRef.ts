/** discards non-whois servers */
export const isValidRef = (ref: string) => {
  return !(ref.startsWith('www.') || /^http(s?):/.test(ref));
};
