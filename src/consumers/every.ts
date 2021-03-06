/*
const result = Easy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).every(n => n <= 10);
console.log(result); // true
*/

export function every<T, R, N>(iterator: Iterator<T, R, N>, predicate: (value: T, index: number) => boolean): boolean {
    let index = 0;
    let x = iterator.next();
    while (x.done !== true) {
        if (!predicate(x.value, index)) {
            return false;
        }

        x = iterator.next();
        index++;
    }
    
    return true;
}

export async function everyAsync<T, R, N>(iterator: AsyncIterator<T, R, N>, predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<boolean> {
    let index = 0;
    let x = await iterator.next();
    while (x.done !== true) {
        if (!await predicate(x.value, index)) {
            return false;
        }

        x = await iterator.next();
        index++;
    }
    
    return true;
}
