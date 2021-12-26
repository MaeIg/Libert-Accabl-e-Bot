import { bot } from "./src/initConfig.js";

import { smileys } from "./src/constants/smileys.js";
import { chanIds } from "./src/constants/chanIds.js";

import { everyone } from "./src/commands/specialCommands/everyone.js";
import { cyanure } from "./src/commands/specialCommands/cyanure.js";
import { penis } from "./src/commands/specialCommands/penis.js";
import { rollDice } from "./src/commands/specialCommands/rollDice.js";
import { echo } from "./src/commands/specialCommands/echo.js";
import { mat100 } from "./src/commands/specialCommands/mat100.js";
import { launchBasicOrPseudoCommand } from "./src/commands/launchBasicOrPseudoCommand.js";
import { help } from "./src/commands/specialCommands/help.js";
import { cerfpihier } from "./src/commands/specialCommands/cerfpihier.js";

import {
  newMessage,
  newCommand,
  classement,
  classementCommandes,
  classementRichesse,
  profil,
  newRequest,
  checkAnniversaire,
} from "./profil.js";

// Variables globales
let generalChan; // Objet contenant les réfs vers le canal #general

bot.on("ready", () => {
  generalChan = bot.channels.get(chanIds.general);

  // CRON
  setInterval(() => {
    checkAnniversaire(generalChan);
  }, 86400000);
});

bot.on("message", (message) => {
  newMessage(message);

  const messageText = message.content;

  if (messageText.slice(0, 5) === "!help") {
    help(message, messageText);
    newCommand(message.author, "!help");
  } else if (messageText.slice(0, 8) === "!requete") {
    const mots = messageText.split(" ");

    if (mots.length < 3) {
      message.channel.send("**Utilisation**\n```!requete Nom message```");
    } else {
      newRequest(message.author, mots[1], mots.slice(2).join(" "));
      message.channel.send("Requête enregistrée !");
    }

    newCommand(message.author, "!requete");
  } else if (messageText === "!everyone") {
    everyone(message);
    newCommand(message.author, messageText);
  } else if (messageText === "!cyanure") {
    cyanure(message);
    newCommand(message.author, messageText);
  } else if (messageText === "!classement") {
    classement(message.channel);
    newCommand(message.author, messageText);
  } else if (messageText === "!commandes") {
    classementCommandes(message.channel);
    newCommand(message.author, messageText);
  } else if (messageText === "!rich") {
    classementRichesse(message.channel);
    newCommand(message.author, messageText);
  } else if (messageText === "!penis") {
    penis(message);
    newCommand(message.author, messageText);
  } else if (messageText === "!Cerfpihier") {
    cerfpihier(message);
    newCommand(message.author, messageText);
  } else if (messageText.slice(0, 7) === "!profil") {
    if (messageText.length > 8) {
      profil(message.channel, messageText.slice(8));
    } else {
      profil(message.channel, message.author.username);
    }
    newCommand(message.author, "!profil");
  } else if (messageText === "!echo") {
    echo(message);
    newCommand(message.author, messageText);
  } else if (messageText === smileys.mat100) {
    mat100(message);
    newCommand(message.author, messageText);
  } else if (messageText.slice(0, 2) === "!d") {
    const diceValue = Number(messageText.substring(2));
    if (!Number.isNaN(diceValue)) {
      rollDice(message, diceValue);
      newCommand(message.author, "!d + nbr");
    }
  } else {
    launchBasicOrPseudoCommand(message, messageText);
  }
});
