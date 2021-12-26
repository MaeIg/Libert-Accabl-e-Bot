import { smileys } from "../../constants/smileys.js";

let mat100Counter = 0;

const mat100 = (message) => {
  if (mat100Counter === 1) {
    mat100Counter = -1;
    message.channel.send(smileys.mat100);
  } else {
    mat100Counter++;
  }
};

export { mat100 };
