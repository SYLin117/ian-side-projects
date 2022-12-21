export const range = (start: number, end: number) => Array.from(Array(end - start + 1).keys()).map(x => x + start);

export const specials = range(33, 47).concat(range(58, 65), range(91, 96), range(123, 126))
export const lowercases = range(97, 122)
export const uppercases = range(65, 90)
export const numbers = range(48, 57)



