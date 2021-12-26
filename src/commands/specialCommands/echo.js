const echo = (message) => {
  message.channel.send("echo", {
    tts: true,
  });
};

export { echo };
