import {add} from "../mocks/math";
import {subtract} from "../mocks/math";

test('add function adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
});

test('subtract function subtracts two numbers correctly', () => {
    expect(subtract(2, 3)).toBe(-1);
});