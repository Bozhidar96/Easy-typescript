import { expect } from "chai";
import Easy from "../../easy";

describe("ƒ custom()", function () {
    it("should double each number and the take the total sum", function () {
        const double = function* (iterator: Iterator<number, unknown, unknown>) {
            let x = iterator.next();

            while (x.done !== true) {
                yield x.value * 2;
                x = iterator.next();
            }
        };

        const result = Easy.from([1, 2, 3, 4]).custom(double).sum();
        expect(result).to.be.equal(20);
    });
});
