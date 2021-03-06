import { expect } from "chai";
import Easy from "../..";

describe("ƒ map()", function () {
    it("should double each number", function () {
        const result = Easy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .map((n) => n * 2)
            .toArray();
        expect(result).to.be.eql([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
    });

    it("should decrease each number with one", function () {
        const result = Easy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .map((n) => n - 1)
            .toArray();
        expect(result).to.be.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
});
