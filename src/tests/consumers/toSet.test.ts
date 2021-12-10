import { assert, expect } from "chai";
import Easy from "../..";

describe("ƒ toSet()", function () {
    it("should convert iterator to a set", function () {
        const result = Easy.prime().take(5).toSet();
        assert.isTrue(result instanceof Set);
        expect(result.size).to.be.equal(5);
        expect(Array.from(result)).to.be.eql([2, 3, 5, 7, 11]);
    });
});
