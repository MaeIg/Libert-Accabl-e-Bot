import { newCommand } from "../../profil.js";

import { randInt } from "../utils/randInt.js";

import { smileys } from "../constants/smileys.js";

import { basicCommands } from "./basicCommands.js";
import { pseudoCommands } from "./pseudoCommands.js";
import {
  commandList,
  invisibleCommandList,
  pseudoCommandList,
} from "./commandList.js";

const launchBasicOrPseudoCommand = (message, command) => {
  if (
    command.substring(1) === message.author.username ||
    (command === "!Cleme" && message.author.username === "Clémentine") ||
    (command === "!Roventa" && message.author.username === "m4x") ||
    (command === "!Shaggyz" && message.author.username === "Siflomir") ||
    (command === "!Nathan" && message.author.username === "ッNnatto") ||
    (command === "!Cornet" && message.author.username === "Alexis")
  ) {
    message.channel.send(`Bah c'est toi idiot ${smileys.calim}`);
    newCommand(message.author, command);
  } else if (
    commandList.indexOf(command) !== -1 ||
    invisibleCommandList.indexOf(command) !== -1
  ) {
    const L = basicCommands[command.substring(1)];
    message.channel.send(L[randInt(L.length)]);

    newCommand(message.author, command);
  } else if (pseudoCommandList.indexOf(command) !== -1) {
    const L = pseudoCommands[command.substring(1)];
    message.channel.send(L[randInt(L.length)]);

    newCommand(message.author, command);
  }
};

export { launchBasicOrPseudoCommand };
