import { expect } from "chai";
import Easy from "../..";

describe("ƒ skip()", function () {
    it("should skip the first five numbers", function () {
        const result = Easy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).skip(5).toArray();
        expect(result).to.be.eql([6, 7, 8, 9, 10]);
    });

    it("should skip all elements if pass same length as the array length", function () {
        const result = Easy.from([1, 2, 3, 4, 5]).skip(5).toArray();
        expect(result).to.be.eql([]);
    });

    it("should skip all elements if pass greater length than the array length", function () {
        const result = Easy.from([1, 2, 3, 4, 5]).skip(10).toArray();
        expect(result).to.be.eql([]);
    });

    it("should return same array if pass zero count", function () {
        const result = Easy.from([1, 2, 3, 4, 5]).skip(0).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5]);
    });

    it("should return same array if pass negative count", function () {
        const result = Easy.from([1, 2, 3, 4, 5]).skip(-5).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5]);
    });
});
