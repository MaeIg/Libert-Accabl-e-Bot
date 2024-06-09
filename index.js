// Initialisation
require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const key = process.env.token;
const profil = require("./profil.js");

// Fonctions utiles
function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Variables globales
var hll = new Date(2022, 7, 9, 20, 8, 0);
let generalChan; // Objet contenant les réfs vers le canal #general
const idGeneral = "325144638447157249";

// Smileys
const scalim = "<:calim:669952959425019904>";
const smat100 = "<:mat100:458140489485385780>";
const ssadcat = "<:sadcat:543739550137188420>";
const sheart = "❤";
const soppression = "🙂";
const chanBeauf = "<#418751341519962113>";
const sscream = "😱";
const shumpf = "<:humpf:568317177741049856>";

// Commandes
const commandes = [
    "!help",
    "!forum",
    "!trombi",
    "!site",
    "!requete",
    "!d + nombre",
    "!everyone",
    "!echo",
    "!cui",
    "!cyanure",
    "!bleus",
    "!actualité",
    "!log",
    "!classement",
    "!commandes",
    "!rich",
    "!profil _nomDiscord",
    "!penis",
    "!film",
    "!license",
  ],
  cpseudo = [
    "!Bernard",
    "!Maelg",
    "!Cleme",
    "!Drac",
    "!Matsam",
    "!Uff",
    "!Hartyom",
    "!Lilith",
    "!WassaW",
    "!Zomzom",
    "!Pellaeon",
    "!Roystar",
    "!Alexis",
    "!Mad",
    "!Glen",
    "!Yaken",
    "!Symfo",
  ],
  cinvis = ["!membres", "!logs"];
// commandes => Pour les commandes basiques ; cpseudo => Pour les commandes liées au pseudo ; cinvis => Pour les commandes qui n'apparaissent pas dans le !help
const asw = {
  help: [
    "**Commandes disponibles :**\n```" +
      commandes.join("\n") +
      "```\n_!membres_ pour plus de commandes\n_!help commande_ pour plus d'information sur une commande",
  ],
  membres: [
    "**Commandes disponibles :**\n```" + cpseudo.join("\n") + "```\n_!help_ pour plus de commandes",
  ],
  forum: ["http://kirov-meta.forumactif.org/"],
  trombi: ["Pour accéder au trombi, demandez l'accès à Cleme et postez une photo !"],
  site: ["https://bernard-site.herokuapp.com/"],
  everyone: ["Normalement ce message n'est pas censé apparaître :calim:"],
  echo: ["Tu t'es cru dans une caverne ?!", "Syncope générale provoquée par tts imminente."],
  cui: ["Cui !", "Tu me prends pour un vulgaire moineau?"],
  bleus: [
    "On est les champions ! On est les champions ! On est... on est... on est les champions ! ♫",
    "Allez les bleus !",
    "1998-2018 !",
    "Et 1... Et 2... Et 3... et 4-2 !",
  ],
  actualité: [
    "Google est ton ami !",
    "La méta a 10 ans !",
    "Vive Maelgie !",
    "Charpi s'est marié !",
  ],
  log: [
    "***Last update : 06/06/2024***\n\nBernard se met à jour pour les 10 ans de la méta !\n\n_!logs_ pour plus de logs",
  ],
  logs: ["https://bernard.maelg.cloud"],
  penis: ["8=D"],
  film: [
    "You shit on my garden ?!",
    "Ils sont entrain de manger ma maman" + ssadcat,
    "Don't piss on the hospitality",
    "Vous êtes un koala tout à fait décent",
    "La rivière de nos larmes coule après le koala",
    "Beaux yeux belles couilles",
    "Ils sont bons qu'a sucer des bites et des carottes",
  ],
  license: ["https://github.com/MaeIg/Libert-Accabl-e-Bot/blob/master/LICENSE.md"],
  Bernard: ["C'est moi !"],
  Maelg: [
    "Miou !",
    "J'aime pas Despacito, je l'ai juste jouée 50 fois sur osu!",
    ":3",
    "Ma copine c'est encore pire elle peut les écarter à fond",
    "En vrai jsuis sûr que j'aimerais bien la soupe de bienvenue",
    "Pourquoi tout ce qui tourne autour de Supken est d'une débilité incommensurable ?",
    "Wesh c'est mon île pas un logement social",
    "Honnêtement la seule fois où j'ai fait une tourte aux blettes c'était super bon. On sentait pas le goût des blettes et que le goût des pommes et j'ai adoré.",
  ],
  Cleme: [
    "Et c'est sur ces mots que toute envie révolutionnaire s'éteint chez le peuple.",
    "Le mandat de la présidente Cleme était incontestable et sa puissance sans limite.",
    "Île-de-France? Tu veux dire Paris",
    "Y a que Paint de vrai",
    chanBeauf,
    "CLIQUE SUR LES CHARIOTS SALE CON",
    "Tant mieux qu'elle soit morte ils devraient tous mourir ces sales americains du Sud",
    "Vous avez qu'à faire des requêtes plutôt que raler que c'est pas à jour",
    "T'es vraiment bête c'est ouf n'empêche",
  ],
  Drac: ["Drac rend l'argent"],
  Matsam: [
    "Hartychou " + sheart,
    "Paint " + sheart,
    "Ragots " + sheart,
    "Smash Bros " + sheart,
    "Maelg le dieu de l'anti-picto",
    "Jpp de ma vie " + scalim,
    "Je vais en faire un meme" + smat100,
    "Pourquoi on est J2 ? On jump pas ce soir ?",
    soppression,
    'Perso j\'ai deux manières de plier, une manière "propre" et une manière "mi-propre". Comme ça, quand je prends le vêtement, en fonction de la manière dont il est plié, je sais comment il est',
    "LES GENS QUI CRIE TOUS DES CON",
    "ALERTE CANDICE A APPORTÉ...",
    "JE SUIS SUR MON ÎLE T'ES DANS TA BILE",
    "J'entends ça je tombe par terre sans vouloir être dramatique",
    "Vous avez déjà éternué en rigolant ?",
    "Avant j'étais un gros fayot et maintenant je suis juste une crotte inactive, j'aime beaucoup",
  ],
  Uff: ["Force et honneur !"],
  Hartyom: [
    "JE SUIS PRISONNIER DU CANAL AUDIO, O SECOUR !" + scalim + scalim + scalim,
    "VOUS CONNAISSEZ LE POINT COMMUN ENTRE UFF ET LE FROMAGE DE MACKAY ? ON EN ENTEND BEAUCOUP PARLER MAIS ON LES VOIT JAMAIS HAHAHAHAHAHAHAHHAAH",
    "Il ne peut en rester AUCUN. Je ne laisserai aucune de ces racailles faire la loi dans cette ville. NOT UNDER MY WATCH",
    "Ger une revandication.",
    "JE VOUS BEZ",
    "GREVEGENERALE",
    "Quitte à être zoophile tu pourrais te renseigner",
  ],
  WassaW: [
    "J AI LU PENDANT 72 HEURES NON STOP AVEC UN SOIR DANS LA NUIT BLANCHE",
    "Fais un pavé s'il te plait",
    "NEGATIF IL EST TOUJOURS SOUS PLASTIQUE ON Y TOUCHE PAS",
    "AHAHAHAHAH",
    "Je peux manger du fromage blanc en attendant que tu comprennes ?",
    "Il vaut mieux aller élever des escargots à Auxerre avec un doctorat plutôt que sans",
    "Je n'arrive pas à me concentrer de tomate",
    "Non je vote pas sur Allocine j'aime pas le jaune je deteste ce site",
    sheart + " Vous êtes mes petits gėnies du DiDi " + sheart,
    "Ils s'auto dépriment sans moi !",
    "Pour que deux Moi fassent un Nous il faut que les Moi soi soi",
    'Toujours quand je suis sérieux on me "dé-sérieux"',
    "On veut juste mon corps parce que je suis bonne, grâce à vous j'ai compris HAHAHAHAHAH",
    "j ai fait des photos mais c'est pas très joli",
  ],
  Zomzom: [
    'Je tiens à dire que "' +
      soppression +
      '" c\'est opressant mais que le "wesh" a la fin de ta phrase m\'a mis au fond',
    "C'est à force de lire les magouilles de Shaggyz, j'apprends",
    "Bah non a une soirée j'avais trop bu je l'ai embrassé, la boulette",
    "Bonjour la méta, je suis à un hâle et malgré l'heure bon taudive, j'ai bu bien :D Désolé de ma mort de noob lors du précédent CM :'( ça m' artiste !",
    "Vous me faites trop rire je vous aime aussi haha.",
    "Je viens pas bourré ici okay",
    "Le masque c'est comme l'apres shampooing : c'est sous la douche",
    "L'absence d'info est une info tant que c'est communiqué.",
    "Ce qui est plus chelou c'est ton aviq sur les viuex et le corona",
    "INHUSTICR",
    "Content de voir quand une tentative de rebellion échoue, ça me conforte. Je me dis que même si j'étais riche, j'en serais pas moins con",
    "Entre ne rien mettre, et écrire des conneries, vaut mieux s'abstenir ^^",
    "Le climat je me mobilise pas",
    "Vaut mieux claquer la viande que sa femme",
  ],
  Pellaeon: [
    '"caquelon", c\'est un poulet travesti qui caquette ?',
    'Sous word il y a deux "espaces", un avec "espace", un second généré automatique, comme quand tu met des "guillements" et qui se place tout seul',
    "Je tente de mettre en demeure sfr de revoir toutes les resiliations de l'année devant la repression des fraudes ? X)",
    "George Clone né ?",
    "Arf, je décrète officiellement la creation du pays des imaginaire alors clochette !",
    "Comme une expé : avec un fouet, de la volonté et des MSE !",
    "La logique et le bon sens n'ont pas de place dans cette maison.",
    "Plus de licornes et moins d'argent au quotidien ?",
    "Vous êtes Rabin en informations mademoiselle. Mais ça correspond au personne, j'apprécie la logique !",
    "C'est du pas toi local ?",
    "Même s'il est ironique ee moins de vue de ne préparer l'armée qu'a un changement annuel, de moins point de vue xD",
    "Ca dépend, si son signe astrologique est le cancer, c'est p'têt une version française Symfony",
    "Que nenniema mie",
  ],
  Roystar: [
    "Ptain j'ai mis mon caleçon à l'envers ce matin jme disais bien que c'était bizarre",
    "Ah mais la prochaine fois je ramène du champomy moi vous m'avez fait trop peur jme souviens pas de tout " +
      sscream,
    "t ban",
  ],
  Alexis: [
    "On a déjà vomi dans mon duvet et dans mes oreilles c'était vraiment pas super " + ssadcat,
    'Voulez vous écouter "on va niquer ce soir" ?',
    "TU CROIS QUE TU COMPRENDS PAS MAIS EN FAIT TU COMPRENDS PAS ENCORE MOINS",
    "Il faudrait un wiki-dramas",
    "moi ce que j'aime c'est faire mes réductions polynomiales entre problèmes np-complets tout seul dans mon coin",
    "Bon j'ai affuté un couteau, j'ai rasé ma jambe, mais mes poils sont pas photogéniques alors c'est surement toi qui a la plus grosse  :calim:",
  ],
  Mad: ["Personne ira visiter ton île.", shumpf],
  Glen: ["Oui ne met pas ça dans ton vagin ! C'est des boules de méditation ça !"],
  Yaken: [
    "Mon copain a promis à sa famille que je ferais un aligot demain (pour 7 personnes), la prochaine fois, rappelez moi que le célibat c'est pas si mal",
    "#putainlesbarsontrouvertgtrppbu",
  ],
  Symfo: [
    'J\'ai appris à mon fils a appris à dire "bouboule" quand il parle de ses bourses ... du coups il le dit tout le temps ...',
    'Semaine derniere (je crois) il a dû m\'entendre dire "on en a rien à foutre", du coup il disait "foutre foutre foutre foutre" à la nounou',
  ],
};
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
  cyanure:
    "**Utilisation**\n```!cyanure```\n**Description**\n```A utiliser quand les gens spamment trop sur un canal.\n~ Commande créée par un poussin qui n'aime pas quand il y a trop de bruit```",
  bleus:
    "**Utilisation**\n```!bleus```\n**Description**\n```Les plus grands suporters de l'équipe de France sont sur ce discord !```",
  actualité:
    "**Utilisation**\n```!actualité```\n**Description**\n```Aussi à jour qu'internet explorer !```",
  log: "**Utilisation**\n```!log```\n**Description**\n```Pour connaître les dernières nouveautés de Bernard.```",
  logs: "**Utilisation**\n```!logs```\n**Description**\n```Historique des mises à jour de Bernard.```",
  penis: "**Utilisation**\n```!penis```\n**Description**\n```Qui réussira à battre Cleme ?```",
  license:
    "**Utilisation**\n```!license```\n**Description**\n```Si vous voulez copier Bernard, citez l'original !```",
  d: '**Utilisation**\n```!d_nbPositif```\n**Description**\n```Donne un nombre aléatoire entre 1 et ce nombre.```\n**Exemple**\n```!d100 pourra donner "69".```',
  peage:
    "**Utilisation**\n```Indisponible```\n**Description**\n```Un jour cette commande existera !```",
  profil:
    "**Utilisation**\n```!profil _nomDiscord```\n**Description**\n```Affiche le profil de la personne donnée. Si aucune personne n'a été donnée, affiche votre profil.```",
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
var mat100 = 0;

bot.on("ready", () => {
  console.log("Je suis prêt !");
  generalChan = bot.channels.get(idGeneral);

  // CRON
  setInterval(() => {
    profil.checkAnniversaire(generalChan);
  }, 86400000);
});

bot.on("message", function (msg) {
  console.log("Message de " + msg.author.username);
  profil.newMessage(msg);

  var txt = msg.content;

  if (txt.slice(0, 5) === "!help") {
    if (txt.length > 6) {
      let L = helpInfo[txt.slice(6, txt.length)];
      if (L != undefined) {
        msg.channel.send(L);
      } else {
        msg.channel.send(
          "**Commandes disponibles :**\n```" +
            commandes.join("\n") +
            "```\n_!membres_ pour plus de commandes\n_!help Commande_ pour plus d'information sur une commande"
        );
      }
    } else {
      msg.channel.send(
        "**Commandes disponibles :**\n```" +
          commandes.join("\n") +
          "```\n_!membres_ pour plus de commandes\n_!help Commande_ pour plus d'information sur une commande"
      );
    }
    profil.newCommand(msg.author, "!help");
  } else if (txt.slice(0, 8) === "!requete") {
    let mots = txt.split(" ");

    if (mots.length < 3) {
      msg.channel.send("**Utilisation**\n```!requete Nom message```");
    } else {
      profil.newRequest(msg.author, mots[1], mots.slice(2).join(" "));
      msg.channel.send("Requête enregistrée !");
    }

    profil.newCommand(msg.author, "!requete");
  } else if (txt === "!everyone") {
    msg.reply("Et non tu seras le seul mentionné !");
    profil.newCommand(msg.author, txt);
  } else if (txt === "!cyanure") {
    msg.channel.send(
      "Ca spamme beaucoup trop sur ce canal, " +
        msg.author.username +
        " a donc décidé d'en finir avec cette communauté oppressante."
    );
    profil.newCommand(msg.author, txt);
  } else if (txt === "!classement") {
    profil.classement(msg.channel);
    profil.newCommand(msg.author, txt);
  } else if (txt === "!commandes") {
    profil.classementCommandes(msg.channel);
    profil.newCommand(msg.author, txt);
  } else if (txt === "!rich") {
    profil.classementRichesse(msg.channel);
    profil.newCommand(msg.author, txt);
  } else if (txt === "!penis") {
    if (msg.author.username === "Clémentine") {
      msg.channel.send("8===============D");
    } else {
      let nbr = randInt(10) + 1;
      let penis = "8";
      for (var i = 0; i < nbr; i++) {
        penis += "=";
      }
      penis += "D";
      msg.channel.send(penis);
    }
    profil.newCommand(msg.author, txt);
  } else if (txt === "!Cerfpihier") {
    var now = new Date();
    var time = hll - now - 7200000;

    time = Math.floor(time / 1000);
    var sec = time % 60;

    time = Math.floor((time - sec) / 60);
    var min = time % 60;

    time = Math.floor((time - min) / 60);
    var hour = time % 24;

    time = Math.floor((time - hour) / 24);
    var day = time % 30;

    time = Math.floor((time - day) / 30);
    var month = time % 12;
    day -= Math.floor(time / 2);
    while (day < 0) {
      month--;
      day += 30;
    }

    time = Math.floor((time - month) / 12);
    var year = time;
    while (month < 0) {
      month += 12;
      year--;
    }

    msg.channel.send(
      "Notre ami Cerfpihier se vengera contre Shaggyz dans " +
        year +
        " ans, " +
        month +
        " mois, " +
        day +
        " jours, " +
        hour +
        " heures, " +
        min +
        " minutes, et " +
        sec +
        " secondes !\nBonne chance à lui dans sa croisade !"
    );
  } else if (txt.slice(0, 7) === "!profil") {
    if (txt.length > 8) {
      profil.profil(msg.channel, txt.slice(8, txt.length));
    } else {
      profil.profil(msg.channel, msg.author.username);
    }
    profil.newCommand(msg.author, "!profil");
  } else if (txt === "!echo") {
    msg.channel.send("echo", {
      tts: true,
    });
    profil.newCommand(msg.author, txt);
  } else if (txt === smat100) {
    if (mat100 == 1) {
      mat100 = -1;
      msg.channel.send(smat100);
    } else {
      mat100++;
    }
    profil.newCommand(msg.author, txt);
  } else if (txt.slice(0, 2) === "!d" && !isNaN(txt.substr(2))) {
    if (txt.substr(2) == 0) {
      msg.channel.send("Ca existe ce machin?");
    } else {
      var des = randInt(txt.substr(2)) + 1;
      msg.channel.send("d" + txt.substr(2) + " : ***" + des + "***");
    }
    profil.newCommand(msg.author, "!d + nbr");
  } else if (
    txt.substr(1).toLowerCase() === msg.author.username.toLowerCase() ||
    (txt === "!Cleme" && msg.author.username === "cleme.") ||
    (txt === "!Roventa" && msg.author.username === "m4x") ||
    (txt === "!Shaggyz" && msg.author.username === "Siflomir") ||
    (txt === "!Nathan" && msg.author.username === "ッNnatto") ||
    (txt === "!Cornet" && msg.author.username === "Alexis") ||
    (txt === "!Glen" && msg.author.username === "llyx") ||
    (txt === "!Symfo" && msg.author.username === "symfony.")
  ) {
    msg.channel.send("Bah c'est toi idiot " + scalim);
    profil.newCommand(msg.author, txt);
  } else if (
    commandes.indexOf(txt) != -1 ||
    cpseudo.indexOf(txt) != -1 ||
    cinvis.indexOf(txt) != -1
  ) {
    var L = asw[txt.substr(1)];
    if (L === undefined) return;

    msg.channel.send(L[randInt(L.length)]);

    profil.newCommand(msg.author, txt);
  }
});

// Login
bot.login(key);
