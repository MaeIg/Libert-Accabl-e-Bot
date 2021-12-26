import MockDiscord from "../../mocks/MockDiscord.js";
import { commandList, invisibleCommandList } from "../commandList.js";
import { helpInfo } from "../helpInfo.js";
import { help } from "./help.js";

const discordMock = new MockDiscord();
const messageMock = discordMock.getMessage();
const channelMock = discordMock.getTextChannel();
jest.spyOn(channelMock, "send").mockImplementation(() => null);

const expectedMessage = `**Commandes disponibles :**\n\`\`\`${commandList.join(
  "\n"
)}\`\`\`\n_!membres_ pour plus de commandes\n_!help Commande_ pour plus d'information sur une commande`;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Should return the list of commands", () => {
  it("when someone calls !help", () => {
    help(messageMock, "!help");

    expect(channelMock.send).toHaveBeenCalledTimes(1);
    expect(channelMock.send).toHaveBeenCalledWith(expectedMessage);
  });

  it("when someone calls !help with an unknown command", () => {
    help(messageMock, "!help bidule");

    expect(channelMock.send).toHaveBeenCalledTimes(1);
    expect(channelMock.send).toHaveBeenCalledWith(expectedMessage);
  });
});

describe("Should return the description of a command", () => {
  it.each(
    [...commandList, ...invisibleCommandList].map(
      // substring(1) to remove the '!'
      // split(" ")[0] to remove extra infos (ex: !profil _nomDiscord)
      (command) => command.substring(1).split(" ")[0]
    )
  )("when someone calls !help %s", (command) => {
    help(messageMock, `!help ${command}`);

    expect(channelMock.send).toHaveBeenCalledTimes(1);
    expect(channelMock.send).toHaveBeenCalledWith(helpInfo[command]);
  });
});
