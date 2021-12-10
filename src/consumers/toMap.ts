/*
const people = [
    new Person("Josh", 25),
    new Person("Michael", 36),
    new Person("Jonathan", 30),
];

const map = Easy.from(people).toMap(person => [person.name, person]);

console.log(map);
/* output:
Map {}
    Josh: Person
    Michael: Person
    Jonathan: Person
*/

export function toMap<T, R, N, K, V>(iterator: Iterator<T, R, N>, select: (value: T) => [K, V]): Map<K, V> {
    const result = new Map<K, V>();
    let x = iterator.next();
    while (x.done !== true) {
        const [key, value] = select(x.value);
        result.set(key, value);
        x = iterator.next();
    }
    return result;
}

export async function toMapAsync<T, R, N, K, V>(iterator: AsyncIterator<T, R, N>, select: (value: T) => [K, V]): Promise<Map<K, V>> {
    const result = new Map<K, V>();
    let x = await iterator.next();
    while (x.done !== true) {
        const [key, value] = select(x.value);
        result.set(key, value);
        x = await iterator.next();
    }
    return result;
}
