/*
const generator = Easy.from([1, 2, 3]).forEach(n => console.log(n));
generator.run();
/* output:
1
2
3
*/

export function run<T, R, N>(iterator: Iterator<T, R, N>): R {
    while (true) {
        const r = iterator.next();
        if (r.done === true) {
            return r.value;
        }
    }
}

export async function runAsync<T, R, N>(iterator: AsyncIterator<T, R, N>): Promise<R> {
    while (true) {
        const r = await iterator.next();
        if (r.done === true) {
            return r.value;
        }
    }
}
