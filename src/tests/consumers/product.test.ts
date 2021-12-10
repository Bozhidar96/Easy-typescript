import { expect } from "chai";
import Easy from "../..";

describe("ƒ product()", function () {
    it("should get the product of even numbers", function () {
        const product = Easy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).product();
        expect(product).to.be.equal(3_628_800);
    });

    it("should get the product of even numbers from objects", function () {
        const product = Easy.from([{ n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }]).product((obj) => obj.n);
        expect(product).to.be.equal(24);
    });
});
