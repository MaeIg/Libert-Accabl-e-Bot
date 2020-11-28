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
let generalChan; // Objet contenant les réfs vers le canal #general
const idGeneral = '464888621464551426';

// Smileys
const scalim = '<:calim:669952959425019904>';
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
const sscream = '😱';
const shumpf = "<:humpf:568317177741049856>";

// Commandes
const commandes = ['!help', '!forum', '!trombi', '!site', '!requete', '!d + nombre', '!everyone', '!echo', '!cui', '!nuclear', '!cyanure', '!bleus', '!actualité', '!log', '!classement', '!commandes', '!rich', '!profil _nomDiscord', '!penis', '!oreoplz', '!parapluie', '!film', '!license'],
    cpseudo = ['!Bernard', '!Golgoth', '!Maelg', '!MacKay', '!Roventa', '!Sibaal', '!Cleme', '!Khran', '!Drac', '!Dragon', '!Matsam', '!Shaggyz', '!Uff', '!Hartyom', '!Tephal', '!Cerfpihier', '!Lilith', '!Loko', "!WassaW", "!Nathan", "!Zomzom", "!Pellaeon", "!Roystar", "!Dikryl", "!Alexis", "!Ganapati", "!Mad", "!Mzboub", "!Freez"],
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
	actualité: ['Google est ton ami !', 'Hartyom n\'a toujours pas fini de se plaindre', "On est en guerre."],
	log: ['***Last update : 28/11/2020 19h00***\n\nBernard souhaite maintenant l\'anniversaire des actifs du discord !\nAjout des commandes !film, !Mzboub, !Mad, !Freez.\nMise à jour des commandes !Alexis, !Maelg, !WassaW, !Zomzom, !Roystar, !Uff, !Pellaeon, !Cleme, !Hartyom et !actualité.\n\n_!logs_ pour plus de logs'],
	logs: ['https://bernard-site.herokuapp.com/logs'],
	penis: ['8=D'],
	oreoplz: [soreo],
	parapluie: ['||' + skoukou + '||' + '||' + smhh + '||' + '||' + sdrop + '||' + '||' + sumbrella + '||'],
	film: ["You shit on my garden ?!", "Ils sont entrain de manger ma maman" + ssadcat, "Don't piss on the hospitality", "Vous êtes un koala tout à fait décent", "La rivière de nos larmes coule après le koala", "Beaux yeux belles couilles"],
	license: ['https://github.com/MaeIg/Libert-Accabl-e-Bot/blob/master/LICENSE.md'],
	Bernard: ['C\'est moi !'],
	Golgoth: ['Tu parle à ki ?', 'tu me parle à moi?', "j'suis un gangster"],
	Maelg: ['Miou !', "J'aime pas Despacito, je l'ai juste jouée 50 fois sur osu!", ":3", "Tu veux voir mon babobab ?", "Ma copine c'est encore pire elle peut les écarter à fond", "En vrai jsuis sûr que j'aimerais bien la soupe de bienvenue", "Pourquoi tout ce qui tourne autour de Supken est d'une débilité incommensurable ?", "Wesh c'est mon île pas un logement social"],
	MacKay: ["L'humanité est pourrie l'amour est une illusion", "Je vous suis infiniment supérieur ", "Loué soit le grand MacKay", "Ma vie pour MacKay", "Et si on abandonnait Matsang pour la quinzième fois ?", "Les éclaireurs : poules mouillées ou tafioles?"],
	Roventa: ["Je t'aime... mais lâche-moi bordel !", "Cool une vodka, je ne serais pas obligé de boire mon eau pour finir l'expé !", "Les russes ont triché l'Égypte devait gagner", "t'habite ou ?", "T'as du style, épouse-moi !", "Cool un RP ! Jump antipictoquoi ?","Ça m énerve pcq je ne suis pas à la hauteur de tout ce que tu nous apporte", "Une fille qui joue a hordes, ca ne peut pas etre qq'un de manipulateur et d' égocentrique", "Allez allez vous faites moins les malines quand vous nous mangez le sexe"],
	Sibaal: ['Et en plus tu m\'traîte de Golgoth.'],
	Cleme: ['Et c\'est sur ces mots que toute envie révolutionnaire s\'éteint chez le peuple.','Le mandat de la présidente Cleme était incontestable et sa puissance sans limite.', "Île-de-France? Tu veux dire Paris", "Y a que Paint de vrai", chanBeauf, "Je préfère le gratin dauphinois à la bite "+sokhand, "CLIQUE SUR LES CHARIOTS SALE CON", "Tant mieux qu'elle soit morte ils devraient tous mourir ces sales americains du Sud"],
	Khran: ['Un vrai ETListe abandonne son stuff dans le désert !', "Meurt dans le désert"],
	Drac: ['+37 !', "J'ai disparu en 1937 !"],
	Dragon: ['Coup critique !', 'Bon je vais me coucher, bonne journée !', 'Oh, j\'ai encore fait un 20 aux dés !'],
	Matsam: ['Hartychou '+sheart, 'Paint '+sheart, 'Ragots '+sheart,'Smash Bros '+sheart, 'Maelg le dieu de l\'anti-picto', 'Jpp de ma vie '+scalim, "Je vais en faire un meme"+smat100, "Pourquoi on est J2 ? On jump pas ce soir ?", soppression, "Perso j'ai deux manières de plier, une manière \"propre\" et une manière \"mi-propre\". Comme ça, quand je prends le vêtement, en fonction de la manière dont il est plié, je sais comment il est", "LES GENS QUI CRIE TOUS DES CON", "ALERTE CANDICE A APPORTÉ...", "JE SUIS SUR MON ÎLE T'ES DANS TA BILE", "J'entends ça je tombe par terre sans vouloir être dramatique", "Vous avez déjà éternué en rigolant ?", "Avant j'étais un gros fayot et maintenant je suis juste une crotte inactive, j'aime beaucoup"],
	Shaggyz: ["Quel fléau la canicule parisienne, heureusement que je suis dans ma piscine au soleil", "Je suis mort dehors J1 mais c'est pas ma faute je dormais chez ma copine", "Je suis mort dehors mais c'est pas ma faute c'était la finale"],
	Uff: ['Force et honneur !', "Génial les smoothies au foutre !"],
	Hartyom: ['JE SUIS PRISONNIER DU CANAL AUDIO, O SECOUR !'+scalim +scalim +scalim, 'VOUS CONNAISSEZ LE POINT COMMUN ENTRE UFF ET LE FROMAGE DE MACKAY ? ON EN ENTEND BEAUCOUP PARLER MAIS ON LES VOIT JAMAIS HAHAHAHAHAHAHAHHAAH', 'Y\'a moyen de pécho dans la méta alors ? Ptain c\'est de mieux en mieux', 'Il ne peut en rester AUCUN. Je ne laisserai aucune de ces racailles faire la loi dans cette ville. NOT UNDER MY WATCH', "Ger une revandication.", "JE VOUS BEZ", "GREVEGENERALE", "Quitte à être zoophile tu pourrais te renseigner"],
	Tephal: ['tg','Les meilleurs articles pour pécho s\'achètent chez Moulinooooooooot.', 'VTFF', 'Ce sera répété, amplifié et déformé ou inversement réciproquement dans l\'autre sens, au choix'],
	Cerfpihier: ['Écoute petit...'],
	Lilith: ["Je suis aussi douée avec ma langue, on peut bien s'entendre" + sfeu, "Je suis très flexible sur les horaires (pas que sur les horaires " + ssmile + " )", "J'étais bourrée xD", 'Là où je passe, les PMV trépassent', "Hordes va disparaître en 2020 et j'aurai pas de titre sm " + ssadcat, "Elle est bonne la coquine ?", "T'es plus mon crush", "Jcrois qu'ils ont parlé de moi en rujono hier\nEn ruinoln\nEn Réunion."],
	Loko: ['On est des gentils ou des mechants ?', 'Bravo Hartyom t\'es le plus fort de la ville', 'Ça freine mes débuts de serial killer','allez violé moi', "Je viens de recompter tu m'as deja sauvé 3 fois donc la prochaine c'est bon tu peux me laisser mourir", 'Manque plus qu\'on me viole dans le désert et je suis au top', 'Shaggyz Cleme je vous love ' + sheart + ' ' + sheart + ' coeur sur vous'],
	WassaW: ['J AI LU PENDANT 72 HEURES NON STOP AVEC UN SOIR DANS LA NUIT BLANCHE', 'Fais un pavé s\'il te plait', 'NEGATIF IL EST TOUJOURS SOUS PLASTIQUE ON Y TOUCHE PAS', 'AHAHAHAHAH', "Je peux manger du fromage blanc en attendant que tu comprennes ?", "Il vaut mieux aller élever des escargots à Auxerre avec un doctorat plutôt que sans", "Je n'arrive pas à me concentrer de tomate", "Non je vote pas sur Allocine j'aime pas le jaune je deteste ce site", sheart + " Vous êtes mes petits gėnies du DiDi " + sheart, "Ils s'auto dépriment sans moi !", "Pour que deux Moi fassent un Nous il faut que les Moi soi soi", 'Toujours quand je suis sérieux on me "dé-sérieux"', "On veut juste mon corps parce que je suis bonne, grâce à vous j'ai compris HAHAHAHAHAH", "j ai fait des photos mais c'est pas très joli"],
	Nathan: ["@everyøne J'ai besoin de garants pour ma sortie de prison ! AIDEZ MOI"],
	Zomzom: ["Je tiens à dire que \"" + soppression + "\" c'est opressant mais que le \"wesh\" a la fin de ta phrase m'a mis au fond", "C'est à force de lire les magouilles de Shaggyz, j'apprends", "Bah non a une soirée j'avais trop bu je l'ai embrassé, la boulette", "Bonjour la méta, je suis à un hâle et malgré l'heure bon taudive, j'ai bu bien :D Désolé de ma mort de noob lors du précédent CM :'( ça m' artiste !", "Vous me faites trop rire je vous aime aussi haha.", "Je viens pas bourré ici okay", "Le masque c'est comme l'apres shampooing : c'est sous la douche", "L'absence d'info est une info tant que c'est communiqué.", "Ce qui est plus chelou c'est ton aviq sur les viuex et le corona", "INHUSTICR"],
	Pellaeon: ["\"caquelon\", c'est un poulet travesti qui caquette ?", "Sous word il y a deux \"espaces\", un avec \"espace\", un second généré automatique, comme quand tu met des \"guillements\" et qui se place tout seul", "Je tente de mettre en demeure sfr de revoir toutes les resiliations de l'année devant la repression des fraudes ? X)", "George Clone né ?", "Arf, je décrète officiellement la creation du pays des imaginaire alors clochette !", "Comme une expé : avec un fouet, de la volonté et des MSE !", "La logique et le bon sens n'ont pas de place dans cette maison.", "Plus de licornes et moins d'argent au quotidien ?", "Vous êtes Rabin en informations mademoiselle. Mais ça correspond au personne, j'apprécie la logique !", "C'est du pas toi local ?", "Même s'il est ironique ee moins de vue de ne préparer l'armée qu'a un changement annuel, de moins point de vue xD", "Ca dépend, si son signe astrologique est le cancer, c'est p'têt une version française Symfony", "Que nenniema mie"],
	Roystar: ["Ptain j'ai mis mon caleçon à l'envers ce matin jme disais bien que c'était bizarre", "Ah mais la prochaine fois je ramène du champomy moi vous m'avez fait trop peur jme souviens pas de tout " + sscream, "t ban"],
	Dikryl: ["Salutérus, ça vagin ?"],
	Alexis: ["On a déjà vomi dans mon duvet et dans mes oreilles c'était vraiment pas super " + ssadcat, "Voulez vous écouter \"on va niquer ce soir\" ?", "TU CROIS QUE TU COMPRENDS PAS MAIS EN FAIT TU COMPRENDS PAS ENCORE MOINS"],
	Ganapati: ["Merci Harty, n'oublions pas la \"recrue décence\", à l'heure où la recrudescence du molestage et du bizutage bat son plein ! xD"],
	Mad: ["Personne ira visiter ton île.", shumpf],
	Mzboub: ["!menbre"],
	Freez: ["la sélection naturelle c'est le fait qu'un organisme survivre dans un milieu et pas un autre organisme, selon moi"]
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
	site: "**Utilisation**\n```!site```\n**Description**\n```Envoie un lien vers l'antre de Bernard. Qui sait ce que vous pourriez y trouver ?```",
	film: "**Utilisation**\n```!film```\n**Description**\n```Envoie une citation aléatoire de l'un des films vu dans #cinema```"
};
var mat100 = 0;


bot.on('ready', () => {
	generalChan = bot.channels.get(idGeneral);
	
	// CRON
	setInterval(() => {
		profil.checkAnniversaire(generalChan);
	}, 86400000);
});

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
	
	else if ((txt.substr(1) === msg.author.username) || (txt === '!Cleme' && msg.author.username === 'Clémentine') || (txt === '!Roventa' && msg.author.username === 'm4x') || (txt === '!Shaggyz' && msg.author.username === 'Siflomir') || (txt === '!Nathan' && msg.author.username === 'ッNnatto') || (txt === '!Cornet' && msg.author.username === 'Alexis')) {
		msg.channel.send('Bah c\'est toi idiot ' + scalim);
		profil.newCommand(msg.author, txt);
	}
	
	else if ((commandes.indexOf(txt) != -1) || (cpseudo.indexOf(txt) != -1) || (cinvis.indexOf(txt) != -1)) {
		var L = asw[txt.substr(1)];
		msg.channel.send(L[randInt(L.length)]);
		
		profil.newCommand(msg.author, txt);
	}
});

// Login
bot.login(key);
