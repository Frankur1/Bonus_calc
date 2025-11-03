import express from "express";
const app = express();

// Главная страница с формой и расчётом
app.get("/", (req, res) => {
  const salary = parseFloat(req.query.salary) || "";
  const percent = parseFloat(req.query.percent) || "";
  let resultHTML = "";

  if (salary && percent) {
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

    resultHTML = `
      <div class="result">
        <h3>📊 Результат</h3>
        <p>Коэффициент: <b style="color:#a991ff;">${coef.toFixed(2)}</b></p>
        <p>💵 Бонус: <b style="color:#8fff8f;">${bonus.toLocaleString("ru-RU")} ₽</b></p>
        <p>💰 Зарплата с бонусом: <b style="color:#a991ff;">${total.toLocaleString("ru-RU")} ₽</b></p>
      </div>
    `;
  }

  res.send(`
  <html>
  <head>
    <meta charset="utf-8">
    <title>Бонусный калькулятор</title>
    <style>
      body {
        font-family: Inter, sans-serif;
        background: #111;
        color: #eee;
        text-align: center;
        padding: 40px;
      }
      .box {
        max-width: 420px;
        margin: 0 auto;
        background: #1a1a1a;
        border: 1px solid #333;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 0 20px rgba(122,104,242,0.2);
      }
      input {
        width: 80%;
        padding: 10px;
        margin: 10px 0;
        border-radius: 6px;
        border: 1px solid #444;
        background: #222;
        color: #fff;
        text-align: center;
      }
      button {
        background: linear-gradient(90deg,#7A68F2,#A991FF);
        color: #fff;
        border: none;
        padding: 10px 25px;
        border-radius: 8px;
        font-size: 1em;
        cursor: pointer;
        transition: 0.3s;
      }
      button:hover { transform: scale(1.05); }
      .result {
        margin-top: 25px;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        padding: 15px;
        border-radius: 8px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <h2>💰 Бонусный калькулятор</h2>
      <form method="get">
        💼 Зарплата (₽):<br>
        <input type="number" name="salary" value="${salary}" required><br>
        📈 Выполнение (%):<br>
        <input type="number" name="percent" value="${percent}" required><br>
        <button type="submit">Рассчитать</button>
      </form>
      ${resultHTML}
    </div>
  </body>
  </html>
  `);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server running on port " + port));
