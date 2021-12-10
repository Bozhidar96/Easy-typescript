import { getNumericSelector } from "../common/helpers";

/*
const min = Easy.from([1, 2, 3, 4, 5, 6, -5, 7, 8, 9, 10]).min();
console.log(min); // -5
*/
export function min<T, R, N>(iterator: Iterator<T, R, N>, ...select: T extends number ? [] : [(value: T) => number]): number {
    let x = iterator.next();
    if (x.done === true) {
        return 0;
    }

    const selector = getNumericSelector(x.value, ...select);
    let minValue = selector(x.value as T & number);
    
    x = iterator.next();
    while (x.done !== true) {
        const value = selector(x.value as T & number);
        if (value < minValue) {
            minValue = value;
        }
        x = iterator.next();
    }

    return minValue;
}

export async function minAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, ...select: T extends number ? [] : [(value: T) => number]): Promise<number> {
    let x = await iterator.next();
    if (x.done === true) {
        return 0;
    }

    const selector = getNumericSelector(x.value, ...select);
    let minValue = selector(x.value as T & number);
    
    x = await iterator.next();
    while (x.done !== true) {
        const value = selector(x.value as T & number);
        if (value < minValue) {
            minValue = value;
        }
        x = await iterator.next();
    }

    return minValue;
}
