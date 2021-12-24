import { randInt } from "../../utils/randInt.js";

const penis = (message) => {
  if (message.author.username === "Clémentine") {
    message.channel.send("8===============D");
  } else {
    const nbr = randInt(10) + 1;
    let penis = "8";
    for (let i = 0; i < nbr; i++) {
      penis += "=";
    }
    penis += "D";
    message.channel.send(penis);
  }
};

export { penis };
