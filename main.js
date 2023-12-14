const { error, clear } = require("console");

const fs = require("fs").promises


class ProductManager {
    static ultiId = 0

    constructor(path) {
        this.products = [];
        this.path = path
    };

    async addProduct(nuevoObjeto) {

        let { title, description, price, img, code, stock } = nuevoObjeto

        if (!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son hobligatorios para continuar ")
            return
        }

        if (this.products.some(item => item.code === code)) {
            console.log("El codigo tiene que ser unico")
            return
        }

        const newProduct = {
            id: ++ProductManager.ultiId,
            title,
            description,
            price,
            img,
            code,
            stock
        }

        this.products.push(newProduct)

        await this.guardarArchivo(this.products)

    }

    getProducts() {
        console.log(this.products)
    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo()
            const buscar = arrayProductos.find(item => item.id === id)
            if (!buscar) {
                console.log("Producto no encontrado")
            } else {
                console.log("Producto encontrado con éxito")
                return buscar
            }

        } catch {
            console.log("error al leer el archivo", error)
        }

    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8")
            const arrayProductos = JSON.parse(respuesta)
            return arrayProductos

        } catch (error) {
            console.log("Error al leer el archivo", error)
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2))

        } catch (error) {
            console.log("Error al guardar el archivo", error)
        }
    }


    async updateProduct(id, productoActualizado) {
        try {
            const arrayProductos = await this.leerArchivo()
            const index = arrayProductos.findIndex(item => item.id === id)
            if (index !== -1) {
                arrayProductos.splice(index, 1, productoActualizado)
                await this.guardarArchivo(arrayProductos)
            } else {
                console.log("No se encontro el producto")
            }
        } catch (error) {
            console.log("Error al actualizar el producto", error)
        }
    }

    async borrarProducto(id) {
        try {
            const arrayProductos = await this.leerArchivo()
            const index = arrayProductos.findIndex(item => item.id === id)
            if (index !== -1) {
                arrayProductos.splice(index, 1)
                await this.guardarArchivo(arrayProductos)
            } else {
                console.log("No se encontro el producto")
            }
        } catch (error) {
            console.log("Error al eliminar el producto", error)
        }
    }

}

const manager = new ProductManager("./productos.json")

manager.getProducts()

const videoJuego1 = {
    title: "Zelda",
    description: "Ultima dentrega del Zelda",
    price: 100,
    img: "imagen de Link",
    code: "0001",
    stock: 80
}

const videoJuego2 = {
    title: "Call of duty",
    description: "Ultima parche implementado",
    price: 120,
    img: "imagen de portada",
    code: "0002",
    stock: 200
}

const chequeoValidaciones = {
    //sin tittle
    description: "Ultima parche implementado",
    price: 120,
    img: "imagen de portada",
    code: "0002",
    stock: 200
}

manager.addProduct(videoJuego1)
manager.addProduct(videoJuego2)

//chequeando validaciones 
//mismo code
manager.addProduct(videoJuego1)

//  que todos los campos se cumplan

manager.addProduct(chequeoValidaciones)

manager.getProducts()

async function testBusquedaId() {
    const buscado = await manager.getProductById(2)
    console.log(buscado)
}

testBusquedaId()

const videojuego3 = {
    id: 1,
    title: "Super Mario",
    description: "El nuevo mundo de Mario",
    price: 90,
    img: "imagen de Mario",
    code: "0001",
    stock: 80
}

async function testActualizar() {
    await manager.updateProduct(1, videojuego3)
}

testActualizar()


async function testBorrar() {
    await manager.borrarProducto(1)
}

testBorrar()







