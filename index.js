import { bot } from "./src/initConfig.js";

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

import { randInt } from "./src/utils/randInt.js";
import { smileys } from "./src/constantes/smileys.js";
import { chanIds } from "./src/constantes/chanIds.js";
import { commandes, cpseudo, cinvis } from "./src/commandes/commandList.js";
import { basicCommands } from "./src/commandes/basicCommands.js";
import { pseudoCommands } from "./src/commandes/pseudoCommands.js";

// Variables globales
const hll = new Date("2022", "07", "09", "20", "08", "00");
let generalChan; // Objet contenant les réfs vers le canal #general

const helpInfo = {
  help: "**Utilisation**\n```!help _Commande```\n**Description**\n```La commande help donne des informations sur l'utilisation de la commande spécifiée. Si aucune commande n'est spécifiée, elle donne la liste des commandes disponibles.```",
  membres:
    '**Utilisation**\n```!membres```\n**Description**\n```La commande membres donne la liste des commandes disponibles sur certains membres ou ex membres. Ces commandes permettront de connaître des phrases drôles ou typiques prononcées par ces membres.```\n**Exemple**\n```!WassaW pourra donner "AHAHAHAHAH".```',
  forum:
    "**Utilisation**\n```!forum```\n**Description**\n```J'espère pour toi que tu sais à quoi sert le forum !```",
  trombi:
    "**Utilisation**\n```!trombi```\n**Description**\n```Le trombi te permet de voir la tête des autres si tu es prêt à montrer la tienne !```",
  everyone:
    "**Utilisation**\n```!everyone```\n**Description**\n```N'utilisez pas cette commande !!!```",
  echo: "**Utilisation**\n```!echo```\n**Description**\n```Une commande tellement puissante que Cleme a dû en limiter l'effet...```",
  cui: "**Utilisation**\n```!cui```\n**Description**\n```Un pile ou face créé par MacKay. Il y a donc deux réponses possibles : cui ou...```",
  nuclear:
    "**Utilisation**\n```!nuclear```\n**Description**\n```Le saviez-vous ? Bernard s'est fait hacké et s'est fait contrôler par une méchante personne dans ses débuts. Maintenant sa protection a été revue à la hausse mais cette commande est là pour rappeler cet évennement plutôt spécial...```",
  cyanure:
    "**Utilisation**\n```!cyanure```\n**Description**\n```A utiliser quand les gens spamment trop sur un canal.\n~ Commande créée par un poussin qui n'aime pas quand il y a trop de bruit```",
  bleus:
    "**Utilisation**\n```!bleus```\n**Description**\n```Les plus grands suporters de l'équipe de France sont sur ce discord !```",
  actualité:
    "**Utilisation**\n```!actualité```\n**Description**\n```Aussi à jour qu'internet explorer !```",
  log: "**Utilisation**\n```!log```\n**Description**\n```Pour connaître les dernières nouveautés de Bernard.```",
  logs: "**Utilisation**\n```!logs```\n**Description**\n```Historique des mises à jour de Bernard.```",
  penis:
    "**Utilisation**\n```!penis```\n**Description**\n```Qui réussira à battre Cleme ?```",
  oreoplz:
    "**Utilisation**\n```!oreoplz```\n**Description**\n```Je préfère ne pas en parler...```",
  parapluie:
    "**Utilisation**\n```!parapluie```\n**Description**\n```Demandez à Harty !```",
  license:
    "**Utilisation**\n```!license```\n**Description**\n```Si vous voulez copier Bernard, citez l'original !```",
  d: '**Utilisation**\n```!d_nbPositif```\n**Description**\n```Donne un nombre aléatoire entre 1 et ce nombre.```\n**Exemple**\n```!d100 pourra donner "69".```',
  peage:
    "**Utilisation**\n```Indisponible```\n**Description**\n```Un jour cette commande existera !```",
  profil:
    "**Utilisation**\n```!profil _nomDiscord```\n**Description**\n```Affiche le profil de la personne donnée. Si aucune personne n'a été donnée, affiche votre ```",
  rich: "**Utilisation**\n```!rich```\n**Description**\n```Donne la liste des personnes ayant le plus de Libcoins sur le discord. Mais à quoi peut bien servir cette monnaie ?```",
  commandes:
    "**Utilisation**\n```!commandes```\n**Description**\n```Donne la liste des commandes les plus utilisées sur ce discord.```",
  classement:
    "**Utilisation**\n```!classement```\n**Description**\n```Donne la liste des personnes ayant le plus parlé sur ce discord. Qui arrivera à détrôner Cleme ?```",
  requete:
    "**Utilisation**\n```!requete Nom Phrase```\n**Description**\n```Si vous voulez qu'une phrase dite par un joueur lui soit associée sur Bernard, vous pouvez utiliser cette commande. Si la communauté approuve, ces phrases seront ajoutées à Bernard. Comme ça les personnes qui ne sont pas dans les phrases de Bernard n'auront plus de raison de se plaindre !!```\n**Exemple**\n```!requete Khayrisill Tu me manques wawa```",
  site: "**Utilisation**\n```!site```\n**Description**\n```Envoie un lien vers l'antre de Bernard. Qui sait ce que vous pourriez y trouver ?```",
  film: "**Utilisation**\n```!film```\n**Description**\n```Envoie une citation aléatoire de l'un des films vu dans #cinema```",
};
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
          `**Commandes disponibles :**\n\`\`\`${commandes.join(
            "\n"
          )}\`\`\`\n_!membres_ pour plus de commandes\n_!help Commande_ pour plus d'information sur une commande`
        );
      }
    } else {
      msg.channel.send(
        `**Commandes disponibles :**\n\`\`\`${commandes.join(
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
    msg.reply("Et non tu seras le seul mentionné !");
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
  } else if (commandes.indexOf(txt) !== -1 || cinvis.indexOf(txt) !== -1) {
    const L = basicCommands[txt.substr(1)];
    msg.channel.send(L[randInt(L.length)]);

    newCommand(msg.author, txt);
  } else if (cpseudo.indexOf(txt) !== -1) {
    const L = pseudoCommands[txt.substr(1)];
    msg.channel.send(L[randInt(L.length)]);

    newCommand(msg.author, txt);
  }
});
