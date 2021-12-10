import { expect } from "chai";
import Easy from "../..";

describe("ƒ range()", function () {
    it("should generate 10 numbers", function () {
        const result = Easy.range({ from: 1, to: 10, step: 1 }).toArray();
        expect(result).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should generate 10 negative numbers", function () {
        const result = Easy.range({ from: -1, to: -10, step: -1 }).toArray();
        expect(result).to.be.eql([-1, -2, -3, -4, -5, -6, -7, -8, -9, -10]);
    });

    it("should generate an empty array for invalid input", function () {
        const result = Easy.range({ from: 1, to: 10, step: -1 }).toArray();
        expect(result).to.be.eql([]);
    });

    it("should generate an empty array for invalid input", function () {
        const result = Easy.range({ from: -1, to: -10, step: 1 }).toArray();
        expect(result).to.be.eql([]);
    });
});
