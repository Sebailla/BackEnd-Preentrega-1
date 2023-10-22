import fs from 'fs'


class ProductManager {

    // Variables privadas
    static id;
    #path

    constructor(path) {
        this.#path = path
        this.products = this.#readFile()
        ProductManager.id = this.products.length > 0 ? this.products[this.products.length - 1].id : 0
    }

    #readFile() {
        let info
        try {
            if (fs.existsSync(this.#path)) {
                const data = fs.readFileSync(this.#path, 'utf8')
                return JSON.parse(data)
            } else {
                return []
            }
        } catch (error) {
            info = 'La base de datos no se puedo leer'
        }
        return info
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        let info
        //Confirmamos que el code no se repita
        const verifyCode = this.products.some(p => p.code === code)

        if (verifyCode) {
            info = `El código ${code} esta en uso`
        } else {

            //Validamos que todos los campos son obligatorios
            const newProduscts = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };

            if (!Object.values(newProduscts).includes(undefined)) {
                // Incrementams el id
                ProductManager.id++;
                this.products.push({
                    // Llamammos al id iautoincremental
                    id: ProductManager.id, ...newProduscts
                })
                fs.writeFileSync(this.#path, JSON.stringify(this.products))
                info = "Producto agregado corectamente..."

            } else {
                info = "Falta completar datos"
            }
        }
        return info
    }

    //Mostramos todos los productos
    getProduct() {
        return this.products;
    }

    //Mostramos los productos por ID
    getProductById(id) {
        const existId = this.products.find(prod => prod.id === id)
        return existId ? existId : false
        
    }

    //Actualizamos un producto
    updateProduct(id, properties) {
        let info

        const index = this.products.findIndex(i => i.id === id)

        if (index >= 0) {
            const { id, ...rest } = properties
            this.products[index] = { ...this.products[index], ...rest }
            fs.writeFileSync(this.#path, JSON.stringify(this.products))
            info = `El Producto con ID: ${index + 1}, se Actualizó correctamente`
        } else {
            info = `El Producto con ID: ${id}, no existe`
        }

        return info
    }

    // Eliminamos un Producto
    deleteProduct(id) {

        let info

        const index = this.products.findIndex(i => i.id === id)

        if (index >= 0) {
            this.products.splice(index, 1);
            fs.writeFileSync(this.#path, JSON.stringify(this.products))
            info = `El Producto con ID: ${id}, se eliminó correctamente`
        } else {
            info = `El Producto con ID: ${id}, no existe`
        }

        return info;
    }

}

export default ProductManager