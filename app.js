const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail", // используется сервис google
  auth: {
    user: "shafakhutd15a@gmail.com", // целевая почта, на которую будут приходить письма
    pass: "ygzp king jlqa ysru", 
  },
});

// Обработчик POST-запроса, который принимает данные формы
app.post("/send-email", (req, res) => {
  const { name, email, suggestions } = req.body;

  console.log(name, email, suggestions);

  const mailOptions = {
    from: "shafakhutd15a@gmail.com",
    to: "shafakhutd15a@mail.ru", 
    subject: "Новое сообщение с формы на сайте",
    text: `Вы получили новое сообщение с формы на сайте:

    Имя: ${name}
    Электронная почта: ${email}
    Сообщение: ${suggestions}
    
    Данное сообщение тестовое`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Ошибка при отправке письма");
    }
    res.status(200).json({ message: "Письмо успешно отправлено" });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
