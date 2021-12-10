import { IEasyCollection } from ".";
import { Depth, OptionalComparer, Primitive, Select, FlatArray, PromiseValue } from "../common/helpers";

export interface IEasyCollectionAsync<T, R, N> {
    [Symbol.asyncIterator](): AsyncIterator<T, R, N>;

    //#region Generators
    append(...iterables: Array<Iterable<T> | AsyncIterable<T>>): IEasyCollectionAsync<T, R, N>;
    at(index: number): IEasyCollectionAsync<T, R, N>;
    balancedChunk(target: number, ...select: T extends number ? [] : [(value: T) => number]): IEasyCollectionAsync<T[], void, undefined>;
    chunk(size: number): IEasyCollectionAsync<T[], R, N>;
    concat(...iterators: Array<Iterator<T, unknown, unknown> | AsyncIterator<T, unknown, unknown>>): IEasyCollectionAsync<T, void, undefined>;
    custom<T2, R2, N2>(generator: (iterator: AsyncIterator<T, R, N>) => AsyncGenerator<T2, R2, N2>): IEasyCollectionAsync<T2, R2, N2>;
    distinct(...select: T extends Primitive ? [] : [(value: T) => Primitive]): IEasyCollectionAsync<T, R, undefined>;
    feed<R2, V>(from: Iterator<V, R2, T> | AsyncIterator<V, R2, T>): IEasyCollectionAsync<V, void, undefined>;
    fill(values: Iterable<T> | AsyncIterable<T>, start?: number, end?: number): IEasyCollectionAsync<T, R, undefined>;
    filter(predicate: (value: T, index: number) => boolean |  Promise<boolean>): IEasyCollectionAsync<T, R, undefined>;
    filterWithIndex(predicate: (value: T, index: number) => boolean | Promise<boolean>): IEasyCollectionAsync<[T, number], R, undefined>;
    flat<D extends Depth = 20>(depth?: D): IEasyCollectionAsync<FlatArray<T, D>, R, undefined>;
    flatMap<V, D extends Depth = 20>(transformer: (value: T, index: number) => V, depth?: D): IEasyCollectionAsync<FlatArray<V, D>, R, undefined>;
    forEach(action: (value: T, index: number) => void | Promise<void>): IEasyCollectionAsync<T, R, undefined>;
    groupBy<TKey, TElement, TResult>(keySelector: (value: T) => TKey, elementSelector: (value: T) => TElement, resultSelector: (key: TKey, elements: TElement[]) => TResult): IEasyCollectionAsync<TResult, R, undefined>;
    indices(predicate: (value: T, index: number) => boolean | Promise<boolean>): IEasyCollectionAsync<number, R, undefined>;
    easyChunk(size: number): IEasyCollectionAsync<IEasyCollectionAsync<T, void, unknown>, R, undefined>;
    easyGroupBy<TKey, TElement, TResult>(keySelector: (value: T) => TKey, elementSelector: (value: T) => TElement, resultSelector: (key: TKey, elements: IEasyCollectionAsync<TElement, void, undefined>) => TResult): IEasyCollectionAsync<TResult, R, undefined>;
    easyPartition(predicate: (value: T, index: number) => boolean | Promise<boolean>): IEasyCollection<IEasyCollectionAsync<T, void, undefined>, void, undefined>;
    map<V>(transformer: (value: T, index: number) => V): IEasyCollectionAsync<V, R, undefined>;
    prepend(...iterables: Array<Iterable<T> | AsyncIterable<T>>): IEasyCollectionAsync<T, R, undefined>;
    repeat(count: number): IEasyCollectionAsync<T, R | undefined, undefined>;
    skip(count: number): IEasyCollectionAsync<T, R, undefined>;
    skipWhile(predicate: (value: T, index: number) => boolean | Promise<boolean>): IEasyCollectionAsync<T, R, undefined>;
    sort(...comparer: OptionalComparer<T>): IEasyCollectionAsync<T, R, undefined>;
    splice(start: number, deleteCount?: number, ...items: T[]): IEasyCollectionAsync<T, T[], undefined>;
    spread(): IEasyCollectionAsync<T extends Iterable<infer U> | AsyncIterable<infer U> ? U : T, R, undefined>;
    take(count: number): IEasyCollectionAsync<T, R | undefined, undefined>;
    takeWhile(predicate: (value: T, index: number) => boolean | Promise<boolean>): IEasyCollectionAsync<T, R | undefined, undefined>;
    zip<T2, R2, TResult>(iterator: Iterator<T2, R2, N> | AsyncIterator<T2, R2, N>, resultSelector: (first: T, second: T2) => TResult): IEasyCollectionAsync<TResult, R | R2 | undefined, undefined>;
    //#endregion

    //#region Consumers
    average(...select: T extends number ? [] : [(value: T) => number]): Promise<number>;
    count(): Promise<number>;
    every(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<boolean>;
    first(predicate?: (value: T, index: number) => boolean | Promise<boolean>): Promise<T | undefined>;
    firstWithIndex(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<[T | undefined, number]>;
    includes(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<boolean>;
    indexOf(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<number>;
    join(separator: string, ...select: Select<T, Primitive>): Promise<string>;
    last(predicate?: (value: T) => boolean | Promise<boolean>): Promise<T | undefined>;
    lastIndexOf(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<number>;
    lastWithIndex(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<[T | undefined, number]>;
    max(...select: T extends number ? [] : [(value: T) => number]): Promise<number>;
    min(...select: T extends number ? [] : [(value: T) => number]): Promise<number>;
    partition(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<[T[], T[]]>;
    product(...select: T extends number ? [] : [(value: T) => number]): Promise<number>;
    promiseAll(): Promise<PromiseValue<T>[]>;
    reduce<V>(reducer: (value: T, accumulator: V) => V, initial: V): Promise<V>;
    run(): Promise<R>;
    sum(...select: T extends number ? [] : [(value: T) => number]): Promise<number>;
    toArray(): Promise<T[]>;
    toAsyncIterator(): AsyncIterator<T, R, N>;
    toMap<K, V>(select: (value: T) => [K, V]): Promise<Map<K, V>>;
    toSet(): Promise<Set<T>>;
    toWeakMap<K extends object, V>(select: (value: T) => [K, V]): Promise<WeakMap<K, V>>;
    toWeakSet<K extends object>(...select: T extends object ? [] : [(value: T) => K]): Promise<WeakSet<K>>;
    uppend(iterator: Iterator<T, R, N> | AsyncIterator<T, R, N>, equals: (oldElement: T, newElement: T) => boolean | Promise<boolean>): Promise<T[]>;
    //#endregion
}
