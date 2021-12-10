import { expect } from "chai";
import Easy from "../..";

describe("ƒ zip()", function () {
    it("should zip two arrays into a single one", function () {
        const zipped = Easy.from([1, 2, 3, 4])
            .zip(Easy.from(["one", "two", "three"]).toIterator(), (f, s) => `${f} - ${s}`)
            .toArray();
        expect(zipped).to.be.eql(["1 - one", "2 - two", "3 - three"]);
    });

    it("should zip two arrays into a new array of tuples", function () {
        const zipped = Easy.from([1, 2, 3, 4])
            .zip(Easy.from(["one", "two", "three"]).toIterator(), (f, s) => [f, s])
            .toArray();
        expect(zipped).to.be.deep.eq([
            [1, "one"],
            [2, "two"],
            [3, "three"],
        ]);
    });

    it("should return an empty array for empty input", function () {
        const zipped = Easy.from([])
            .zip(Easy.from(["one", "two", "three"]).toIterator(), (f, s) => `${f} - ${s}`)
            .toArray();
        expect(zipped).to.be.eql([]);
    });

    it("should return an empty array for empty zip input", function () {
        const zipped = Easy.from([1, 2, 3])
            .zip(Easy.from([]).toIterator(), (f, s) => `${f} - ${s}`)
            .toArray();
        expect(zipped).to.be.eql([]);
    });
});
