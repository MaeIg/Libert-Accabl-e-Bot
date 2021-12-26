import { jest } from "@jest/globals";
import { smileys } from "../../constants/smileys.js";
import MockDiscord from "../../mocks/MockDiscord.js";
import { mat100 } from "./mat100.js";

const discordMock = new MockDiscord();
const messageMock = discordMock.getMessage();
const channelMock = discordMock.getTextChannel();
jest.spyOn(channelMock, "send").mockImplementation(() => null);

it("should not call channel.send the first time then call it the second time then don't call it the third time", () => {
  mat100(messageMock);
  expect(channelMock.send).not.toHaveBeenCalled();
  jest.clearAllMocks();

  mat100(messageMock);
  expect(channelMock.send).toBeCalledTimes(1);
  expect(channelMock.send).toBeCalledWith(smileys.mat100);
  jest.clearAllMocks();

  mat100(messageMock);
  expect(channelMock.send).not.toHaveBeenCalled();
  jest.clearAllMocks();
});
