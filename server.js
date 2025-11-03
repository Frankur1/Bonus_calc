import express from "express";
const app = express();

app.use(express.urlencoded({ extended: true }));

// HTML форма (основная страница)
app.get("/", (req, res) => {
  res.send(`
  <html>
  <head>
  <meta charset="utf-8">
  <title>Бонусный калькулятор</title>
  <style>
    body {font-family:Inter, sans-serif; background:#111; color:#ddd; text-align:center; padding:40px;}
    input {width:80%; padding:10px; border-radius:6px; border:1px solid #444; background:#222; color:#fff; margin:8px;}
    button {background:#7A68F2; color:#fff; border:none; padding:10px 25px; border-radius:6px; cursor:pointer;}
    button:hover {background:#937CFF;}
    .box {max-width:420px; margin:0 auto; border:1px solid #333; border-radius:10px; padding:25px; background:#1a1a1a;}
  </style>
  </head>
  <body>
    <div class="box">
      <h2>💰 Бонусный калькулятор</h2>
      <form method="POST" action="/calculate">
        💼 Ваша зарплата (₽):<br>
        <input type="number" name="salary" required><br>
        📈 Процент выполнения (%):<br>
        <input type="number" name="percent" required><br>
        <button type="submit">Рассчитать</button>
      </form>
    </div>
  </body>
  </html>
  `);
});

// Сервер считает результат
app.post("/calculate", (req, res) => {
  const salary = parseFloat(req.body.salary);
  const percent = parseFloat(req.body.percent);

  let coef = 0;
  if (percent < 70) coef = 0;
  else if (percent < 80) coef = 0.75;
  else if (percent < 90) coef = 0.9;
  else if (percent < 95) coef = 0.95;
  else if (percent < 100) coef = 1;
  else if (percent <= 105) coef = 1.1;
  else coef = 1.2;

  const bonus = salary * 0.3 * coef;
  const total = salary + bonus;

  res.send(`
  <html>
  <head>
  <meta charset="utf-8">
  <title>Результат</title>
  <style>
    body {font-family:Inter, sans-serif; background:#111; color:#eee; text-align:center; padding:40px;}
    .box {max-width:420px; margin:0 auto; border:1px solid #333; border-radius:10px; padding:25px; background:#1a1a1a;}
    a {color:#a991ff; text-decoration:none;}
    .num {color:#a991ff; font-weight:700;}
  </style>
  </head>
  <body>
    <div class="box">
      <h2>📊 Результат расчёта</h2>
      <p>Коэффициент: <span class="num">${coef.toFixed(2)}</span></p>
      <p>💵 Бонус: <span class="num">${bonus.toLocaleString("ru-RU")} ₽</span></p>
      <p>💰 Зарплата с бонусом: <span class="num">${total.toLocaleString("ru-RU")} ₽</span></p>
      <a href="/">← Новый расчёт</a>
    </div>
  </body>
  </html>
  `);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server running on port " + port));
