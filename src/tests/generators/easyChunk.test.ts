import { expect } from "chai";
import Easy from "../..";

describe("ƒ easyChunk()", function () {
    it("should split an array to multiple chunks and get the total sum of each chunk", function () {
        const result = Easy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).easyChunk(3)
            .map(c => c.sum())
            .toArray();
        expect(result).to.be.deep.eq([6, 15, 24, 10]);
    });

    it("should split an array to multiple chunks", function () {
        const result: number[][] = [];
        for (const chunk of Easy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).easyChunk(3)) {
            result.push(chunk.toArray());
        }
        expect(result).to.be.deep.eq([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
    });

    it("should return one chunk for size greater than the size of the array", function () {
        const result: number[][] = [];
        for (const chunk of Easy.from([1, 2, 3, 4, 5]).easyChunk(6)) {
            result.push(chunk.toArray());
        }
        expect(result).to.be.deep.eq([[1, 2, 3, 4, 5]]);
    });

    it("should split an array into one by one chunks", function () {
        const result: number[][] = [];
        for (const chunk of Easy.from([1, 2, 3]).easyChunk(1)) {
            result.push(chunk.toArray());
        }
        expect(result).to.be.deep.eq([[1], [2], [3]]);
    });

    it("should return an empty array for zero size of chunks", function () {
        const result: number[][] = [];
        for (const chunk of Easy.from([1, 2, 3]).easyChunk(0)) {
            result.push(chunk.toArray());
        }
        expect(result).to.be.eql([[1, 2, 3]]);
    });

    it("should return an empty array for negative size of chunks", function () {
        const result: number[][] = [];
        for (const chunk of Easy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).easyChunk(-3)) {
            result.push(chunk.toArray());
        }
        expect(result).to.be.eql([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);
    });
});
