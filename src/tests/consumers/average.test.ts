import { expect } from "chai";
import Easy from "../..";

describe("ƒ average()", function () {
    it("should get the average value of three integer numbers", function () {
        const result = Easy.from([1, 2, 3]).average();
        expect(result).to.be.equal(2);
    });

    it("should get the average value of four floating numbers", function () {
        const result = Easy.from([1.1, 2.2, 3.3, 4.4]).average();
        expect(result).to.be.equal(2.75);
    });

    it("should get the average value of positive and negative numbers", function () {
        const result = Easy.from([1, -3, 2, 3, 4, 5, -4, 6, -11, 7, 8, -5, 9, 10, -2]).average();
        expect(result).to.be.equal(2);
    });

    it("should get the average number of all numbers from objects", function () {
        const result = Easy.from([{ n: 2 }, { n: 4 }, { n: 1 }, { n: 3 }]).average((obj) => obj.n);
        expect(result).to.be.equal(2.5);
    });
});
