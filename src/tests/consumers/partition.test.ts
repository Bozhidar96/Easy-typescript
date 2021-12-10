import { expect } from "chai";
import Easy from "../..";

describe("ƒ partition()", function () {
    it("should split the array into two parts", function () {
        const partition = Easy.from([1, 2, 3, 4]).partition((n) => n % 2 === 0);
        expect(partition).to.be.deep.eq([
            [2, 4],
            [1, 3],
        ]);
    });

    it("should return two empty arrays if the iterator is empty", function () {
        const partition = Easy.from([]).partition((n) => n % 2 === 0);
        expect(partition).to.be.deep.eq([[], []]);
    });
});
