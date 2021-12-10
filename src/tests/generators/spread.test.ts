import { expect } from "chai";
import Easy from "../..";

describe("ƒ spread()", function () {
    it("should spread an array of strings", function () {
        const spread = Easy.from(["test1", "test2", "t"]).spread().toArray();
        expect(spread).to.be.eql(["t", "e", "s", "t", "1", "t", "e", "s", "t", "2", "t"]);
    });

    it("should spread an array of arrays", function () {
        const spread = Easy.from([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8],
        ])
            .spread()
            .toArray();
        expect(spread).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8]);
    });
});
