import { bot } from "./src/initConfig.js";

import { smileys } from "./src/constants/smileys.js";
import { chanIds } from "./src/constants/chanIds.js";
import { randInt } from "./src/utils/randInt.js";

import {
  commandList,
  pseudoCommandList,
  invisibleCommandList,
} from "./src/commands/commandList.js";
import { basicCommands } from "./src/commands/basicCommands.js";
import { pseudoCommands } from "./src/commands/pseudoCommands.js";
import { helpInfo } from "./src/commands/helpInfo.js";
import { everyone } from "./src/commands/specialCommands/everyone.js";

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
const hll = new Date("2022", "07", "09", "20", "08", "00");
let generalChan; // Objet contenant les réfs vers le canal #general

let mat100 = 0;

bot.on("ready", () => {
  generalChan = bot.channels.get(chanIds.general);

  // CRON
  setInterval(() => {
    checkAnniversaire(generalChan);
  }, 86400000);
});

bot.on("message", (msg) => {
  newMessage(msg);

  const txt = msg.content;

  if (txt.slice(0, 5) === "!help") {
    if (txt.length > 6) {
      const L = helpInfo[txt.slice(6, txt.length)];
      if (L !== undefined) {
        msg.channel.send(L);
      } else {
        msg.channel.send(
          `**Commandes disponibles :**\n\`\`\`${commandList.join(
            "\n"
          )}\`\`\`\n_!membres_ pour plus de commandes\n_!help Commande_ pour plus d'information sur une commande`
        );
      }
    } else {
      msg.channel.send(
        `**Commandes disponibles :**\n\`\`\`${commandList.join(
          "\n"
        )}\`\`\`\n_!membres_ pour plus de commandes\n_!help Commande_ pour plus d'information sur une commande`
      );
    }
    newCommand(msg.author, "!help");
  } else if (txt.slice(0, 8) === "!requete") {
    const mots = txt.split(" ");

    if (mots.length < 3) {
      msg.channel.send("**Utilisation**\n```!requete Nom message```");
    } else {
      newRequest(msg.author, mots[1], mots.slice(2).join(" "));
      msg.channel.send("Requête enregistrée !");
    }

    newCommand(msg.author, "!requete");
  } else if (txt === "!everyone") {
    everyone(msg);
    newCommand(msg.author, txt);
  } else if (txt === "!cyanure") {
    msg.channel.send(
      `Ca spamme beaucoup trop sur ce canal, ${msg.author.username} a donc décidé d'en finir avec cette communauté oppressante.`
    );
    newCommand(msg.author, txt);
  } else if (txt === "!classement") {
    classement(msg.channel);
    newCommand(msg.author, txt);
  } else if (txt === "!commandes") {
    classementCommandes(msg.channel);
    newCommand(msg.author, txt);
  } else if (txt === "!rich") {
    classementRichesse(msg.channel);
    newCommand(msg.author, txt);
  } else if (txt === "!penis") {
    if (msg.author.username === "Clémentine") {
      msg.channel.send("8===============D");
    } else {
      const nbr = randInt(10) + 1;
      let penis = "8";
      for (let i = 0; i < nbr; i++) {
        penis += "=";
      }
      penis += "D";
      msg.channel.send(penis);
    }
    newCommand(msg.author, txt);
  } else if (txt === "!Cerfpihier") {
    const now = new Date();
    let time = hll - now - 7200000;

    time = Math.floor(time / 1000);
    const sec = time % 60;

    time = Math.floor((time - sec) / 60);
    const min = time % 60;

    time = Math.floor((time - min) / 60);
    const hour = time % 24;

    time = Math.floor((time - hour) / 24);
    let day = time % 30;

    time = Math.floor((time - day) / 30);
    let month = time % 12;
    day -= Math.floor(time / 2);
    while (day < 0) {
      month--;
      day += 30;
    }

    time = Math.floor((time - month) / 12);
    let year = time;
    while (month < 0) {
      month += 12;
      year--;
    }

    msg.channel.send(
      `Notre ami Cerfpihier se vengera contre Shaggyz dans ${year} ans, ${month} mois, ${day} jours, ${hour} heures, ${min} minutes, et ${smileys.ec} secondes !\nBonne chance à lui dans sa croisade !`
    );
  } else if (txt.slice(0, 7) === "!profil") {
    if (txt.length > 8) {
      profil(msg.channel, txt.slice(8, txt.length));
    } else {
      profil(msg.channel, msg.author.username);
    }
    newCommand(msg.author, "!profil");
  } else if (txt === "!echo") {
    msg.channel.send("echo", {
      tts: true,
    });
    newCommand(msg.author, txt);
  } else if (txt === smileys.mat100) {
    if (mat100 === 1) {
      mat100 = -1;
      msg.channel.send(smileys.mat100);
    } else {
      mat100++;
    }
    newCommand(msg.author, txt);
  } else if (txt.slice(0, 2) === "!d" && !Number.isNaN(txt.substr(2))) {
    if (txt.substr(2) === 0) {
      msg.channel.send("Ca existe ce machin?");
    } else {
      const des = randInt(txt.substr(2)) + 1;
      msg.channel.send(`d${txt.substr(2)} : ***${des}***`);
    }
    newCommand(msg.author, "!d + nbr");
  } else if (
    txt.substr(1) === msg.author.username ||
    (txt === "!Cleme" && msg.author.username === "Clémentine") ||
    (txt === "!Roventa" && msg.author.username === "m4x") ||
    (txt === "!Shaggyz" && msg.author.username === "Siflomir") ||
    (txt === "!Nathan" && msg.author.username === "ッNnatto") ||
    (txt === "!Cornet" && msg.author.username === "Alexis")
  ) {
    msg.channel.send(`Bah c'est toi idiot ${smileys.calim}`);
    newCommand(msg.author, txt);
  } else if (
    commandList.indexOf(txt) !== -1 ||
    invisibleCommandList.indexOf(txt) !== -1
  ) {
    const L = basicCommands[txt.substr(1)];
    msg.channel.send(L[randInt(L.length)]);

    newCommand(msg.author, txt);
  } else if (pseudoCommandList.indexOf(txt) !== -1) {
    const L = pseudoCommands[txt.substr(1)];
    msg.channel.send(L[randInt(L.length)]);

    newCommand(msg.author, txt);
  }
});
