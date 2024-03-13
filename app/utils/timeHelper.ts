export const getDecimals = (value: number) => {
  return value - Math.floor(value);
};

export const getPaddedNumber = (value: number) => {
  return String(value).padStart(2, '0');
};