import { expect } from "chai";
import Easy from "../..";

describe("ƒ repeat()", function () {
    it("should not repeat if count is negative", function () {
        const repeat = Easy.from([1, 2, 3]).repeat(-1).toArray();
        expect(repeat).to.be.eql([1, 2, 3]);
    });

    it("should not repeat if count is 0", function () {
        const repeat = Easy.from([1, 2, 3]).repeat(0).toArray();
        expect(repeat).to.be.eql([1, 2, 3]);
    });

    it("should repeat each value once", function () {
        const repeat = Easy.from([1, 2, 3]).repeat(1).toArray();
        expect(repeat).to.be.eql([1, 1, 2, 2, 3, 3]);
    });

    it("should repeat each value twice", function () {
        const repeat = Easy.from([1, 2, 3]).repeat(2).toArray();
        expect(repeat).to.be.eql([1, 1, 1, 2, 2, 2, 3, 3, 3]);
    });

    it("should repeat each value thrice", function () {
        const repeat = Easy.from([1, 2, 3]).repeat(3).toArray();
        expect(repeat).to.be.eql([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3]);
    });
});
