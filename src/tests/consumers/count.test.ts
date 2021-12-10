import { expect } from "chai";
import Easy from "../..";

describe("ƒ count()", function () {
    it("should return the length of an array", function () {
        const count = Easy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).count();
        expect(count).to.be.equal(10);
    });

    it("should return the length of an empty array", function () {
        const count = Easy.from([]).count();
        expect(count).to.be.equal(0);
    });
});
