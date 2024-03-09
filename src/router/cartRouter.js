
import { Router } from "express";
import { CartManager } from "../config/CartManager.js"; //En la ruta llamo a ese CartManager 
const cartManager = new CartManager('./src/data/cart.json')//Con esta direccion, que es donde esta alojado el carrito de mis productos 

const cartRouter = Router()

cartRouter.get('/', async (req, res) => {
    try {
        const cart = await cartManager.getCart()
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carrito: ${error}`)
    } //El Metodo "get" me devuelve todos los productos  
})

cartRouter.post('/:pid', async (req, res) => {
    try { //Actualizo la cantidad de mis productos, si no existe lo creo, si existe le aumento la cantidad
        const productId = req.params.pid //Envio id del producto
        const { quantity } = req.body //Envio quantity(Cantidad) del producto
        const mensaje = await cartManager.addProductByCart(productId, quantity)
        res.status(200).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear producto: ${error}`)
    } // Y el Metodo "Post" añiado un nuevo producto a mi array, envio un Id ( req.params.pid ) y envio en el body ( req.body )
})

export default cartRouter

//Tener en cuenta que si son varios carritos osea Complejiso este proyecto, seria la implementacion del Id como dice Coderhouse, aca resulta inecesario generar un Id si va a ser un carrito unico

