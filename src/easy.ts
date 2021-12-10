import { Chain, ChainAsync } from "./chain";
import { IEasy, IEasyCollection, IEasyCollectionAsync } from "./contracts";
import * as λ from "./generators";

const isIterable = <U, T extends Iterable<U>>(it: T | unknown): it is T extends Iterable<infer U> ? Iterable<U> : Iterable<unknown> => {
    const type = typeof it;
    return type === "string" || (it != null && (typeof it === "object" || typeof it === "function") && typeof Reflect.get(it as object, Symbol.iterator) === "function");
};

const isIterableAsync = <U, T extends AsyncIterable<U>>(it: T | unknown): it is T extends AsyncIterable<infer U> ? AsyncIterable<U> : AsyncIterable<unknown> => {
    return (it != null && (typeof it === "object" || typeof it === "function") && typeof Reflect.get(it as object, Symbol.asyncIterator) === "function");
};

const Easy: IEasy = {
    circular: <T>(iterable: Iterable<T>): IEasyCollection<T, void, undefined> => new Chain(λ.circular(iterable)),
    from: <T, R, N>(source: Iterable<T> | Iterator<T, R, N>): IEasyCollection<T, R | void, N | undefined> => {
        return isIterable(source) ? new Chain(source[Symbol.iterator]()) : new Chain(source);
    },
    fromAsync: <T, R, N>(source: AsyncIterable<T> | AsyncIterator<T, R, N>): IEasyCollectionAsync<T, R | void, N | undefined> => {
        return isIterableAsync(source) ? new ChainAsync(source[Symbol.asyncIterator]()) : new ChainAsync(source);
    },
    fibonacci: (minimum?: number): IEasyCollection<number, void, number> => new Chain(λ.fibonacci(minimum)),
    generate: <T> (func: () => T): IEasyCollection<T, void, undefined> => new Chain(λ.generate(func)),
    generateAsync: <T> (func: () => T | Promise<T>): IEasyCollectionAsync<T, void, undefined> => new ChainAsync(λ.generateAsync(func)),
    prime: (minimum?: number): IEasyCollection<number, void, number> => new Chain(λ.prime(minimum)),
    random: (parameters?: Partial<λ.RandomParams>): IEasyCollection<number, void, undefined> => new Chain(λ.random(parameters)),
    randomFrom: <T>(array: T[]): IEasyCollection<T, void, undefined> => new Chain(λ.randomFrom(array)),
    range: (parameters?: Partial<λ.RangeParams>): IEasyCollection<number, void, undefined> => new Chain(λ.range(parameters)),
};

export default Easy;
