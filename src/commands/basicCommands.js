import { smileys } from "../constants/smileys.js";
import { pseudoCommandList } from "./commandList.js";

// All commands that only print text
// Usage : Print a random string that is inside the array
const basicCommands = {
  membres: [
    `**Commandes disponibles :**\n\`\`\`${pseudoCommandList.join(
      "\n"
    )}\`\`\`\n_!help_ pour plus de commandes`,
  ],
  forum: ["http://kirov-meta.forumactif.org/"],
  trombi: [
    "Pour accéder au trombi, demandez l'accès à Cleme ou Khran et postez une photo !",
  ],
  site: ["https://bernard-site.herokuapp.com/"],
  everyone: ["Normalement ce message n'est pas censé apparaître :calim:"],
  echo: [
    "Tu t'es cru dans une caverne ?!",
    "Syncope générale provoquée par tts imminente.",
  ],
  cui: ["Cui !", "Tu me prends pour un vulgaire moineau?"],
  nuclear: ["Alex The Autist vous détruira tous !"],
  cyanure: [`J'attends toujours que Matsam me crée ${smileys.sob}`],
  bleus: [
    "On est les champions ! On est les champions ! On est... on est... on est les champions ! ♫",
    "Allez les bleus !",
    "1998-2018 !",
    "Et 1... Et 2... Et 3... et 4-2 !",
  ],
  actualité: [
    "Google est ton ami !",
    "Hartyom n'a toujours pas fini de se plaindre",
    "On est en guerre.",
  ],
  log: [
    "***Last update : 28/11/2020 19h00***\n\nBernard souhaite maintenant l'anniversaire des actifs du discord !\nAjout des commandes !film, !Mzboub, !Mad, !Freez.\nMise à jour des commandes !Alexis, !Maelg, !WassaW, !Zomzom, !Roystar, !Uff, !Pellaeon, !Cleme, !Hartyom et !actualité.\n\n_!logs_ pour plus de logs",
  ],
  logs: ["https://bernard-site.herokuapp.com/logs"],
  penis: ["8=D"],
  oreoplz: [smileys.oreo],
  parapluie: [
    `||${smileys.koukou}||||${smileys.mhh}||||${smileys.drop}||||${smileys.umbrella}||`,
  ],
  film: [
    "You shit on my garden ?!",
    `Ils sont entrain de manger ma maman${smileys.sadcat}`,
    "Don't piss on the hospitality",
    "Vous êtes un koala tout à fait décent",
    "La rivière de nos larmes coule après le koala",
    "Beaux yeux belles couilles",
  ],
  license: [
    "https://github.com/MaeIg/Libert-Accabl-e-Bot/blob/master/LICENSE.md",
  ],
};

export { basicCommands };
