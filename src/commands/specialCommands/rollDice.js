import { randInt } from "../../utils/randInt.js";

const rollDice = (message, value) => {
  if (value === 0) {
    message.channel.send("Ca existe ce machin ?");
  } else {
    const diceValue = randInt(value) + 1;
    message.channel.send(`d${value} : ***${diceValue}***`);
  }
};

export { rollDice };
