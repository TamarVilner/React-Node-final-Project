
// const fs = require('fs');

// function get(req, res) {
//     fs.readFile("users.json", "utf-8", (err, data) => {
//         if (err) {
//             res.status(500).send("error read file users ")
//         } else {
//             res.send(JSON.parse(data));
//         }

//     })
// }
// //אפשרות ראשונה ליצא פונקציה מדף
// exports.getById = (req, res) => {

//     fs.readFile("users.json", "utf-8", (err, data) => {
//         if (err) {
//             res.status(500).send("error read file users ")
//         } else {
//             let id = req.params.id;

//             data = JSON.parse(data);
//             let user = data.find(st => st.id == id)

//             if (user == undefined) {
//                 res.status(500).send("not found student by tz " + id);
//             } else {
//                 res.send(user);
//             }

//         }


//     })
// }

// exports.login = (req, res) => {
//     fs.readFile("users.json", "utf-8", (err, data) => {
//         if (err) {
//             res.status(500).send("error read file users ")
//         } else {
//             let user = req.body
//             data = JSON.parse(data);
//             let currentUser = data.find(st => st.password == user.password)

//             if (currentUser == undefined) {
//                 res.status(500).send("user isn't exist!, please register");
//             } else {
//                 res.send(currentUser);
//             }

//         }

//     })
// }

// exports.post = (req, res) => {
//     fs.readFile("users.json", "utf-8", (err, data) => {
//         //המרה של טקסט למערך
//         let users = JSON.parse(data);
//         //body =  לתוכן שנשלח בפונקציה פןסט 
//         console.log(users[users.length - 1].id + 1)
//         // console.log(Number(users[users.length-1].id) + 1)
//         req.body.id = users[users.length - 1].id + 1
//         users.push(req.body);
//         fs.writeFile("users.json", JSON.stringify(users), (err) => {
//             if (err) {
//                 res.status(500).send("error  in add users ");
//             } else {
//                 res.send("sucess add");
//             }
//         })
//     })
// }
// //אפשרות שניה ליצא פונקציה מדף
// exports.get = get;
const fs = require('fs');

function get(req, res) {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            res.send(JSON.parse(data));
        }
    });
}

exports.getById = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            let id = req.params.id;
            data = JSON.parse(data);
            let user = data.find(st => st.id == id);

            if (!user) {
                res.status(404).send("not found student by id " + id);
            } else {
                res.send(user);
            }
        }
    });
}

exports.login = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            let user = req.body;
            data = JSON.parse(data);
            let currentUser = data.find(st => st.password == user.password);

            if (!currentUser) {
                res.status(401).send("user isn't exist!, please register");
            } else {
                res.send(currentUser);
            }
        }
    });
}

exports.post = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
            return;
        }

        let users = JSON.parse(data);
        let newUser = req.body;
        newUser.id = users[users.length - 1]?.id + 1 || 1; // קביעת ID ייחודי
        users.push(newUser);

        fs.writeFile("users.json", JSON.stringify(users), (err) => {
            if (err) {
                res.status(500).send("error in add users");
            } else {
                res.status(201).send("sucess add");
            }
        });
    });
}

// אפשרות שניה ליצא פונקציה מדף
exports.get = get;
