import { getNumericSelector } from "../common/helpers";

/*
const max = Easy.from([1, 2, 3, 4, 5, 6, -5, 7, 8, 9, 10]).max();
console.log(max); // 10
*/

export function max<T, R, N>(iterator: Iterator<T, R, N>, ...select: T extends number ? [] : [(value: T) => number]): number {
    let x = iterator.next();
    if (x.done === true) {
        return 0;
    }

    const selector = getNumericSelector(x.value, ...select);
    let maxValue = selector(x.value as T & number);
    
    x = iterator.next();
    while (x.done !== true) {
        const value = selector(x.value as T & number);
        if (value > maxValue) {
            maxValue = value;
        }
        x = iterator.next();
    }

    return maxValue;
}

export async function maxAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, ...select: T extends number ? [] : [(value: T) => number]): Promise<number> {
    let x = await iterator.next();
    if (x.done === true) {
        return 0;
    }

    const selector = getNumericSelector(x.value, ...select);
    let maxValue = selector(x.value as T & number);
    
    x = await iterator.next();
    while (x.done !== true) {
        const value = selector(x.value as T & number);
        if (value > maxValue) {
            maxValue = value;
        }
        x = await iterator.next();
    }

    return maxValue;
}
