import { IEasyCollection, IEasyCollectionAsync } from ".";
import { RandomParams, RangeParams } from "../generators";

export interface IEasy {
    circular<T>(iterable: Iterable<T>): IEasyCollection<T, void, undefined>;
    from: <T, R, N>(source: Iterable<T> | Iterator<T, R, N>) => IEasyCollection<T, R | void, N | undefined>;
    fromAsync: <T, R, N>(source: AsyncIterable<T> | AsyncIterator<T, R, N>) => IEasyCollectionAsync<T, R | void, N | undefined>;
    fibonacci: (minimum?: number) => IEasyCollection<number, void, number>;
    generate: <T> (func: () => T) => IEasyCollection<T, void, undefined>;
    generateAsync: <T> (func: () => T | Promise<T>) => IEasyCollectionAsync<T, void, undefined>;
    prime(minimum?: number): IEasyCollection<number, void, number>;
    random(parameters?: Partial<RandomParams>): IEasyCollection<number, void, undefined>;
    randomFrom<T>(array: T[]): IEasyCollection<T, void, undefined>;
    range(parameters?: Partial<RangeParams>): IEasyCollection<number, void, undefined>;
}