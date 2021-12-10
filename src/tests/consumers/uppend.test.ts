import { expect } from "chai";
import Easy from "../..";

describe("ƒ uppend()", function () {

    it("should append only those values that do not exist in the new array", function () {
        const database = [
            { name: "Ivan", age: 20 },
            { name: "Petar", age: 30 },
        ];

        const userInput = [
            { name: "Ivan", age: 40 },
            { name: "Spas", age: 20 }
        ];

        const expected = [
            { name: "Ivan", age: 40 },
            { name: "Petar", age: 30 },
            { name: "Spas", age: 20 },
        ]

        const it = Easy.from(userInput).toIterator();
        const uppended = Easy.from(database).uppend(it, (oldValue, newValue) => oldValue.name === newValue.name);
        expect(uppended).to.be.deep.eq(expected);
    });
});
