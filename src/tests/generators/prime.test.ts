import { expect } from "chai";
import Easy from "../..";

describe("ƒ prime()", function() {
    it("should generate 10 prime numbers", function() {
        const primes = Easy.prime().take(10).toArray();
        expect(primes).to.be.deep.eq([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
    });

    it("should generate 10 prime numbers greater than 10", function() {
        const primes = Easy.prime(10).take(10).toArray();
        expect(primes).to.be.deep.eq([11, 13, 17, 19, 23, 29, 31, 37, 41, 43]);
    });
});
