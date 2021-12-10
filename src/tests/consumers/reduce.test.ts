import { expect } from "chai";
import Easy from "../..";

describe("ƒ reduce()", function () {
    it("should get the sum of all numbers", function () {
        const sum = Easy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).reduce((value, acc) => {
            acc += value;
            return acc;
        }, 0);
        expect(sum).to.be.equal(55);
    });

    it("should get the product of all numbers", function () {
        const product = Easy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).reduce((value, acc) => {
            acc *= value;
            return acc;
        }, 1);
        expect(product).to.be.equal(3_628_800);
    });
});
