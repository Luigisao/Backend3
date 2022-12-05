const use = require("./index.js");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));



app.get("/products", async (req, res) => {
  const productos = await use.products.getProduct();
  if (req.query.limit <= productos.length && req.query.limit > 0) {
    res.send(productos.slice(0, req.query.limit));
  } else if (req.query.limit) {
    res.send(
      `<h1>El limite de productos no puede ser 0 ni mayor a los productos dados, productos actuales:</h1> <br> ${productos.map(
        (p) => `<h2>${p.title}</h2>`
      )}`
    );
  } else {
    res.send(productos);
  }
});

app.get("/products/:pid", async (req, res) => {
  let producto = await use.products.getProductById(req.params.pid);
  producto
    ? res.send(producto) : res.send(`<h1>El Id no existe</h1>`);
});

app.listen(8080, () => {
  console.log(`Servidor conectado`);
});
