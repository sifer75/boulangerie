import type { HttpContext } from '@adonisjs/core/http'
import Product from '../models/product.js'

export default class ProductsController {
  async createProduct({ response, request }: HttpContext) {
    try {
      const { title, mardi, mercredi, jeudi, vendredi, samedi, dimanche }: Partial<Product> =
        request.only(['title', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'])
      const product = new Product()
      product.title = title
      product.mardi = mardi
      product.mercredi = mercredi
      product.jeudi = jeudi
      product.vendredi = vendredi
      product.samedi = samedi
      product.dimanche = dimanche

      await product.save()
      return response.status(201).json(product)
    } catch (e) {
      return response.status(500).json({ e: 'Produit non créé' })
    }
  }

  async getAllProducts({ response }: HttpContext) {
    try {
      const products = await Product.all()
      return response.status(200).json(products)
    } catch (e) {
      return response.status(500).json({ e: 'Produits non trouvés' })
    }
  }
}
