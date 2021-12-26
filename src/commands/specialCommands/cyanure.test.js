import MockDiscord from "../../mocks/MockDiscord.js";
import { cyanure } from "./cyanure.js";

const discordMock = new MockDiscord();
const messageMock = discordMock.getMessage();
const channelMock = discordMock.getTextChannel();
jest.spyOn(channelMock, "send").mockImplementation(() => null);

it("should call channel.send with the name of the user when cyanure is called", () => {
  cyanure(messageMock);

  expect(channelMock.send).toBeCalledTimes(1);
  expect(channelMock.send).toBeCalledWith(
    `Ca spamme beaucoup trop sur ce canal, ${messageMock.author.username} a donc décidé d'en finir avec cette communauté oppressante.`
  );
});
