import {add, divide, multiply, subtract} from "../src/utils/maths";

describe("Maths Utilities", () => {
  it("add function should correctly add two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(10, 15)).toBe(25);
    expect(add(0, 0)).toBe(0);
  });
  it("add function should correctly add negative numbers", () => {
    expect(add(-2, -3)).toBe(-5);
    expect(add(-10, 5)).toBe(-5);
    expect(add(10, -15)).toBe(-5);
  });
  it("add function should expect  failing cases", () => {
    expect(add(2, 2)).not.toBe(5);
    expect(add(-1, -1)).not.toBe(0);
  });
  it("subtract function should correctly subtract two numbers", () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(10, 15)).toBe(-5);
  });
  it("subtract function should correctly handle negative results", () => {
    expect(subtract(3, 5)).toBe(-2);
    expect(subtract(-5, -3)).toBe(-2);
  });
  it("subtract function should expect failing cases", () => {
    expect(subtract(5, 2)).not.toBe(4);
    expect(subtract(0, 0)).not.toBe(1);
  });
  it("multiply function should correctly multiply two numbers", () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(0, 5)).toBe(0);
  });
  it("multiply function should correctly handle negative numbers", () => {
    expect(multiply(-2, -3)).toBe(6);
    expect(multiply(-2, 2)).toBe(-4);
  });
  it("multiply function should expect failing cases", () => {
    expect(multiply(2, 2)).not.toBe(5);
    expect(multiply(-1, -1)).not.toBe(-1);
  });
  it("divide function should correctly divide two numbers", () => {
    expect(divide(6, 3)).toBe(2);
    expect(divide(-6, 3)).toBe(-2);
  });
  it("divide function should throw error on division by zero", () => {
    expect(() => divide(5, 0)).toThrow("Division by zero is not allowed.");
  });
  it("divide function should correctly handle negative numbers", () => {
    expect(divide(-6, -3)).toBe(2);
    expect(divide(6, -2)).toBe(-3);
  });
  it("divide function should expect failing cases", () => {
    expect(divide(6, 2)).not.toBe(4);
    expect(divide(-6, -3)).not.toBe(-1);
  });
});