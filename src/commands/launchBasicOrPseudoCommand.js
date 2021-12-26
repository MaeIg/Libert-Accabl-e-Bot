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

const pseudoMapping = {
  Clémentine: "Cleme",
  m4x: "Roventa",
  Siflomir: "Shaggyz",
  ッNnatto: "Nathan",
  Alexis: "Cornet",
};

const launchBasicOrPseudoCommand = (message, command) => {
  const commandeText = command.substring(1);

  if (
    commandeText === message.author.username ||
    commandeText === pseudoMapping[message.author.username]
  ) {
    message.channel.send(`Bah c'est toi idiot ${smileys.calim}`);
    newCommand(message.author, command);
  } else if (
    commandList.indexOf(command) !== -1 ||
    invisibleCommandList.indexOf(command) !== -1
  ) {
    const resultList = basicCommands[commandeText];
    message.channel.send(resultList[randInt(resultList.length)]);

    newCommand(message.author, command);
  } else if (pseudoCommandList.indexOf(command) !== -1) {
    const resultList = pseudoCommands[commandeText];
    message.channel.send(resultList[randInt(resultList.length)]);

    newCommand(message.author, command);
  }
};

export { launchBasicOrPseudoCommand };
