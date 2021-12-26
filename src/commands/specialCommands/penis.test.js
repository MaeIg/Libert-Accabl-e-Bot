import MockDiscord from "../../mocks/MockDiscord.js";
import { penis } from "./penis.js";

const discordMock = new MockDiscord();
const messageMock = discordMock.getMessage();
const channelMock = discordMock.getTextChannel();
jest.spyOn(channelMock, "send").mockImplementation(() => null);

jest.mock("../../utils/randInt.js", () => ({
  randInt: () => 3,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

it("should call channel.send with a penis of size 3 + 1 when penis function is called", () => {
  penis(messageMock);

  expect(channelMock.send).toBeCalledTimes(1);
  expect(channelMock.send).toBeCalledWith(`8====D`);
});

it("should call channel.send with a penis of size 15 when penis function is called by Clémentine", () => {
  penis({
    ...messageMock,
    author: { ...messageMock.author, username: "Clémentine" },
  });

  expect(channelMock.send).toBeCalledTimes(1);
  expect(channelMock.send).toBeCalledWith(`8===============D`);
});
