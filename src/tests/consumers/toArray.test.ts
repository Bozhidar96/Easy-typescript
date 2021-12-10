import { expect } from "chai";
import Easy from "../..";

describe("ƒ toArray()", function () {
    it("should convert iterator to an array", function () {
        const result = Easy.prime().take(5).toArray();
        expect(result).to.be.eql([2, 3, 5, 7, 11]);
    });
});
