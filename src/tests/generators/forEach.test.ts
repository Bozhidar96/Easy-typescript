import { expect } from "chai";
import Easy from "../..";

describe("ƒ forEach()", function () {
    it("should iterate through each value", function () {
        const array = [1, 2, 3];
        const result: number[] = [];

        Easy.from(array)
            .forEach((v, i) => (result[i] = v))
            .run();

        expect(array).to.be.eql([1, 2, 3]); // Asserts that the original array is not modified
        expect(result).to.be.eql(array);
    });
});
