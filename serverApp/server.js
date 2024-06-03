// const express = require('express');
// const user = require('./router/user')
// const product = require('./router/product')
// const order = require('./router/order')
// const app = express();
// const cors = require('cors')
// const bodyParser = require('body-parser')
// const fs = require('fs');

// app.use(cors())
// //הוספתי
// app.use(express.json());
// //
// app.listen(4000, () => {
//     console.log("listen port 4000");
// })

// // parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));


// app.use((req, res, next) => {

//     let text = new Date().toGMTString() + "  : " + req.url + '\n';
//     fs.appendFile("log.txt", text, () => {
//         next();
//     })
// })
// app.get('/', (req, res) => {
//     res.send("hello world");
// })

// app.get('/person', (req, res) => {
//     res.send("hello world person");
// })

// // app.use("/student", student);

// app.use("/product", product);
// app.use("/order", order);
// app.use("/user", user);

// app.use((req, res, next) => {

//     let text = new Date().toGMTString() + "  : " + req.url + '\n';
//     fs.readFile("404.html", 'utf-8', (err, data) => {
//         res.status(404).send(data);
//     })
// })



//CHET GPT
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const user = require('./router/user');
const product = require('./router/product');
const order = require('./router/order');

const app = express();
const port = 4000;

// שימוש ב-CORS
app.use(cors());

// שימוש ב-body-parser כדי לפרש את התוכן של בקשות POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware לכתיבת לוג
app.use((req, res, next) => {
  const text = new Date().toGMTString() + "  : " + req.url + '\n';
  fs.appendFile("log.txt", text, () => {
    next();
  });
});

// הגדרת המסלולים
app.use("/user", user);
app.use("/product", product);
app.use("/order", order);

// מסלול ברירת מחדל עבור דף ראשי
app.get('/', (req, res) => {
  res.send("hello world");
});

app.get('/person', (req, res) => {
  res.send("hello world person");
});

// טיפול ב-404
app.use((req, res) => {
  fs.readFile("404.html", 'utf-8', (err, data) => {
    res.status(404).send(data);
  });
});

// הפעלת השרת
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
