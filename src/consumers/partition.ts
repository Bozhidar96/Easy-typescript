/*
const partition = Easy.from([1, 2, 3, 4]).partition((n) => n % 2 === 0);
console.log(partition); // [[2, 4], [1, 3]]
*/


export function partition<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T, index: number) => boolean): [T[], T[]] {
    const result: [T[], T[]] = [[], []];
    let index = 0;
    let x = iterator.next();
    while (x.done !== true) {
        if (predicate(x.value, index++)) {
            result[0].push(x.value);
        } else {
            result[1].push(x.value);
        }
        x = iterator.next();
    }
    return result;
}

export async function partitionAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<[T[], T[]]> {
    const result: [T[], T[]] = [[], []];
    let index = 0;
    let x = await iterator.next();
    while (x.done !== true) {
        if (await predicate(x.value, index++)) {
            result[0].push(x.value);
        } else {
            result[1].push(x.value);
        }
        x = await iterator.next();
    }
    return result;
}
