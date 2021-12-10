import { getNumericSelector } from "../common/helpers";

/*
const sum = Easy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).sum();
console.log(sum); // 55
*/

export function sum<T, R, N>(iterator: Iterator<T, R, N>, ...select: T extends number ? [] : [(value: T) => number]): number {
    let x = iterator.next();
    if (x.done === true) {
        return 0;
    }

    const selector = getNumericSelector(x.value, ...select);

    let totalSum = 0;
    while (x.done !== true) {
        totalSum += selector(x.value as T & number);
        x = iterator.next();
    }

    return totalSum;
}

export async function sumAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, ...select: T extends number ? [] : [(value: T) => number]): Promise<number> {
    let x = await iterator.next();
    if (x.done === true) {
        return 0;
    }

    const selector = getNumericSelector(x.value, ...select);

    let totalSum = 0;
    while (x.done !== true) {
        totalSum += selector(x.value as T & number);
        x = await iterator.next();
    }

    return totalSum;
}
