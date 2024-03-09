import { promises as fs } from 'fs'

export class CartManager {
    constructor(path) {
        this.products = path
    }

    async getCart() {
        const cart = JSON.parse(await fs.readFile(this.products, 'utf-8'))
        return cart
    }//Lo unico que hace es consultar en donde se encuentra ese array de productos y te lo devuelve

    async addProductByCart(idProducto, quantityParam) { //Consulta por un (Id de producto y una cantidad) = idProducto y por una quantityParam 
        const cart = JSON.parse(await fs.readFile(this.products, 'utf-8'))//Lee lo que seria el cart.json

        const indice = cart.findIndex(product => product.id == idProducto)//Consulta si existe el elemento ( findIndex )

        if (indice != -1) { //Consulta si existe el aumento de la cantidad, consulto por el product.id, y por la cantidad comprada [indice].quantity
            cart[indice].quantity += quantityParam //5 + 5 = 10, asigno 10 a quantity
        } else {
            const prod = { id: idProducto, quantity: quantityParam } //Si no existe lo creo
            cart.push(prod)// Y lo añado en lo que seria en Json
        }
        await fs.writeFile(this.products, JSON.stringify(cart))//Luego si existe o no existe edito lo que seria el archivo Json
        return "Producto cargado correctamente"//Entonces Retorno producto añiadido correctamente 
    }

}



