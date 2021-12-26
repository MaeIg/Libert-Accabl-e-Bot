import { commandList } from "../commandList.js";
import { helpInfo } from "../helpInfo.js";

const help = (message, command) => {
  if (command.length > 6) {
    const resultList = helpInfo[command.slice(6)];
    if (resultList !== undefined) {
      message.channel.send(resultList);
    } else {
      message.channel.send(
        `**Commandes disponibles :**\n\`\`\`${commandList.join(
          "\n"
        )}\`\`\`\n_!membres_ pour plus de commandes\n_!help Commande_ pour plus d'information sur une commande`
      );
    }
  } else {
    message.channel.send(
      `**Commandes disponibles :**\n\`\`\`${commandList.join(
        "\n"
      )}\`\`\`\n_!membres_ pour plus de commandes\n_!help Commande_ pour plus d'information sur une commande`
    );
  }
};

export { help };
