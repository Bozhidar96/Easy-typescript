import { IEasyCollectionAsync } from ".";
import { Depth, OptionalComparer, Primitive, Select, FlatArray, PromiseValue, IterableValue } from "../common/helpers";

export interface IEasyCollection<T, R, N> {
    [Symbol.iterator](): Iterator<T, R, N>;

    //#region Generators
    append(...iterables: Array<Iterable<T>>): IEasyCollection<T, R, N>;
    at(index: number): IEasyCollection<T, R, N>;
    balancedChunk(target: number, ...select: T extends number ? [] : [(value: T) => number]): IEasyCollection<T[], void, undefined>;
    chunk(size: number): IEasyCollection<T[], R, N>;
    concat(...iterators: Array<Iterator<T, unknown, unknown>>): IEasyCollection<T, void, undefined>;
    custom<T2, R2, N2>(generator: (iterator: Iterator<T, R, N>) => Generator<T2, R2, N2>): IEasyCollection<T2, R2, N2>;
    distinct(...select: T extends Primitive ? [] : [(value: T) => Primitive]): IEasyCollection<T, R, undefined>;
    feed<R2, V>(from: Iterator<V, R2, T>): IEasyCollection<V, void, undefined>;
    fill(values: Iterable<T>, start?: number, end?: number): IEasyCollection<T, R, undefined>;
    filter(predicate: (value: T, index: number) => boolean): IEasyCollection<T, R, undefined>;
    filterWithIndex(predicate: (value: T, index: number) => boolean): IEasyCollection<[T, number], R, undefined>;
    flat<D extends Depth = 20>(depth?: D): IEasyCollection<FlatArray<T, D>, R, undefined>;
    flatMap<V, D extends Depth = 20>(transformer: (value: T, index: number) => V, depth?: D): IEasyCollection<FlatArray<V, D>, R, undefined>;
    forEach(action: (value: T, index: number) => void): IEasyCollection<T, R, undefined>;
    groupBy<TKey, TElement, TResult>(
        keySelector: (value: T) => TKey,
        elementSelector: (value: T) => TElement,
        resultSelector: (key: TKey, elements: TElement[]) => TResult
    ): IEasyCollection<TResult, R, undefined>;
    indices(predicate: (value: T, index: number) => boolean): IEasyCollection<number, R, undefined>;
    easyChunk(size: number): IEasyCollection<IEasyCollection<T, void, unknown>, R, undefined>;
    easyGroupBy<TKey, TElement, TResult>(
        keySelector: (value: T) => TKey,
        elementSelector: (value: T) => TElement,
        resultSelector: (key: TKey, elements: IEasyCollectionAsync<TElement, void, undefined>) => TResult
    ): IEasyCollection<TResult, R, undefined>;
    easyPartition(predicate: (value: T, index: number) => boolean): IEasyCollection<IEasyCollectionAsync<T, void, undefined>, R, undefined>;
    map<V>(transformer: (value: T, index: number) => V): IEasyCollection<V, R, undefined>;
    prepend(...iterables: Array<Iterable<T>>): IEasyCollection<T, R, undefined>;
    repeat(count: number): IEasyCollection<T, R | undefined, undefined>;
    skip(count: number): IEasyCollection<T, R, undefined>;
    skipWhile(predicate: (value: T, index: number) => boolean): IEasyCollection<T, R, undefined>;
    sort(...comparer: OptionalComparer<T>): IEasyCollection<T, R, undefined>;
    splice(start: number, deleteCount?: number, ...items: T[]): IEasyCollection<T, T[], undefined>;
    spread(): IEasyCollection<IterableValue<T>, R, undefined>;
    take(count: number): IEasyCollection<T, R | undefined, undefined>;
    takeWhile(predicate: (value: T, index: number) => boolean): IEasyCollection<T, R | undefined, undefined>;
    zip<T2, R2, TResult>(iterator: Iterator<T2, R2, N>, resultSelector: (first: T, second: T2) => TResult): IEasyCollection<TResult, R | R2 | undefined, undefined>;
    //#endregion

    //#region Consumers
    average(...select: T extends number ? [] : [(value: T) => number]): number;
    count(): number;
    every(predicate: (value: T, index: number) => boolean): boolean;
    first(predicate?: (value: T, index: number) => boolean): T | undefined;
    firstWithIndex(predicate: (value: T, index: number) => boolean): [T | undefined, number];
    includes(predicate: (value: T, index: number) => boolean): boolean;
    indexOf(predicate: (value: T, index: number) => boolean): number;
    join(separator: string, ...select: Select<T, Primitive>): string;
    last(predicate?: (value: T, index: number) => boolean): T | undefined;
    lastIndexOf(predicate: (value: T, index: number) => boolean): number;
    lastWithIndex(predicate: (value: T, index: number) => boolean): [T | undefined, number];
    max(...select: T extends number ? [] : [(value: T) => number]): number;
    min(...select: T extends number ? [] : [(value: T) => number]): number;
    partition(predicate: (value: T, index: number) => boolean): [T[], T[]];
    product(...select: T extends number ? [] : [(value: T) => number]): number;
    promiseAll(): Promise<PromiseValue<T>[]>;
    promiseRace(): Promise<PromiseValue<T>>;
    reduce<V>(reducer: (value: T, accumulator: V) => V, initial: V): V;
    run(): R;
    sum(...select: T extends number ? [] : [(value: T) => number]): number;
    toArray(): T[];
    toIterator(): Iterator<T, R, N>;
    toMap<K, V>(select: (value: T) => [K, V]): Map<K, V>;
    toSet(): Set<T>;
    toWeakMap<K extends object, V>(select: (value: T) => [K, V]): WeakMap<K, V>;
    toWeakSet<K extends object>(...select: T extends object ? [] : [(value: T) => K]): WeakSet<K>;
    uppend(iterator: Iterator<T, R, N>, equals: (oldElement: T, newElement: T) => boolean): T[];
    //#endregion
}
