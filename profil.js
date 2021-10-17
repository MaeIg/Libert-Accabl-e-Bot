// Init
import { config } from "dotenv";
import Discord from "discord.js";
import pg from "pg";

config();

// On connecte le bot à la bdd
const dbUserData =
  process.env.environment === "PROD"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : { connectionString: process.env.DATABASE_URL };

const client = new pg.Client(dbUserData);

client.connect((err) => {
  if (err) {
    console.log(`[BDD] Connection error : ${err.stack}`);
    client.end();
  } else {
    console.log("[BDD] Connected!");
  }
});

// Fonctions
function lvlUp(msg, lvl) {
  const user = msg.author;

  const embed = new Discord.RichEmbed()
    .setAuthor(
      "LVL UP",
      "https://www.dbarj.com.br/wp-content/uploads/2017/08/large1.png"
    )
    .setColor(0xff9900)
    .setDescription(`${user.username} passe niveau ${lvl} !!`)
    .setThumbnail(user.avatarURL);

  msg.channel.send({ embed });
}

const newMessage = (msg) => {
  const user = msg.author;
  client.query("SELECT id FROM members WHERE id=$1", [user.id], (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      // On teste si le membre est dans la bdd
      if (res.rowCount === 0) {
        // Si non, on l'ajoute
        console.log(`${user.username} n'est pas dans la bdd`);
        client.query(
          "INSERT INTO members(id, name, lvl, xp, messages, money, lastmsg, avatar, firstmsg) VALUES($1, $2, 1, 0, 1, 1000, CURRENT_TIMESTAMP, $3, CURRENT_TIMESTAMP)",
          [user.id, user.username, user.avatarURL],
          (err) => {
            if (err) {
              console.log(err.stack);
              return 0;
            }
            console.log(`${user.username} a été ajouté à la table members`);
          }
        );
      } else {
        // Si oui, on gère tout le bazard
        client.query(
          "SELECT messages, xp, lvl, money FROM members WHERE id=$1",
          [user.id],
          (err, res) => {
            if (err) {
              console.log(err.stack);
              return 0;
            }
            let xp = res.rows[0].xp + 1;
            let { lvl } = res.rows[0];
            let { money } = res.rows[0];
            // On incrémente le nombre de messages
            client.query(
              "UPDATE members SET messages=messages+1, lastmsg=CURRENT_TIMESTAMP, avatar=$1 WHERE id=$2",
              [user.avatarURL, user.id],
              (e) => {
                if (e) {
                  console.log(e.stack);
                }
              }
            );
            // On lvl up si besoin
            const forLvl = Math.round((4 * lvl ** 2) / 5);
            if (xp >= forLvl) {
              xp -= forLvl;
              lvl++;
              money += lvl * 10;
              if (lvl === 100) {
                lvlUp(msg, lvl);
              }
            }
            // On met tout dans la bdd
            client.query(
              "UPDATE members SET lvl=$1 WHERE id=$2",
              [lvl, user.id],
              (e) => {
                if (e) {
                  console.log(err.stack);
                }
              }
            );
            client.query(
              "UPDATE members SET xp=$1 WHERE id=$2",
              [xp, user.id],
              (e) => {
                if (e) {
                  console.log(err.stack);
                }
              }
            );
            client.query(
              "UPDATE members SET money=$1 WHERE id=$2",
              [money, user.id],
              (e) => {
                if (e) {
                  console.log(err.stack);
                }
              }
            );
          }
        );
      }
    }
  });
};

const newCommand = (user, command) => {
  client.query(
    "SELECT name FROM commands WHERE name=$1",
    [command],
    (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        // On teste si la commande est dans la bdd
        if (res.rowCount === 0) {
          // Si non, on l'ajoute
          console.log(`${command} n'est pas dans la bdd`);
          client.query(
            "INSERT INTO commands(name, nbruses, lastuse, userid) VALUES($1, 1, CURRENT_TIMESTAMP, $2)",
            [command, user.id],
            (e) => {
              if (e) {
                console.log(err.stack);
              } else {
                console.log(`${command} a été ajoutée à la table commands`);
              }
            }
          );
        } else {
          // Déjà dans la bdd, on l'update
          client.query(
            "UPDATE commands SET nbruses=nbruses+1, lastuse=CURRENT_TIMESTAMP, userid=$1 WHERE name=$2",
            [user.id, command],
            (e) => {
              if (e) {
                console.log(e.stack);
              }
            }
          );
        }
      }
    }
  );
};

function printLadder(res, salon) {
  let rank = "";

  for (let i = 0; i < res.length; i++) {
    const j = i + 1;
    rank += `#${j} ${res[i].name} (lvl ${res[i].lvl}) ${res[i].messages}\n`;
  }

  salon.send(`***Classement des membres***\`\`\`${rank}\`\`\``);
}

function printLadderCommandes(res, salon) {
  let rank = "";

  for (let i = 0; i < res.length; i++) {
    const j = i + 1;
    rank += `#${j} ${res[i].name} (${res[i].nbruses})\n`;
  }

  salon.send(`***Commandes les plus utilisées***\`\`\`${rank}\`\`\``);
}

function printRichesse(res, salon) {
  let rank = "";

  for (let i = 0; i < res.length; i++) {
    const j = i + 1;
    rank += `#${j} ${res[i].name} (lvl ${res[i].lvl}) ${res[i].money} Ł\n`;
  }

  salon.send(`***Membres les plus riches***\`\`\`${rank}\`\`\``);
}

const classement = (salon) => {
  client.query(
    "SELECT name, lvl, messages FROM members ORDER BY messages DESC LIMIT 10",
    (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        printLadder(res.rows, salon);
      }
    }
  );
};

const classementCommandes = (salon) => {
  client.query(
    "SELECT name, nbruses FROM commands ORDER BY nbruses DESC LIMIT 10",
    (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        printLadderCommandes(res.rows, salon);
      }
    }
  );
};

const classementRichesse = (salon) => {
  client.query(
    "SELECT name, lvl, money FROM members ORDER BY money DESC LIMIT 10",
    (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        printRichesse(res.rows, salon);
      }
    }
  );
};

const profil = (salon, nom) => {
  client.query(
    "SELECT lvl, xp, messages, money, lastmsg, firstmsg, avatar FROM members WHERE name=$1",
    [nom],
    (err, res) => {
      if (err) {
        console.log(err.stack);
      } else if (res.rows.length === 0) {
        salon.send("Cette personne n'est pas dans la base de données.");
      } else {
        const val = res.rows[0];
        const lvlup = Math.round((4 * val.lvl ** 2) / 5);
        let { avatar } = val;
        if (avatar === "") {
          avatar =
            "http://1.bp.blogspot.com/--W_nRn6KT7c/UZYb9qcs5yI/AAAAAAAAAN8/G20bdSrsba4/s1600/avatar-inconnu.jpg";
        }
        const embed = new Discord.RichEmbed()
          .setAuthor(
            `Profil de ${nom}`,
            "https://i62.servimg.com/u/f62/17/86/50/40/bannie12.jpg"
          )
          .setColor(0xff9900)
          .setDescription(
            `Niveau : ${val.lvl}\nXP : ${val.xp}/${lvlup}\nMessages : ${val.messages}\nLibCoins : ${val.money}\nDernier message le ${val.lastmsg}\nPremier message le ${val.firstmsg}`
          )
          .setThumbnail(avatar);

        salon.send({ embed });
      }
    }
  );
};

const newRequest = (user, nom, txt) => {
  client.query(
    "INSERT INTO request(request_user, request_name, request_msg) VALUES($1, $2, $3)",
    [user.username, nom, txt],
    (err) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(`${user.username} a ajouté une requête : [${nom}] ${txt}`);
      }
    }
  );
};

const checkAnniversaire = (general) => {
  client.query(
    'SELECT name, avatar, EXTRACT(YEAR FROM firstmsg) AS "premier", EXTRACT(YEAR FROM CURRENT_TIMESTAMP) AS "annee" FROM members WHERE EXTRACT(DAY FROM firstmsg) = EXTRACT(DAY FROM CURRENT_TIMESTAMP) AND EXTRACT(MONTH FROM firstmsg) = EXTRACT(MONTH FROM CURRENT_TIMESTAMP) AND EXTRACT(YEAR FROM lastmsg) > EXTRACT(YEAR FROM CURRENT_TIMESTAMP)-2',
    (err, res) => {
      if (err) {
        console.log(err.stack);
      } else if (res.rows.length === 0) {
        console.log("Il n'y a pas d'anniversaire aujourd'hui.");
      } else {
        console.log("Il y a peut être des anniversaires aujourd'hui !");

        res.rows.forEach((row) => {
          const age = parseInt(row.annee, 10) - parseInt(row.premier, 10);

          if (age > 0) {
            console.log(`Nom : ${row.name} ; Age : ${age}`);

            let text = "";
            if (age === 1) {
              text = "Déjà 1 an sur le discord !";
            } else {
              text = `Déjà ${age} ans sur le discord !`;
            }

            let { avatar } = row;
            if (avatar === "") {
              avatar =
                "http://1.bp.blogspot.com/--W_nRn6KT7c/UZYb9qcs5yI/AAAAAAAAAN8/G20bdSrsba4/s1600/avatar-inconnu.jpg";
            }

            const embed = new Discord.RichEmbed()
              .setAuthor(`Joyeux anniversaire ${row.name} !`, avatar)
              .setColor(0xff9900)
              .setDescription(text)
              .setThumbnail(
                "https://www.drostatic.com/images/lemagfemmes/home/gateau_fusee.jpg"
              );

            general.send(embed);
          }
        });
      }
    }
  );
};

// Export
export {
  newMessage,
  newCommand,
  classement,
  classementCommandes,
  classementRichesse,
  profil,
  newRequest,
  checkAnniversaire,
};
