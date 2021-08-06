export const getYear = (date) => Number(date.split('-')[2]);
export const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
