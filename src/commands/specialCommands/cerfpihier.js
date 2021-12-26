const cerfpihier = (message) => {
  const hll = new Date("2022", "07", "09", "20", "08", "00");
  const now = new Date();
  let time = hll - now - 7200000;

  time = Math.floor(time / 1000);
  const sec = time % 60;

  time = Math.floor((time - sec) / 60);
  const min = time % 60;

  time = Math.floor((time - min) / 60);
  const hour = time % 24;

  time = Math.floor((time - hour) / 24);
  let day = time % 30;

  time = Math.floor((time - day) / 30);
  let month = time % 12;
  day -= Math.floor(time / 2);
  while (day < 0) {
    month--;
    day += 30;
  }

  time = Math.floor((time - month) / 12);
  let year = time;
  while (month < 0) {
    month += 12;
    year--;
  }

  message.channel.send(
    `Notre ami Cerfpihier se vengera contre Shaggyz dans ${year} ans, ${month} mois, ${day} jours, ${hour} heures, ${min} minutes, et ${sec} secondes !\nBonne chance à lui dans sa croisade !`
  );
};

export { cerfpihier };
