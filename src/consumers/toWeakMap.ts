/*
const people = [
    new Person("Michael", 25),
    new Person("Michael", 36),
    new Person("Michael", 40),
];

const weakMap = Easy.from(people).toWeakMap(p => [p, p.age]);
console.log(weakMap.get(people[1])); // 36
*/

export function toWeakMap<T, R, N, K extends object, V>(iterator: Iterator<T, R, N>, select: (value: T) => [K, V]): WeakMap<K, V> {
    const result = new WeakMap<K, V>();
    let x = iterator.next();
    while (x.done !== true) {
        const [key, value] = select(x.value);
        result.set(key, value);
        x = iterator.next();
    }
    return result;
}

export async function toWeakMapAsync<T, R, N, K extends object, V>(iterator: AsyncIterator<T, R, N>, select: (value: T) => [K, V]): Promise<WeakMap<K, V>> {
    const result = new WeakMap<K, V>();
    let x = await iterator.next();
    while (x.done !== true) {
        const [key, value] = select(x.value);
        result.set(key, value);
        x = await iterator.next();
    }
    return result;
}
