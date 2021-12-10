import { expect } from "chai";
import Easy from "../..";

describe("ƒ append()", function () {
    it("should append an array", function () {
        const result = Easy.from([1, 2, 3, 4, 5]).append([6, 7, 8, 9, 10]).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should append multiple arrays", function () {
        const result = Easy.from([1, 2, 3, 4, 5]).append([6, 7], new Set([8, 9, 10])).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should append multiple arrays for chained calls", function () {
        const result = Easy.from([1, 2, 3, 4, 5]).append([6, 7]).append([8, 9, 10]).toArray();
        expect(result).to.be.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should append 5 numbers to 5 randomly generated numbers", function () {
        const result = Easy.random({ min: -5, max: 0 })
            .take(5)
            .append([1, 2, 3, 4, 5])
            .toArray();
            
        for (let i = 0; i < 5; i++) {
            const n = result[i];
            expect(n).to.satisfy(Number.isInteger);
            expect(n).to.be.greaterThanOrEqual(-5);
            expect(n).to.be.lessThanOrEqual(0);
        }

        expect(result.slice(-5)).to.be.deep.eq([1, 2, 3, 4, 5]);
    });

    it("should append 5 circular numbers to 5 randomly generated numbers", function () {
        const circular = Easy.circular([1, 2]);
        
        const result = Easy.random({ min: -5, max: 0 })
            .take(5)
            .append(circular)
            .take(10)
            .toArray();
            
        for (let i = 0; i < 5; i++) {
            const n = result[i];
            expect(n).to.satisfy(Number.isInteger);
            expect(n).to.be.greaterThanOrEqual(-5);
            expect(n).to.be.lessThanOrEqual(0);
        }

        expect(result.slice(-5)).to.be.deep.eq([1, 2, 1, 2, 1]);
    });

    it("should append 5 circular numbers to 5 randomly generated numbers", function () {
        const circular = Easy.circular([1, 2]).take(5);
        const random = Easy.random({ min: -5, max: 0 }).take(5);
        const result = random.append(circular).toArray();
            
        for (let i = 0; i < 5; i++) {
            const n = result[i];
            expect(n).to.satisfy(Number.isInteger);
            expect(n).to.be.greaterThanOrEqual(-5);
            expect(n).to.be.lessThanOrEqual(0);
        }

        expect(result.slice(-5)).to.be.deep.eq([1, 2, 1, 2, 1]);
    });
});
