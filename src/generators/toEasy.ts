export function* toEasy<T>(iterable: Iterable<T>): Generator<T, void, undefined> {
    yield * iterable;
}

export async function* toEasyAsync<T>(iterable: AsyncIterable<T>): AsyncGenerator<T, void, undefined> {
    yield * iterable;
}
