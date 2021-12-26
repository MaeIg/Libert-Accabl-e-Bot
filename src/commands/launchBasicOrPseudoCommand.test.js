import { expect, it, jest } from "@jest/globals";
import MockDiscord from "../mocks/MockDiscord.js";
import * as ProfileModule from "../../profil.js";

import { smileys } from "../constants/smileys.js";
import { basicCommands } from "./basicCommands.js";
import { pseudoCommands } from "./pseudoCommands.js";

import { launchBasicOrPseudoCommand } from "./launchBasicOrPseudoCommand.js";

const discordMock = new MockDiscord();
const messageMock = discordMock.getMessage();
const channelMock = discordMock.getTextChannel();
jest.spyOn(channelMock, "send").mockImplementation(() => null);

const newCommandSpy = jest
  .spyOn(ProfileModule, "newCommand")
  .mockImplementation(jest.fn());

jest.mock("../utils/randInt.js", () => ({
  randInt: () => 0,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Should send 'Bah c'est toi idiot :calim:' and call newCommand(command)", () => {
  it.each`
    command       | pseudo
    ${"!Cleme"}   | ${"Clémentine"}
    ${"!Roventa"} | ${"m4x"}
    ${"!Shaggyz"} | ${"Siflomir"}
    ${"!Nathan"}  | ${"ッNnatto"}
    ${"!Cornet"}  | ${"Alexis"}
    ${"!Bernard"} | ${"Bernard"}
  `("when $pseudo calls $command", ({ command, pseudo }) => {
    const messageMockWithAuthor = {
      ...messageMock,
      author: { ...messageMock.author, username: pseudo },
    };

    launchBasicOrPseudoCommand(messageMockWithAuthor, command);

    expect(channelMock.send).toBeCalledTimes(1);
    expect(channelMock.send).toBeCalledWith(
      `Bah c'est toi idiot ${smileys.calim}`
    );

    expect(newCommandSpy).toBeCalledTimes(1);
    expect(newCommandSpy).toBeCalledWith(messageMockWithAuthor.author, command);
  });
});

describe("Should send a sentence written in basicCommand and call newCommand(command)", () => {
  it.each(Object.keys(basicCommands))("when someone calls !%s", (command) => {
    launchBasicOrPseudoCommand(messageMock, `!${command}`);

    expect(channelMock.send).toBeCalledTimes(1);
    expect(channelMock.send).toBeCalledWith(basicCommands[command][0]);

    expect(newCommandSpy).toBeCalledTimes(1);
    expect(newCommandSpy).toBeCalledWith(messageMock.author, `!${command}`);
  });
});

describe("Should send a sentence written in pseudoCommand and call newCommand(command)", () => {
  it.each(Object.keys(pseudoCommands))("when someone calls !%s", (command) => {
    launchBasicOrPseudoCommand(messageMock, `!${command}`);

    expect(channelMock.send).toBeCalledTimes(1);
    expect(channelMock.send).toBeCalledWith(pseudoCommands[command][0]);

    expect(newCommandSpy).toBeCalledTimes(1);
    expect(newCommandSpy).toBeCalledWith(messageMock.author, `!${command}`);
  });
});

it("Should do nothing if the command doesn't exist", () => {
  launchBasicOrPseudoCommand(messageMock, "!barbapapa");

  expect(channelMock.send).not.toHaveBeenCalled();
  expect(newCommandSpy).not.toHaveBeenCalled();
});
