import { Depth, OptionalComparer, Primitive, Select, FlatArray, PromiseValue, IterableValue } from "../common";
import { IEasyCollection, IEasyCollectionAsync } from "../contracts";
import * as λ from "../generators";
import * as γ from "../consumers";

export class Chain<T, R, N> implements IEasyCollection<T, R, N> {
    #source: Iterator<T, R, N>

    constructor(source: Iterator<T, R, N>) {
        this.#source = source;
    }

    [Symbol.iterator] = (): Iterator<T, R, N> => this.#source;

    //#region Generators
    append(...iterables: Array<Iterable<T>>): IEasyCollection<T, R, N> {
        return new Chain(λ.append(this.#source, ...iterables));
    }

    at(index: number): IEasyCollection<T, R, N> {
        return new Chain(λ.at(this.#source, index));
    }

    balancedChunk(target: number, ...select: T extends number ? [] : [(value: T) => number]): IEasyCollection<T[], void, undefined> {
        return new Chain(λ.balancedChunk(this.#source, target, ...select));
    }

    chunk(size: number): IEasyCollection<T[], R, N> {
        return new Chain(λ.chunk(this.#source, size));
    }

    concat(...iterators: Array<Iterator<T, unknown, unknown>>): IEasyCollection<T, void, undefined> {
        return new Chain(λ.concat(this.#source, ...iterators));
    }

    custom<T2, R2, N2>(generator: (iterator: Iterator<T, R, N>) => Generator<T2, R2, N2>): IEasyCollection<T2, R2, N2> {
        return new Chain(generator(this.#source))
    }

    distinct(...select: T extends Primitive ? [] : [(value: T) => Primitive]): IEasyCollection<T, R, undefined> {
        return new Chain(λ.distinct(this.#source, ...select));
    }

    feed<R2, V>(from: Iterator<V, R2, T>): IEasyCollection<V, void, undefined> {
        return new Chain(λ.feed(this.#source, from));
    }

    fill(values: Iterable<T>, start?: number, end?: number): IEasyCollection<T, R, undefined> {
        return new Chain(λ.fill(this.#source, values, start, end));
    }

    filter(predicate: (value: T, index: number) => boolean): IEasyCollection<T, R, undefined> {
        return new Chain(λ.filter(this.#source, predicate));
    }

    filterWithIndex(predicate: (value: T, index: number) => boolean): IEasyCollection<[T, number], R, undefined> {
        return new Chain(λ.filterWithIndex(this.#source, predicate));
    }

    flat<D extends Depth = 20>(depth: D = 20 as D): IEasyCollection<FlatArray<T, D>, R, undefined> {
        return new Chain(λ.flat(this.#source, depth));
    }

    flatMap<V, D extends Depth = 20>(transformer: (value: T, index: number) => V, depth: D = 20 as D): IEasyCollection<FlatArray<V, D>, R, undefined> {
        return new Chain(λ.flatMap(this.#source, transformer, depth));
    }

    forEach(action: (value: T, index: number) => void): IEasyCollection<T, R, undefined> {
        return new Chain(λ.forEach(this.#source, action));
    }

    groupBy<TKey, TElement, TResult>(
        keySelector: (value: T) => TKey,
        elementSelector: (value: T) => TElement,
        resultSelector: (key: TKey, elements: TElement[]) => TResult
    ): IEasyCollection<TResult, R, undefined> {
        return new Chain(λ.groupBy(this.#source, keySelector, elementSelector, resultSelector));
    }

    indices(predicate: (value: T, index: number) => boolean): IEasyCollection<number, R, undefined> {
        return new Chain(λ.indices(this.#source, predicate));
    }

    easyChunk(size: number): IEasyCollection<IEasyCollection<T, void, unknown>, R, undefined> {
        return new Chain(λ.easyChunk(this.#source, size));
    }

    easyGroupBy<TKey, TElement, TResult>(
        keySelector: (value: T) => TKey,
        elementSelector: (value: T) => TElement,
        resultSelector: (key: TKey, elements: IEasyCollectionAsync<TElement, void, undefined>) => TResult
    ): IEasyCollection<TResult, R, undefined> {
        return new Chain(λ.easyGroupBy(this.#source, keySelector, elementSelector, resultSelector));
    }

    easyPartition(predicate: (value: T, index: number) => boolean): IEasyCollection<IEasyCollectionAsync<T, void, undefined>, R, undefined> {
        return new Chain(λ.easyPartition(this.#source, predicate));
    }

    map<V>(transformer: (value: T, index: number) => V): IEasyCollection<V, R, undefined> {
        return new Chain(λ.map(this.#source, transformer));
    }

    prepend(...iterables: Array<Iterable<T>>): IEasyCollection<T, R, undefined> {
        return new Chain(λ.prepend(this.#source, ...iterables));
    }

    repeat(count: number): IEasyCollection<T, R | undefined, undefined> {
        return new Chain(λ.repeat(this.#source, count));
    }

    skip(count: number): IEasyCollection<T, R, undefined> {
        return new Chain(λ.skip(this.#source, count));
    }

    skipWhile(predicate: (value: T, index: number) => boolean): IEasyCollection<T, R, undefined> {
        return new Chain(λ.skipWhile(this.#source, predicate));
    }

    sort(...comparer: OptionalComparer<T>): IEasyCollection<T, R, undefined> {
        return new Chain(λ.sort(this.#source, ...comparer));
    }

    splice(start: number, deleteCount?: number, ...items: T[]): IEasyCollection<T, T[], undefined> {
        return new Chain(λ.splice(this.#source, start, deleteCount, ...items));
    }

    spread(): IEasyCollection<IterableValue<T>, R, undefined> {
        return new Chain(λ.spread(this.#source));
    }

    take(count: number): IEasyCollection<T, R | undefined, undefined> {
        return new Chain(λ.take(this.#source, count));
    }

    takeWhile(predicate: (value: T, index: number) => boolean): IEasyCollection<T, R | undefined, undefined> {
        return new Chain(λ.takeWhile(this.#source, predicate));
    }

    zip<T2, R2, TResult>(iterator2: Iterator<T2, R2, N>, resultSelector: (first: T, second: T2) => TResult): IEasyCollection<TResult, R | R2 | undefined, undefined> {
        return new Chain(λ.zip(this.#source, iterator2, resultSelector));
    }

    //#endregion

    //#region Consumers
    average(...select: T extends number ? [] : [(value: T) => number]): number {
        return γ.average(this.#source, ...select);
    }

    count(): number {
        return γ.count(this.#source);
    }

    every(predicate: (value: T, index: number) => boolean): boolean {
        return γ.every(this.#source, predicate)
    }

    first(predicate?: (value: T, index: number) => boolean): T | undefined {
        return γ.first(this.#source, predicate);
    }

    firstWithIndex(predicate: (value: T, index: number) => boolean): [T | undefined, number] {
        return γ.firstWithIndex(this.#source, predicate);
    }

    includes(predicate: (value: T, index: number) => boolean): boolean {
        return γ.includes(this.#source, predicate);
    }

    indexOf(predicate: (value: T, index: number) => boolean): number {
        return γ.indexOf(this.#source, predicate);
    }

    join(separator: string, ...select: Select<T, Primitive>): string {
        return γ.join(this.#source, separator, ...select);
    }

    last(predicate?: (value: T, index: number) => boolean): T | undefined {
        return γ.last(this.#source, predicate);
    }

    lastIndexOf(predicate: (value: T, index: number) => boolean): number {
        return γ.lastIndexOf(this.#source, predicate);
    }

    lastWithIndex(predicate: (value: T, index: number) => boolean): [T | undefined, number] {
        return γ.lastWithIndex(this.#source, predicate);
    }

    max(...select: T extends number ? [] : [(value: T) => number]): number {
        return γ.max(this.#source, ...select);
    }

    min(...select: T extends number ? [] : [(value: T) => number]): number {
        return γ.min(this.#source, ...select);
    }

    partition(predicate: (value: T, index: number) => boolean): [T[], T[]] {
        return γ.partition(this.#source, predicate);
    }

    product(...select: T extends number ? [] : [(value: T) => number]): number {
        return γ.product(this.#source, ...select);
    }

    reduce<U>(reducer: (value: T, accumulator: U) => U, initial: U): U {
        return γ.reduce(this.#source, reducer, initial);
    }

    promiseAll(): Promise<PromiseValue<T>[]> {
        return γ.promiseAll(this.#source);
    }

    promiseRace(): Promise<PromiseValue<T>> {
        return γ.promiseRace(this.#source);
    }

    run(): R {
        return γ.run(this.#source);
    }

    sum(...select: T extends number ? [] : [(value: T) => number]): number {
        return γ.sum(this.#source, ...select);
    }

    toArray(): T[] {
        return γ.toArray(this.#source);
    }

    toIterator(): Iterator<T, R, N> {
        return this.#source
    };

    toMap<K, V>(select: (value: T) => [K, V]): Map<K, V>{
        return γ.toMap(this.#source, select);
    }

    toSet(): Set<T> {
        return γ.toSet(this.#source);
    }

    toWeakMap<K extends object, V>(select: (value: T) => [K, V]): WeakMap<K, V> {
        return γ.toWeakMap(this.#source, select);
    }

    toWeakSet<K extends object>(...select: T extends object ? [] : [(value: T) => K]): WeakSet<K> {
        return γ.toWeakSet(this.#source, ...select);
    }

    uppend(iterator: Iterator<T, R, N>, equals: (oldElement: T, newElement: T) => boolean): T[] {
        return γ.uppend(this.#source, iterator, equals);
    }

    //#endregion
}
