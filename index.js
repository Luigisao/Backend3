const fs = require("fs");
class ProductMananger {
  constructor(products) {
    this.path = products;
  }
  addProduct = async (title, description, price, thumbnail, stock, code) => {
    if ((title, description, price, thumbnail, stock, code)) {
      if (fs.existsSync(this.path)) {
        let info = await fs.promises.readFile(this.path, "utf-8");
        let resultado = JSON.parse(info);
        const codeCheck = resultado.find((el) => el.code == code);
        if (codeCheck) {
          console.log(
            `El código ya existe, porfavor agregue un producto valido.`
          );
        } else {
          if (resultado.length > 0) {
            let productId = resultado[resultado.length - 1].id + 1;
            let product = {
              id: productId,
              title,
              description,
              price,
              thumbnail,
              stock,
              code,
              date:  new Date().toLocaleDateString(),
            };
            resultado.push(product);

            await fs.promises.writeFile(
              this.path,
              JSON.stringify(resultado, null, 2)
            );
          }
        }
      } else {
        let product = {
          id: 1,
          title,
          description,
          price,
          thumbnail,
          stock,
          code,
          date:  new Date().toLocaleDateString(),
        };
        await fs.promises.writeFile(
          this.path,
          JSON.stringify([product], null, 2)
        );
      }
    } else {
      console.log(`Faltan detalles por agregar`);
    }
  };
  getProduct = async () => {
    if (fs.existsSync(this.path)) {
      let info = await fs.promises.readFile(this.path, "utf-8");
      let result = JSON.parse(info);
      return result;
    } else {
      console.log(`No hay ningún producto en la empresa`);
    }
  };
  getProductById = async (id) => {
    if (fs.existsSync(this.path)) {
      let info = await fs.promises.readFile(this.path, "utf-8");
      let result = JSON.parse(info);
      let mostrarProducto = result.find((product) => product.id == id);
      if (mostrarProducto) {
        return mostrarProducto;
      } else {
        `Not Found, producto no encontrado`;
      }
    } else {
      return `No hay ningún producto en la empresa`;
    }
  };
  uptadeProduct = async (id, propiedadActualizadas) => {
    if ((id, propiedadActualizadas)) {
      if (fs.existsSync(this.path)) {
        let info = await fs.promises.readFile(this.path, "utf-8");
        let resultado = JSON.parse(info);
        let encontrarProducto = resultado.find((product) => product.id == id);
        if (encontrarProducto) {
          const productUpdates = resultado.map((product) => {
            if (product.id == id) {
              return { ...product, ...propiedadActualizadas };
            }
            return product;
          });
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(productUpdates, null, 2)
          );
        } else {
          console.log(`El producto a actualizar no se ha encontrado`);
        }
      } else {
        console.log("No hay producto para agregar");
      }
    } else {
      console.log(`Completa todos los propiedades para actualizar el producto`);
    }
  };
  deleteProduct = async (id) => {
    if (fs.existsSync(this.path)) {
      if (id) {
        let info = await fs.promises.readFile(this.path, "utf-8");
        let result = JSON.parse(info);
        let eliminarProducto = result.filter((prod) => prod.id != id);
        result = eliminarProducto;
        await fs.promises.writeFile(this.path, JSON.stringify(result, null, 2));
      } else {
        console.log(`Porfavor coloca el id para eliminar el producto`);
      }
    } else {
      console.log(
        `No se pueden eliminar productos de la base de datos debido a que se encuentra vacia`
      );
    }
  };
}


const productos = new ProductMananger("productos.json");

module.exports.products = productos;