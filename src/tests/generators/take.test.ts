import { expect } from "chai";
import Easy from "../..";

describe("ƒ take()", function () {
    it("should take the first five numbers", function () {
        const result = Easy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).take(5).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5]);
    });

    it("should take the same array if pass greater number than array length", function () {
        const result = Easy.from([1, 2, 3, 4, 5]).take(10).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5]);
    });

    it("should take zero elements if pass zero count", function () {
        const result = Easy.from([1, 2, 3, 4, 5]).take(0).toArray();
        expect(result).to.be.eql([]);
    });

    it("should take zero elements if pass negative count", function () {
        const result = Easy.from([1, 2, 3, 4, 5]).take(-5).toArray();
        expect(result).to.be.eql([]);
    });
});
