class ProductManager {
    static ultiId = 0

    constructor(){
        this.products = [];
    };
    
    addProduct(title, description, price, img, code, stock){
        if (!title || !description || !price || !img || !code || !stock ){
            console.log("Todos los campos son hobligatorios para continuar ")
            return
        }

        if (this.products.some(item => item.code === code)){
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

    }

    getProducts(){
        console.log(this.products)
    }

    getProductById(id){
        const product = this.products.find(item => item.id === id)
        if (!product){
            console.log("Producto no encontrado")
        } else {
            console.log("Producto encontrado con éxito")
        }
        return product
    }
    
}

const manager = new ProductManager()

manager.getProducts()

manager.addProduct("product1", "detalles product1", 80, "imagen product1", "0001", 18)

//chequeando validaciones 

manager.addProduct("product1", "detalles product1", 80, "imagen product1", "0001", 18)

manager.addProduct("product1", "detalles product1", "imagen product1", "0001",)

//agregar nuevos productos

manager.addProduct("product2", "detalles product2", 150, "imagen product2", "0002", 5)
manager.addProduct("product3", "detalles product3", 10, "imagen product3", "0003", 2)
manager.addProduct("product4", "detalles product4", 15, "imagen product4", "0004", 1)
manager.addProduct("product5", "detalles product5", 90, "imagen product5", "0005", 8)

manager.getProducts()

//chequear getProductById

//producto encontrado con éxito 
manager.getProductById(3)

//producto no encontrado
manager.getProductById(8)







