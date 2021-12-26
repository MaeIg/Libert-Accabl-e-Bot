import { expect } from "@jest/globals";
import { randInt } from "./randInt";

it("returns 0", () => {
  expect(randInt(0)).toBe(0);
});

it("returns 0", () => {
  expect(randInt(1)).toBe(0);
});

it("returns a number between 0 and 1", () => {
  const randomNumber = randInt(2);

  expect(randomNumber).toBeGreaterThanOrEqual(0);
  expect(randomNumber).toBeLessThanOrEqual(1);
});
