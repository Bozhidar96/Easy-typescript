import { Depth, OptionalComparer, Primitive, Select, FlatArray, PromiseValue, AnyIterableValue } from "../common";
import { IEasyCollection, IEasyCollectionAsync } from "../contracts";
import * as λ from "../generators";
import * as γ from "../consumers";
import { Chain } from ".";

export class ChainAsync<T, R, N> implements IEasyCollectionAsync<T, R, N> {
    #source: AsyncIterator<T, R, N>;

    constructor(source: AsyncIterator<T, R, N>) {
        this.#source = source;
    }

    [Symbol.asyncIterator] = (): AsyncIterator<T, R, N> => this.#source;

    //#region Generators
    append(...iterables: Array<Iterable<T> | AsyncIterable<T>>): IEasyCollectionAsync<T, R, N> {
        return new ChainAsync(λ.appendAsync(this.#source, ...iterables));
    }

    at(index: number): IEasyCollectionAsync<T, R, N> {
        return new ChainAsync(λ.atAsync(this.#source, index));
    }

    balancedChunk(target: number, ...select: T extends number ? [] : [(value: T) => number]): IEasyCollectionAsync<T[], void, undefined> {
        return new ChainAsync(λ.balancedChunkAsync(this.#source, target, ...select));
    }

    chunk(size: number): IEasyCollectionAsync<T[], R, N> {
        return new ChainAsync(λ.chunkAsync(this.#source, size));
    }

    concat(...iterators: Array<Iterator<T, unknown, unknown> | AsyncIterator<T, unknown, unknown>>): IEasyCollectionAsync<T, void, undefined> {
        return new ChainAsync(λ.concatAsync(this.#source, ...iterators));
    }

    custom<T2, R2, N2>(generator: (iterator: AsyncIterator<T, R, N>) => AsyncGenerator<T2, R2, N2>): IEasyCollectionAsync<T2, R2, N2> {
        return new ChainAsync(generator(this.#source));
    }

    distinct(...select: T extends Primitive ? [] : [(value: T) => Primitive]): IEasyCollectionAsync<T, R, undefined> {
        return new ChainAsync(λ.distinctAsync(this.#source, ...select));
    }

    feed<R2, V>(from: Iterator<V, R2, T> | AsyncIterator<V, R2, T>): IEasyCollectionAsync<V, void, undefined> {
        return new ChainAsync(λ.feedAsync(this.#source, from));
    }

    fill(values: Iterable<T> | AsyncIterable<T>, start?: number, end?: number): IEasyCollectionAsync<T, R, undefined> {
        return new ChainAsync(λ.fillAsync(this.#source, values, start, end));
    }

    filter(predicate: (value: T, index: number) => boolean | Promise<boolean>): IEasyCollectionAsync<T, R, undefined> {
        return new ChainAsync(λ.filterAsync(this.#source, predicate));
    }

    filterWithIndex(predicate: (value: T, index: number) => boolean | Promise<boolean>): IEasyCollectionAsync<[T, number], R, undefined> {
        return new ChainAsync(λ.filterWithIndexAsync(this.#source, predicate));
    }

    flat<D extends Depth = 20>(depth: D = 20 as D): IEasyCollectionAsync<FlatArray<T, D>, R, undefined> {
        return new ChainAsync(λ.flatAsync(this.#source, depth));
    }

    flatMap<V, D extends Depth = 20>(transformer: (value: T, index: number) => V, depth: D = 20 as D): IEasyCollectionAsync<FlatArray<V, D>, R, undefined> {
        return new ChainAsync(λ.flatMapAsync(this.#source, transformer, depth));
    }

    forEach(action: (value: T, index: number) => void): IEasyCollectionAsync<T, R, undefined> {
        return new ChainAsync(λ.forEachAsync(this.#source, action));
    }

    groupBy<TKey, TElement, TResult>(
        keySelector: (value: T) => TKey,
        elementSelector: (value: T) => TElement,
        resultSelector: (key: TKey, elements: TElement[]) => TResult
    ): IEasyCollectionAsync<TResult, R, undefined> {
        return new ChainAsync(λ.groupByAsync(this.#source, keySelector, elementSelector, resultSelector));
    }

    indices(predicate: (value: T, index: number) => boolean | Promise<boolean>): IEasyCollectionAsync<number, R, undefined> {
        return new ChainAsync(λ.indicesAsync(this.#source, predicate));
    }

    easyChunk(size: number): IEasyCollectionAsync<IEasyCollectionAsync<T, void, unknown>, R, undefined> {
        return new ChainAsync(λ.easyChunkAsync(this.#source, size));
    }

    easyGroupBy<TKey, TElement, TResult>(
        keySelector: (value: T) => TKey,
        elementSelector: (value: T) => TElement,
        resultSelector: (key: TKey, elements: IEasyCollectionAsync<TElement, void, undefined>) => TResult
    ): IEasyCollectionAsync<TResult, R, undefined> {
        return new ChainAsync(λ.easyGroupByAsync(this.#source, keySelector, elementSelector, resultSelector));
    }

    easyPartition(predicate: (value: T, index: number) => boolean | Promise<boolean>): IEasyCollection<IEasyCollectionAsync<T, void, undefined>, void, undefined> {
        return new Chain(λ.easyPartitionAsync(this.#source, predicate));
    }

    map<V>(transformer: (value: T, index: number) => V): IEasyCollectionAsync<V, R, undefined> {
        return new ChainAsync(λ.mapAsync(this.#source, transformer));
    }

    prepend(...iterables: Array<Iterable<T> | AsyncIterable<T>>): IEasyCollectionAsync<T, R, undefined> {
        return new ChainAsync(λ.prependAsync(this.#source, ...iterables));
    }

    repeat(count: number): IEasyCollectionAsync<T, R | undefined, undefined> {
        return new ChainAsync(λ.repeatAsync(this.#source, count));
    }

    skip(count: number): IEasyCollectionAsync<T, R, undefined> {
        return new ChainAsync(λ.skipAsync(this.#source, count));
    }

    skipWhile(predicate: (value: T, index: number) => boolean | Promise<boolean>): IEasyCollectionAsync<T, R, undefined> {
        return new ChainAsync(λ.skipWhileAsync(this.#source, predicate));
    }

    sort(...comparer: OptionalComparer<T>): IEasyCollectionAsync<T, R, undefined> {
        return new ChainAsync(λ.sortAsync(this.#source, ...comparer));
    }

    splice(start: number, deleteCount?: number, ...items: T[]): IEasyCollectionAsync<T, T[], undefined> {
        return new ChainAsync(λ.spliceAsync(this.#source, start, deleteCount, ...items));
    }

    spread(): IEasyCollectionAsync<AnyIterableValue<T>, R, undefined> {
        return new ChainAsync(λ.spreadAsync(this.#source));
    }

    take(count: number): IEasyCollectionAsync<T, R | undefined, undefined> {
        return new ChainAsync(λ.takeAsync(this.#source, count));
    }

    takeWhile(predicate: (value: T, index: number) => boolean | Promise<boolean>): IEasyCollectionAsync<T, R | undefined, undefined> {
        return new ChainAsync(λ.takeWhileAsync(this.#source, predicate));
    }

    zip<T2, R2, TResult>(iterator2: Iterator<T2, R2, N> | AsyncIterator<T2, R2, N>, resultSelector: (first: T, second: T2) => TResult): IEasyCollectionAsync<TResult, R | R2 | undefined, undefined> {
        return new ChainAsync(λ.zipAsync(this.#source, iterator2, resultSelector));
    }
    //#endregion

    //#region Consumers
    average(...select: T extends number ? [] : [(value: T) => number]): Promise<number> {
        return γ.averageAsync(this.#source, ...select);
    }

    count(): Promise<number> {
        return γ.countAsync(this.#source);
    }

    every(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<boolean> {
        return γ.everyAsync(this.#source, predicate);
    }

    first(predicate?: (value: T, index: number) => boolean | Promise<boolean>): Promise<T | undefined> {
        return γ.firstAsync(this.#source, predicate);
    }

    firstWithIndex(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<[T | undefined, number]> {
        return γ.firstWithIndexAsync(this.#source, predicate);
    }

    includes(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<boolean> {
        return γ.includesAsync(this.#source, predicate);
    }

    indexOf(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<number> {
        return γ.indexOfAsync(this.#source, predicate);
    }

    join(separator: string, ...select: Select<T, Primitive>): Promise<string> {
        return γ.joinAsync(this.#source, separator, ...select);
    }

    last(predicate?: (value: T, index: number) => boolean | Promise<boolean>): Promise<T | undefined> {
        return γ.lastAsync(this.#source, predicate);
    }

    lastIndexOf(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<number> {
        return γ.lastIndexOfAsync(this.#source, predicate);
    }

    lastWithIndex(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<[T | undefined, number]> {
        return γ.lastWithIndexAsync(this.#source, predicate);
    }

    max(...select: T extends number ? [] : [(value: T) => number]): Promise<number> {
        return γ.maxAsync(this.#source, ...select);
    }

    min(...select: T extends number ? [] : [(value: T) => number]): Promise<number> {
        return γ.minAsync(this.#source, ...select);
    }

    partition(predicate: (value: T, index: number) => boolean | Promise<boolean>): Promise<[T[], T[]]> {
        return γ.partitionAsync(this.#source, predicate);
    }

    product(...select: T extends number ? [] : [(value: T) => number]): Promise<number> {
        return γ.productAsync(this.#source, ...select);
    }

    promiseAll(): Promise<PromiseValue<T>[]> {
        return γ.promiseAll(this.#source);
    }

    reduce<U>(reducer: (value: T, accumulator: U) => U, initial: U): Promise<U> {
        return γ.reduceAsync(this.#source, reducer, initial);
    }

    run(): Promise<R> {
        return γ.runAsync(this.#source);
    }

    sum(...select: T extends number ? [] : [(value: T) => number]): Promise<number> {
        return γ.sumAsync(this.#source, ...select);
    }

    toArray(): Promise<T[]> {
        return γ.toArrayAsync(this.#source);
    }

    toAsyncIterator(): AsyncIterator<T, R, N> {
        return this.#source;
    }

    toMap<K, V>(select: (value: T) => [K, V]): Promise<Map<K, V>> {
        return γ.toMapAsync(this.#source, select);
    }

    toSet(): Promise<Set<T>> {
        return γ.toSetAsync(this.#source);
    }

    toWeakMap<K extends object, V>(select: (value: T) => [K, V]): Promise<WeakMap<K, V>> {
        return γ.toWeakMapAsync(this.#source, select);
    }

    toWeakSet<K extends object>(...select: T extends object ? [] : [(value: T) => K]): Promise<WeakSet<K>> {
        return γ.toWeakSetAsync(this.#source, ...select);
    }

    uppend(iterator: Iterator<T, R, N> | AsyncIterator<T, R, N>, equals: (oldElement: T, newElement: T) => boolean | Promise<boolean>): Promise<T[]> {
        return γ.uppendAsync(this.#source, iterator, equals);
    }

    //#endregion
}
