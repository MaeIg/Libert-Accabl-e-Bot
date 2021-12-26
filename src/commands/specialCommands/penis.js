import { randInt } from "../../utils/randInt.js";

const penis = (message) => {
  if (message.author.username === "Clémentine") {
    message.channel.send("8===============D");
  } else {
    const randomSize = randInt(10) + 1;
    const penisText = `8${"=".repeat(randomSize)}D`;
    message.channel.send(penisText);
  }
};

export { penis };
