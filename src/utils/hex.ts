export const toHexString = (decimal: number) => {
  return `0x${decimal.toString(16).toUpperCase().padStart(2, '0')}`;
}