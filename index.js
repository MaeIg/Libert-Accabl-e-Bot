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

// Variables globales
var hll = new Date(2022,07,09,20,08,00);

// Smileys
const scalim = '<:calim:637572971124359189>';
const smat100 = '<:mat100:458140489485385780>';
const ssadcat = '<:sadcat:543739550137188420>';
const sheart = '❤';
const ssob = '😭';
const sfeu = '🔥';
const soppression = '🙂';
const ssmile = '😄';
const sokhand = '👌';
const chanBeauf = '<#418751341519962113>';
const soreo = 'https://cdn.discordapp.com/attachments/481899683275603973/492331931170766849/oreo_2.png';
const skoukou = '<:koukou:540206430993776641>';
const smhh = '🍆';
const sumbrella = '☔';
const sdrop = '💦';

// Commandes
const commandes = ['!help', '!forum', '!trombi', '!site', '!requete', '!d + nombre', '!everyone', '!echo', '!cui', '!nuclear', '!cyanure', '!bleus', '!actualité', '!log', '!classement', '!commandes', '!rich', '!profil _nomDiscord', '!penis', '!oreoplz', '!parapluie', '!license'],
    cpseudo = ['!Bernard', '!Golgoth', '!Maelg', '!MacKay', '!Roventa', '!Sibaal', '!Cleme', '!Khran', '!Drac', '!Dragon', '!Matsam', '!Shaggyz', '!Uff', '!Hartyom', '!Tephal', '!Cerfpihier', '!Lilith', '!Loko', "!WassaW", "!Nathan", "!Zomzom", "!Pellaeon"],
    cinvis = ['!membres', '!logs'];
// commandes => Pour les commandes basiques ; cpseudo => Pour les commandes liées au pseudo ; cinvis => Pour les commandes qui n'apparaissent pas dans le !help
const asw = {
	help: ['**Commandes disponibles :**\n```' + commandes.join('\n') + '```\n_!membres_ pour plus de commandes\n_!help commande_ pour plus d\'information sur une commande'],
	membres: ['**Commandes disponibles :**\n```' + cpseudo.join('\n') + '```\n_!help_ pour plus de commandes'],
	forum: ['http://kirov-meta.forumactif.org/'],
	trombi: ['Pour accéder au trombi, demandez l\'accès à Cleme ou Khran et postez une photo !'],
	site: ['https://bernard-site.herokuapp.com/'],
	everyone: ['Normalement ce message n\'est pas censé apparaître :calim:'],
	echo: ['Tu t\'es cru dans une caverne ?!', "Syncope générale provoquée par tts imminente."],
	cui: ['Cui !', 'Tu me prends pour un vulgaire moineau?'],
	nuclear: ['Alex The Autist vous détruira tous !'],
	cyanure: ["J'attends toujours que Matsam me crée " + ssob],
	bleus: ['On est les champions ! On est les champions ! On est... on est... on est les champions ! ♫', 'Allez les bleus !', '1998-2018 !', 'Et 1... Et 2... Et 3... et 4-2 !'],
	actualité: ['Google est ton ami !', 'Golgoth est toujours privé d\'ordinateur', 'Hartyom n\'a toujours pas fini de se plaindre', 'Roventa pense encore à Sibaal', 'La méta a maintenant une coa de bannis dans son zoo', 'Golgoth est de retour et a trouvé une nouvelle baby-sitter : Lilith '+sfeu],
	log: ['***Last update : 06/11/2019 17h17***\n\nAjout des commandes !Nathan, !Zomzom et !Pellaeon.\nMise à jour des commandes !Lilith, !Cleme et !Matsam.\n\n_!logs_ pour plus de logs'],
	logs: ['https://bernard-site.herokuapp.com/logs'],
	penis: ['8=D'],
	oreoplz: [soreo],
	parapluie: ['||' + skoukou + '||' + '||' + smhh + '||' + '||' + sdrop + '||' + '||' + sumbrella + '||'],
	license: ['https://github.com/MaeIg/Libert-Accabl-e-Bot/blob/master/LICENSE.md'],
	Bernard: ['C\'est moi !'],
	Golgoth: ['Tu parle à ki ?', 'tu me parle à moi?', "j'suis un gangster"],
	Maelg: ['Miou !', "J'aime pas Despacito, je l'ai juste jouée 50 fois sur osu!", ":3", "Tu veux voir mon babobab ?"],
	MacKay: ["L'humanité est pourrie l'amour est une illusion", "Je vous suis infiniment supérieur ", "Loué soit le grand MacKay", "Ma vie pour MacKay", "Et si on abandonnait Matsang pour la quinzième fois ?", "Les éclaireurs : poules mouillées ou tafioles?"],
	Roventa: ["Je t'aime... mais lâche-moi bordel !", "Cool une vodka, je ne serais pas obligé de boire mon eau pour finir l'expé !", "Les russes ont triché l'Égypte devait gagner", "t'habite ou ?", "T'as du style, épouse-moi !", "Cool un RP ! Jump antipictoquoi ?","Ça m énerve pcq je ne suis pas à la hauteur de tout ce que tu nous apporte", "Une fille qui joue a hordes, ca ne peut pas etre qq'un de manipulateur et d' égocentrique", "Allez allez vous faites moins les malines quand vous nous mangez le sexe"],
	Sibaal: ['Et en plus tu m\'traîte de Golgoth.'],
	Cleme: ['Et c\'est sur ces mots que toute envie révolutionnaire s\'éteint chez le peuple.','Le mandat de la présidente Cleme était incontestable et sa puissance sans limite.', "Île-de-France? Tu veux dire Paris", "Y a que Paint de vrai", chanBeauf, "Je préfère le gratin dauphinois à la bite "+sokhand, "CLIQUE SUR LES CHARIOTS SALE CON"],
	Khran: ['Un vrai ETListe abandonne son stuff dans le désert !', "Meurt dans le désert"],
	Drac: ['+37 !', "J'ai disparu en 1937 !"],
	Dragon: ['Coup critique !', 'Bon je vais me coucher, bonne journée !', 'Oh, j\'ai encore fait un 20 aux dés !'],
	Matsam: ['Hartychou '+sheart, 'Paint '+sheart, 'Ragots '+sheart,'Smash Bros '+sheart, 'Maelg le dieu de l\'anti-picto', 'Jpp de ma vie '+scalim, "Je vais en faire un meme"+smat100, "Pourquoi on est J2 ? On jump pas ce soir ?", soppression],
	Shaggyz: ["Quel fléau la canicule parisienne, heureusement que je suis dans ma piscine au soleil", "Je suis mort dehors J1 mais c'est pas ma faute je dormais chez ma copine", "Je suis mort dehors mais c'est pas ma faute c'était la finale"],
	Uff: ['Force et honneur !'],
	Hartyom: ['JE SUIS PRISONNIER DU CANAL AUDIO, O SECOUR !'+scalim +scalim +scalim, 'VOUS CONNAISSEZ LE POINT COMMUN ENTRE UFF ET LE FROMAGE DE MACKAY ? ON EN ENTEND BEAUCOUP PARLER MAIS ON LES VOIT JAMAIS HAHAHAHAHAHAHAHHAAH', 'Y\'a moyen de pécho dans la méta alors ? Ptain c\'est de mieux en mieux', 'Il ne peut en rester AUCUN. Je ne laisserai aucune de ces racailles faire la loi dans cette ville. NOT UNDER MY WATCH', "Ger une revandication.", "JE VOUS BEZ", "GREVEGENERALE"],
	Tephal: ['tg','Les meilleurs articles pour pécho s\'achètent chez Moulinooooooooot.', 'VTFF', 'Ce sera répété, amplifié et déformé ou inversement réciproquement dans l\'autre sens, au choix'],
	Cerfpihier: ['Écoute petit...'],
	Lilith: ["Je suis aussi douée avec ma langue, on peut bien s'entendre" + sfeu, "Je suis très flexible sur les horaires (pas que sur les horaires " + ssmile + " )", "J'étais bourrée xD", 'Là où je passe, les PMV trépassent', "Hordes va disparaître en 2020 et j'aurai pas de titre sm " + ssadcat, "Elle est bonne la coquine ?"],
	Loko: ['On est des gentils ou des mechants ?', 'Bravo Hartyom t\'es le plus fort de la ville', 'Ça freine mes débuts de serial killer','allez violé moi', "Je viens de recompter tu m'as deja sauvé 3 fois donc la prochaine c'est bon tu peux me laisser mourir", 'Manque plus qu\'on me viole dans le désert et je suis au top', 'Shaggyz Cleme je vous love ' + sheart + ' ' + sheart + ' coeur sur vous'],
	WassaW: ['J AI LU PENDANT 72 HEURES NON STOP AVEC UN SOIR DANS LA NUIT BLANCHE', 'Fais un pavé s\'il te plait', 'NEGATIF IL EST TOUJOURS SOUS PLASTIQUE ON Y TOUCHE PAS', 'AHAHAHAHAH'],
	Nathan: ["@everyøne J'ai besoin de garants pour ma sortie de prison ! AIDEZ MOI"],
	Zomzom: ["Je tiens ├á dire que \"" + sopression + "\" c'est opressant mais que le \"wesh\" a la fin de ta phrase m'a mis au fond", "C'est à force de lire les magouilles de Shaggyz, j'apprends", "Bah non a une soirée j'avais trop bu je l'ai embrassé, la boulette"],
	Pellaeon: ["\"caquelon\", c'est un poulet travesti qui caquette ?", "Sous word il y a deux \"espaces\", un avec \"espace\", un second généré automatique, comme quand tu met des \"guillements\" et qui se place tout seul", "Je tente de mettre en demeure sfr de revoir toutes les resiliations de l'ann├®e devant la repression des fraudes ? X)", "George Clone né ?"]
};
const helpInfo = {
	help: "**Utilisation**\n```!help _Commande```\n**Description**\n```La commande help donne des informations sur l'utilisation de la commande spécifiée. Si aucune commande n'est spécifiée, elle donne la liste des commandes disponibles.```",
	membres: "**Utilisation**\n```!membres```\n**Description**\n```La commande membres donne la liste des commandes disponibles sur certains membres ou ex membres. Ces commandes permettront de connaître des phrases drôles ou typiques prononcées par ces membres.```\n**Exemple**\n```!WassaW pourra donner \"AHAHAHAHAH\".```",
	forum: "**Utilisation**\n```!forum```\n**Description**\n```J'espère pour toi que tu sais à quoi sert le forum !```",
	trombi: "**Utilisation**\n```!trombi```\n**Description**\n```Le trombi te permet de voir la tête des autres si tu es prêt à montrer la tienne !```",
	everyone: "**Utilisation**\n```!everyone```\n**Description**\n```N'utilisez pas cette commande !!!```",
	echo: "**Utilisation**\n```!echo```\n**Description**\n```Une commande tellement puissante que Cleme a dû en limiter l'effet...```",
	cui: "**Utilisation**\n```!cui```\n**Description**\n```Un pile ou face créé par MacKay. Il y a donc deux réponses possibles : cui ou...```",
	nuclear: "**Utilisation**\n```!nuclear```\n**Description**\n```Le saviez-vous ? Bernard s'est fait hacké et s'est fait contrôler par une méchante personne dans ses débuts. Maintenant sa protection a été revue à la hausse mais cette commande est là pour rappeler cet évennement plutôt spécial...```",
	cyanure: "**Utilisation**\n```!cyanure```\n**Description**\n```A utiliser quand les gens spamment trop sur un canal.\n~ Commande créée par un poussin qui n'aime pas quand il y a trop de bruit```",
	bleus: "**Utilisation**\n```!bleus```\n**Description**\n```Les plus grands suporters de l'équipe de France sont sur ce discord !```",
	actualité: "**Utilisation**\n```!actualité```\n**Description**\n```Aussi à jour qu'internet explorer !```",
	log: "**Utilisation**\n```!log```\n**Description**\n```Pour connaître les dernières nouveautés de Bernard.```",
	logs: "**Utilisation**\n```!logs```\n**Description**\n```Historique des mises à jour de Bernard.```",
	penis: "**Utilisation**\n```!penis```\n**Description**\n```Qui réussira à battre Cleme ?```",
	oreoplz: "**Utilisation**\n```!oreoplz```\n**Description**\n```Je préfère ne pas en parler...```",
	parapluie: "**Utilisation**\n```!parapluie```\n**Description**\n```Demandez à Harty !```",
	license: "**Utilisation**\n```!license```\n**Description**\n```Si vous voulez copier Bernard, citez l'original !```",
	d: "**Utilisation**\n```!d_nbPositif```\n**Description**\n```Donne un nombre aléatoire entre 1 et ce nombre.```\n**Exemple**\n```!d100 pourra donner \"69\".```",
	peage: "**Utilisation**\n```Indisponible```\n**Description**\n```Un jour cette commande existera !```",
	profil: "**Utilisation**\n```!profil _nomDiscord```\n**Description**\n```Affiche le profil de la personne donnée. Si aucune personne n'a été donnée, affiche votre profil.```",
	rich: "**Utilisation**\n```!rich```\n**Description**\n```Donne la liste des personnes ayant le plus de Libcoins sur le discord. Mais à quoi peut bien servir cette monnaie ?```",
	commandes: "**Utilisation**\n```!commandes```\n**Description**\n```Donne la liste des commandes les plus utilisées sur ce discord.```",
	classement: "**Utilisation**\n```!classement```\n**Description**\n```Donne la liste des personnes ayant le plus parlé sur ce discord. Qui arrivera à détrôner Cleme ?```",
	requete: "**Utilisation**\n```!requete Nom Phrase```\n**Description**\n```Si vous voulez qu'une phrase dite par un joueur lui soit associée sur Bernard, vous pouvez utiliser cette commande. Si la communauté approuve, ces phrases seront ajoutées à Bernard. Comme ça les personnes qui ne sont pas dans les phrases de Bernard n'auront plus de raison de se plaindre !!```\n**Exemple**\n```!requete Khayrisill Tu me manques wawa```",
	site: "**Utilisation**\n```!site```\n**Description**\n```Envoit un lien vers l'antre de Bernard. Qui sait ce que vous pourriez y trouver ?```"
};
var mat100 = 0;

bot.on('message', function (msg) {
	profil.newMessage(msg);
	
	var txt = msg.content;
	
	if (txt.slice(0,5) === '!help') {
		if (txt.length > 6) {
			let L = helpInfo[txt.slice(6,txt.length)];
			if (L != undefined) {
				msg.channel.send(L);
			} else {
				msg.channel.send('**Commandes disponibles :**\n```' + commandes.join('\n') + '```\n_!membres_ pour plus de commandes\n_!help Commande_ pour plus d\'information sur une commande');
			}
		} else {
			msg.channel.send('**Commandes disponibles :**\n```' + commandes.join('\n') + '```\n_!membres_ pour plus de commandes\n_!help Commande_ pour plus d\'information sur une commande');
		}
		profil.newCommand(msg.author, '!help');
	}
	
	else if (txt.slice(0,8) === '!requete') {
		let mots = txt.split(' ');

		if (mots.length < 3) {
			msg.channel.send("**Utilisation**\n```!requete Nom message```");
		} else {
			profil.newRequest(msg.author, mots[1], mots.slice(2).join(' '));
			msg.channel.send("Requête enregistrée !");
		}

		profil.newCommand(msg.author, '!requete');
	}

	else if (txt === '!everyone') {
		msg.reply('Et non tu seras le seul mentionné !');
		profil.newCommand(msg.author, txt);
	}
	
	else if (txt === '!cyanure') {
		msg.channel.send("Ca spamme beaucoup trop sur ce canal, " + msg.author.username + " a donc décidé d'en finir avec cette communauté oppressante.");
		profil.newCommand(msg.author, txt);
	}
	
	else if (txt === '!classement') {
		profil.classement(msg.channel);
		profil.newCommand(msg.author, txt);
	}
	
	else if (txt === '!commandes') {
		profil.classementCommandes(msg.channel);
		profil.newCommand(msg.author, txt);
	}
	
	else if (txt === '!rich') {
		profil.classementRichesse(msg.channel);
		profil.newCommand(msg.author, txt);
	}
	
	else if (txt === '!penis') {
		if (msg.author.username === 'Clémentine') {
			msg.channel.send('8===============D');
		} else {
			let nbr = randInt(10) + 1;
			let penis = '8';
			for (var i = 0 ; i < nbr ; i++) {
				penis += '=';
			}
			penis += 'D';
			msg.channel.send(penis);
		}
		profil.newCommand(msg.author, txt);
	}
	
	else if (txt === '!Cerfpihier') {
		var now = new Date();
		var time = hll-now-7200000;
		
		time = Math.floor(time/1000);
		var sec = time % 60;
		
		time = Math.floor((time-sec)/60);
		var min = time % 60;
		
		time = Math.floor((time-min)/60);
		var hour = time % 24;
		
		time = Math.floor((time-hour)/24);
		var day = time % 30;
		
		time = Math.floor((time-day)/30);
		var month = time % 12;
		day -= Math.floor(time/2);
		while (day < 0) {
			month --;
			day += 30;
		}
		
		time = Math.floor((time-month)/12);
		var year = time;
		while (month < 0) {
			month += 12;
			year --;
		}
		
		msg.channel.send('Notre ami Cerfpihier se vengera contre Shaggyz dans ' + year + ' ans, ' + month + ' mois, ' + day + ' jours, ' + hour + ' heures, ' + min + ' minutes, et ' + sec + ' secondes !\nBonne chance à lui dans sa croisade !');
	}
	
	else if (txt.slice(0,7) === '!profil') {
		if (txt.length > 8) {
			profil.profil(msg.channel, txt.slice(8,txt.length));
		} else {
			profil.profil(msg.channel, msg.author.username);
		}
		profil.newCommand(msg.author, '!profil');
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
	
	else if ((txt.substr(1) === msg.author.username) || (txt === '!Cleme' && msg.author.username === 'Clémentine') || (txt === '!Roventa' && msg.author.username === 'm4x') || (txt === '!Shaggyz' && msg.author.username === 'Siflomir')) {
		msg.channel.send('Bah c\'est toi idiot ' + scalim);
	}
	
	else if ((commandes.indexOf(txt) != -1) || (cpseudo.indexOf(txt) != -1) || (cinvis.indexOf(txt) != -1)) {
		var L = asw[txt.substr(1)];
		msg.channel.send(L[randInt(L.length)]);
		
		profil.newCommand(msg.author, txt);
	}
});

// Login
bot.login(key);
