import express from "express";
const app = express();

// Главная страница (ввод данных)
app.get("/", (req, res) => {
  const salary = req.query.salary || "";
  const percent = req.query.percent || "";
  let result = "";

  if (salary && percent) {
    const s = parseFloat(salary);
    const p = parseFloat(percent);

    let coef = 0;
    if (p < 70) coef = 0;
    else if (p < 80) coef = 0.75;
    else if (p < 90) coef = 0.9;
    else if (p < 95) coef = 0.95;
    else if (p < 100) coef = 1;
    else if (p <= 105) coef = 1.1;
    else coef = 1.2;

    const bonus = s * 0.3 * coef;
    const total = s + bonus;

    result = `
      <div class="res">
        <p>📊 Коэффициент: <b>${coef.toFixed(2)}</b></p>
        <p>💵 Бонус: <b>${bonus.toLocaleString("ru-RU")} ₽</b></p>
        <p>💰 Зарплата с бонусом: <b>${total.toLocaleString("ru-RU")} ₽</b></p>
      </div>`;
  }

  res.send(`
  <html>
  <head>
    <meta charset="utf-8">
    <title>Бонусный калькулятор</title>
    <style>
      body {font-family:Inter,sans-serif;background:#111;color:#eee;text-align:center;padding:40px;}
      input {width:80%;padding:10px;margin:8px;border-radius:6px;border:1px solid #444;background:#222;color:#fff;text-align:center;}
      button,a.btn {background:#7A68F2;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;display:inline-block;margin-top:10px;}
      button:hover,a.btn:hover {background:#9a84ff;}
      .box {max-width:420px;margin:0 auto;border:1px solid #333;border-radius:10px;padding:25px;background:#1a1a1a;}
      .res {margin-top:20px;line-height:1.7em;color:#bcb9ff;}
    </style>
  </head>
  <body>
    <div class="box">
      <h2>💰 Бонусный калькулятор</h2>
      <form method="get">
        💼 Зарплата (₽):<br>
        <input name="salary" type="number" value="${salary}" required><br>
        📈 Выполнение (%):<br>
        <input name="percent" type="number" value="${percent}" required><br>
        <button type="submit">Рассчитать</button>
      </form>
      ${result}
    </div>
  </body>
  </html>
  `);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server running on port " + port));
