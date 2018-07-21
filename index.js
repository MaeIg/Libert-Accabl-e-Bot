// Initialisation
const Discord = require('discord.js');
const bot = new Discord.Client();
const key = process.env.token;
const profil = require('./profil.js');
const pg = require('pg');

// Fonctions utiles
function randInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

// Smileys
const scalim = '<:calim:371258660489396225>';
const smat100 = '<:mat100:458140489485385780>';
const sheart = '❤';

// Commandes
var commandes = ['!help', '!forum', '!trombi', '!d + nombre', '!everyone', '!echo', '!cui', '!nuclear', '!bleus', '!actualité', '!log'],
    cpseudo = ['!Bernard', '!Golgoth', '!Maelg', '!MacKay', '!Roventa', '!Sibaal', '!Cleme', '!Khran', '!Drac', '!Dragon', '!Matsam', '!Shaggyz', '!Uff', '!Hartyom'],
    cinvis = ['!membres', '!logs'];
// commandes => Pour les commandes basiques ; cpseudo => Pour les commandes liées au pseudo ; cinvis => Pour les commandes qui n'apparaissent pas dans le !help
var asw = {
	help: ['**Commandes disponibles :**\n```' + commandes.join('\n') + '```\n_!membres_ pour plus de commandes'],
	membres: ['**Commandes disponibles :**\n```' + cpseudo.join('\n') + '```\n_!help_ pour plus de commandes'],
	forum: ['http://kirov-meta.forumactif.org/'],
	trombi: ['Pour accéder au trombi, demandez l\'accès à Cleme ou Khran et postez une photo !'],
	everyone: ['Normalement ce message n\'est pas censé apparaître :calim:'],
	echo: ['Tu t\'es cru dans une caverne ?!', "Syncope générale provoquée par tts imminente."],
	cui: ['Cui !', 'Tu me prends pour un vulgaire moineau?'],
	nuclear: ['Alex The Autist vous détruira tous !'],
	bleus: ['On est les champions ! On est les champions ! On est... on est... on est les champions ! ♫', 'Allez les bleus !', '1998-2018 !', 'Et 1... Et 2... Et 3... et 4-2 !'],
	actualité: ['Google est ton ami !', 'Golgoth est toujours privé d\'ordinateur', 'Hartyom n\'a toujours pas fini de se plaindre', 'Roventa pense encore à Sibaal'],
	log: ['***Last update : 21/07/2018 14h50***\n\nAjout de la table commands dans la bdd pour pouvoir faire des stats sur les commandes\n\n_!logs_ pour plus de logs'],
	logs: ['**Màj du bot**\n\n*06/07/2018*\nCréation du bot\n\n*Jusqu\'au 13/07/2018*\nAjout de commandes diverses\n\n*13/07/2018*\nCréation d\'une base de données et de la table members pour créer des profils aux différents utilisateurs\n\n*21/07/2018*\nAjout de la table commands dans la bdd pour pouvoir faire des stats sur les commandes'],
	Bernard: ['C\'est moi !'],
	Golgoth: ['Tu parle à ki ?', 'tu me parle à moi?', "j'suis un gangster"],
	Maelg: ['Miou !', "J'aime pas Despacito, je l'ai juste jouée 50 fois sur osu!", ":3", "Tu veux voir mon babobab ?"],
	MacKay: ["L'humanité est pourrie l'amour est une illusion", "Je vous suis infiniment supérieur ", "Loué soit le grand MacKay", "Ma vie pour MacKay", "Et si on abandonnait Matsang pour la quinzième fois ?", "Les éclaireurs : poules mouillées ou tafioles?"],
	Roventa: ["Je t'aime... mais lâche-moi bordel !", "Cool une vodka, je ne serais pas obligé de boire mon eau pour finir l'expé !", "Les russes ont triché l'Égypte devait gagner", "t'habite ou ?", "T'as du style, épouse-moi !", "Cool un RP ! Jump antipictoquoi ?","Ça m énerve pcq je ne suis pas à la hauteur de tout ce que tu nous apporte", "Une fille qui joue a hordes, ca ne peut pas etre qq'un de manipulateur et d' égocentrique"],
	Sibaal: ['Et en plus tu m\'traîte de Golgoth.'],
	Cleme: ['Et c\'est sur ces mots que toute envie révolutionnaire s\'éteint chez le peuple.','Le mandat de la présidente Cleme était incontestable et sa puissance sans limite.', "Île-de-France? Tu veux dire Paris", "Y a que Paint de vrai", "#ils-sont-tous-beaufs"],
	Khran: ['Un vrai ETListe abandonne son stuff dans le désert !', "Meurt dans le désert"],
	Drac: ['+37 !', "J'ai disparu en 1937 !"],
	Dragon: ['Coup critique !', 'Bon je vais me coucher, bonne journée !', 'Oh, j\'ai encore fait un 20 aux dés !'],
	Matsam: ['Hartychou '+sheart, 'Paint '+sheart, 'Ragots '+sheart, 'Maelg le dieu de l\'anti-picto', 'Jpp de ma vie '+scalim, "Je vais en faire un meme"+smat100],
	Shaggyz: ["Quel fléau la canicule parisienne, heureusement que je suis dans ma piscine au soleil", "Je suis mort dehors J1 mais c'est pas ma faute je dormais chez ma copine", "Je suis mort dehors mais c'est pas ma faute c'était la finale"],
	Uff: ['Force et honneur !'],
	Hartyom: ['JE SUIS PRISONNIER DU CANAL AUDIO, O SECOUR !'+scalim +scalim +scalim, 'Y\'a moyen de pécho dans la méta alors ? Ptain c\'est de mieux en mieux']
};
var mat100 = 0;

bot.on('message', function (msg) {
	profil.newMessage(msg);
	
	var txt = msg.content;
	
	if (txt === '!everyone') {
		msg.reply('Et non tu seras le seul mentionné !');
		profil.newCommand(msg.author, txt);
	}
	
	else if (txt === '!echo') {
		msg.channel.send('echo', {
			tts: true
		});
		profil.newCommand(msg.author, txt);
	}
	
	else if (txt === smat100) {
		if (mat100 == 1) {
			mat100 = -1;
			msg.channel.send(smat100);
		} else {
			mat100 ++;
		}
		profil.newCommand(msg.author, txt);
	}
	
	else if (txt.slice(0, 2) === '!d' && !isNaN(txt.substr(2))) {
		if(txt.substr(2) == 0) {
			msg.channel.send('Ca existe ce machin?');
		}
		else {
		var des = randInt(txt.substr(2)) + 1;
		msg.channel.send("d" + txt.substr(2) + " : ***" + des + "***");
		}
		profil.newCommand(msg.author, '!d + nbr');
	}
	
	else if ((commandes.indexOf(txt) != -1) || (cpseudo.indexOf(txt) != -1) || (cinvis.indexOf(txt) != -1)) {
		if ((txt.substr(1) === msg.author.username) || (txt === '!Cleme' && msg.author.username === 'Clémentine') || (txt === '!Roventa' && msg.author.username === 'm4x')) {
			msg.channel.send('Bah c\'est toi idiot ' + scalim);
		} else {
			var L = asw[txt.substr(1)];
			msg.channel.send(L[randInt(L.length)]);
		}
		profil.newCommand(msg.author, txt);
	}
});

// Login
bot.login(key);
