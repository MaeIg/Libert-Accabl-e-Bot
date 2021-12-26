import MockDiscord from "../../mocks/MockDiscord.js";
import { echo } from "./echo.js";

const discordMock = new MockDiscord();
const messageMock = discordMock.getMessage();
const channelMock = discordMock.getTextChannel();
jest.spyOn(channelMock, "send").mockImplementation(() => null);

beforeEach(() => {
  jest.clearAllMocks();
});

it("should call channel.send with 'echo' and tts: true", () => {
  echo(messageMock);

  expect(channelMock.send).toBeCalledTimes(1);
  expect(channelMock.send).toBeCalledWith("echo", {
    tts: true,
  });
});
