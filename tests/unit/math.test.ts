import {add} from "../mocks/math";

test('add function adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
});