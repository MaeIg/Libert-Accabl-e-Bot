import { config } from "dotenv";
import Discord from "discord.js";
import pg from "pg";

console.log("-- Init config --");

// Take environment variables stored in .env file
config();

// Connexion to the database
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
    console.error(`[BDD] Connection error : ${err.stack}`);
    client.end();
  } else {
    console.log("[BDD] Connected!");
  }
});

// Connect the bot
const bot = new Discord.Client();
bot
  .login(process.env.token)
  .then(() => console.log("[BOT] Connected!"))
  .catch(console.error);

// Usefull tools
const { RichEmbed } = Discord;

export { bot, client, RichEmbed };
