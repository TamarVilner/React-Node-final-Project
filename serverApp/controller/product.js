
const fs = require('fs');

function get(req, res) {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let product = data.find(st => st.id == id)

            if (product == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(product);
            }

        }


    })
}


exports.delete = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file.");
        }

        let id = req.params.id;
        let products = JSON.parse(data);
        let productIndex = products.findIndex(p => p.id == id);

        if (productIndex === -1) {
            return res.status(404).send("Product not found with ID " + id);
        }

        let newArrProduct = products.filter(p => p.id != id);

        fs.writeFile("products.json", JSON.stringify(newArrProduct, null, 2), (err) => {
            if (err) {
                res.status(500).send("Error deleting product.");
            } else {
                res.send(newArrProduct);
            }
        });
    });
}

exports.updateProduct = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("Error reading products file.");
            return;
        }

        let id = req.params.id;
        let products = JSON.parse(data);
        let index = products.findIndex(product => product.id == id);

        if (index === -1) {
            res.status(404).send("Product not found.");
            return;
        }

        // עדכן את המוצר עם הנתונים החדשים
        products[index] = { ...products[index], ...req.body };

        fs.writeFile("products.json", JSON.stringify(products), (err) => {
            if (err) {
                res.status(500).send("Error updating products.");
            } else {
                res.send(products[index]);
            }
        });
    });
};

// exports.post = (req, res) => {

//     fs.readFile("products.json", "utf-8", (err, data) => {
//         //המרה של טקסט למערך
//         let products = JSON.parse(data);
//         //body =  לתוכן שנשלח בפונקציה פןסט 
//         let product =req.body
//         // מוסיף איידי למוצר החדש 
//         product.id = products[products.length - 1]?.id + 1 || 1; // קביעת ID ייחודי
//         products.push(product);
//         fs.writeFile("products.json", JSON.stringify(products), (err) => {
//             if (err) {
//                 res.status(500).send("error  in add products ");
//             } else {
//                 res.send(product);
//             }
//         })
//     })
// }

exports.post = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file products ")
            return;
        }

        let products = JSON.parse(data);
        let newProduct = req.body;
        newProduct.id = products[products.length - 1]?.id + 1 || 1; // קביעת ID ייחודי
        products.push(newProduct);

        fs.writeFile("products.json", JSON.stringify(products), (err) => {
            if (err) {
                res.status(500).send("error in add products");
            } else {
                res.status(201).send("sucess add");
            }
        });
    });
}
//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
