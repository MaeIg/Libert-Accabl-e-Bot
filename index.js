// Initialisation
const Discord = require('discord.js');
const bot = new Discord.Client();
const key = process.env.token;

// Fonctions utiles
function randInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

// Smileys
const scalim = '<:calim:371258660489396225>';
const smat100 = '<:mat100:458140489485385780>';
const sheart = '❤';

// Commandes
var commandes = ['!help', '!forum', '!trombi', '!d + nombre', '!everyone', '!echo', '!cui', '!nuclear', '!Bernard', '!Golgoth', '!Maelg', '!MacKay', '!Roventa', '!Sibaal', '!Cleme', '!Khran', '!Drac', '!Dragon', '!Matsam', '!Shaggyz', '!Uff'];
var asw = {
	help: ['Commandes disponibles :\n' + commandes.join('\n')],
	forum: ['http://kirov-meta.forumactif.org/'],
	trombi: ['Pour accéder au trombi, demandez l\'accès à Cleme ou Khran et postez une photo !'],
	everyone: ['Normalement ce message n\'est pas censé apparaître :calim:'],
	echo: ['Tu t\'es cru dans une caverne ?!', "Syncope générale provoquée par tts imminente."],
	cui: ['Cui !', 'Tu me prends pour un vulgaire moineau?'],
	nuclear: ['Alex The Autist vous détruira tous !'],
	Bernard: ['C\'est moi !'],
	Golgoth: ['Tu parle à ki ?', 'tu me parle à moi?', "j'suis un gangster"],
	Maelg: ['Miou !', "J'aime pas Despacito, je l'ai juste jouée 50 fois sur osu!", ":3"],
	MacKay: ["L'humanité est pourrie l'amour est une illusion", "Je vous suis infiniment supérieur ", "Loué soit le grand MacKay", "Ma vie pour MacKay", "Et si on abandonnait Matsang pour la quinzième fois ?", "Les éclaireurs : poules mouillées ou tafioles?"],
	Roventa: ["Je t'aime... mais lâche-moi bordel !", "Cool une vodka, je ne serais pas obligé de boire mon eau pour finir l'expé !", "Les russes ont triché l'Égypte devait gagner", "t'habite ou ?", "T'as du style, épouse-moi !"],
	Sibaal: ['Et en plus tu m\'traîte de Golgoth.'],
	Cleme: ['Et c\'est sur ces mots que toute envie révolutionnaire s\'éteint chez le peuple.','Le mandat de la présidente Cleme était incontestable et sa puissance sans limite.', "Île-de-France? Tu veux dire Paris", "Y a que Paint de vrai"],
	Khran: ["Un vrai ETListe abandonne son stuff dans le désert !", "Meurt dans le désert"],
	Drac: ['+37 !'],
	Dragon: ['Coup critique !', 'Bon je vais me coucher, bonne journée !', 'Oh, j\'ai encore fait un 20 aux dés !'],
	Matsam: ['Hartychou '+sheart, 'Paint '+sheart, 'Ragots '+sheart],
	Shaggyz: ["Quel fléau la canicule parisienne, heureusement que je suis dans ma piscine au soleil", "Je suis mort dehors J1 mais c'est pas ma faute je dormais chez ma copine"],
	Uff: ['Force et honneur !']
};
var mat100 = 0;

bot.on('message', function (msg) {
	var txt = msg.content;
	
	if (txt === '!everyone') {
		msg.reply('Et non tu seras le seul mentionné !');
	}
	
	else if (txt === '!echo') {
		msg.channel.send('echo', {
			tts: true
		});
	}
	
	else if (txt === smat100) {
		if (mat100 == 2) {
			mat100 = -1;
			msg.channel.send(smat100);
		} else {
			mat100 ++;
		}
	}
	
	else if (txt.slice(0, 2) === '!d' && !isNaN(txt.substr(2))) {
		if(txt.substr(2) == 0) {
			msg.channel.send('Ca existe ce machin?');
		}
		else {
		var des = randInt(txt.substr(2)) + 1;
		msg.channel.send("d" + txt.substr(2) + " : ***" + des + "***");
		}
	}
	
	else if (commandes.indexOf(txt) != -1) {
		if ((txt.substr(1) === msg.author.username) || (txt === '!Cleme' && msg.author.username === 'Clémentine')) {
			msg.channel.send('Bah c\'est toi idiot ' + scalim);
		} else {
			var L = asw[txt.substr(1)];
			msg.channel.send(L[randInt(L.length)]);
		}
	}
});

// Login
bot.login(key);
