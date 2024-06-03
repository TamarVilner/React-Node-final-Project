
const fs = require('fs');

function get(req, res) {
    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getByUserId = (req, res) => {
    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("Error reading order file");
        } else {
            let id = req.params.id;
            data = JSON.parse(data);
            let orders = data.filter(order => order.idUser == id);

            if (orders.length === 0) {
                res.status(404).send("No orders found for user ID " + id);
            } else {
                res.send(orders);
            }
        }
    });
};

exports.updateOrder  = (req, res) => {

    fs.readFile("orders.json", "utf-8", (err, data) => {
        let id = req.params.id
        let orders = JSON.parse(data);
        // let newArrProduct = products.filter(i=> i.id != id)
        let index = products.findIndex(i=> i.id != id)
        orders.splice(index, 1, req.body)

        fs.writeFile("orders.json", JSON.stringify(orders), (err) => {
            if (err) {
                res.status(500).send("error  in add products ");
            } else {
                res.send(newArrProduct);
            }
        })
    })
}

// exports.post = (req, res) => {

//     fs.readFile("orders.json", "utf-8", (err, data) => {
//         //המרה של טקסט למערך
//         let orders = JSON.parse(data);
//         //body =  לתוכן שנשלח בפונקציה פןסט 
//         orders.push(req.body);
//         fs.writeFile("orders.json", JSON.stringify(orders), (err) => {
//             if (err) {
//                 res.status(500).send("error  in add order ");
//             } else {
//                 res.send("sucess add order");
//             }
//         })
//     })
// }

exports.post = (req, res) => {
    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file orders ")
            return;
        }

        let orders = JSON.parse(data);
        let newOrder = req.body;
        newOrder.id = orders[orders.length - 1]?.id + 1 || 1; // קביעת ID ייחודי
        orders.push(newOrder);

        fs.writeFile("orders.json", JSON.stringify(orders), (err) => {
            if (err) {
                res.status(500).send("error in add orders");
            } else {
                res.status(201).send("sucess add");
            }
        });
    });
}

exports.delete = (req, res) => {

    fs.readFile("orders.json", "utf-8", (err, data) => {
        let id = req.params.id
        let orders = JSON.parse(data);
        let newArrProduct = products.filter(i=> i.id != id)

        fs.writeFile("orders.json", JSON.stringify(newArrProduct), (err) => {
            if (err) {
                res.status(500).send("error  in add products ");
            } else {
                res.send(newArrProduct);
            }
        })
    })
}

//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
