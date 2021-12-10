import { expect } from "chai";
import Easy from "../..";

describe("ƒ concat()", function () {
    it("should concat two iterators", function () {
        const easyArray = Easy.from([6, 7, 8, 9, 10]).toIterator();
        const result = Easy.from([1, 2, 3, 4, 5]).concat(easyArray).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should concat multiple iterators", function () {
        const easyArray1 = Easy.from([5, 6, 7]).toIterator();
        const easyArray2 = Easy.from([8, 9, 10]).toIterator();
        const result = Easy.from([1, 2, 3, 4]).concat(easyArray1, easyArray2).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should return same if empty array is passed", function () {
        const result = Easy.from([1, 2, 3, 4, 5]).concat(Easy.from([]).toIterator()).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5]);
    });
});
