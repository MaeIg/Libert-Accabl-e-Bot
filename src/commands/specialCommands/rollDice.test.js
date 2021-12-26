import MockDiscord from "../../mocks/MockDiscord.js";
import * as RandIntModule from "../../utils/randInt.js";
import { rollDice } from "./rollDice.js";

const discordMock = new MockDiscord();
const messageMock = discordMock.getMessage();
const channelMock = discordMock.getTextChannel();
jest.spyOn(channelMock, "send").mockImplementation(() => null);

const randIntSpy = jest.spyOn(RandIntModule, "randInt");
randIntSpy.mockReturnValue(9);

beforeEach(() => {
  jest.clearAllMocks();
});

it("should call channel.send with 'Ca existe ce machin ?' and not call randInt", () => {
  rollDice(messageMock, 0);

  expect(randIntSpy).not.toHaveBeenCalled();

  expect(channelMock.send).toBeCalledTimes(1);
  expect(channelMock.send).toBeCalledWith(`Ca existe ce machin ?`);
});

it("should call channel.send with d10: 10 and randInt with 10 when value is 10", () => {
  rollDice(messageMock, 10);

  expect(randIntSpy).toBeCalledTimes(1);
  expect(randIntSpy).toBeCalledWith(10);

  expect(channelMock.send).toBeCalledTimes(1);
  expect(channelMock.send).toBeCalledWith(`d10 : ***10***`);
});

it("should call randInt with -10 when value is -10", () => {
  rollDice(messageMock, -10);

  expect(randIntSpy).toBeCalledTimes(1);
  expect(randIntSpy).toBeCalledWith(-10);
});
