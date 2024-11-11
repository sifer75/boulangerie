import type { HttpContext } from '@adonisjs/core/http'
import Product from '../models/product.js'

export default class ProductsController {
  async createProduct({ response, request }: HttpContext) {
    try {
      const { title, mardi, mercredi, jeudi, vendredi, samedi, dimanche, paton }: Partial<Product> =
        request.only([
          'title',
          'mardi',
          'mercredi',
          'jeudi',
          'vendredi',
          'samedi',
          'dimanche',
          'paton',
        ])
      const product = new Product()
      product.title = title
      product.mardi = mardi
      product.mercredi = mercredi
      product.jeudi = jeudi
      product.vendredi = vendredi
      product.samedi = samedi
      product.dimanche = dimanche
      product.paton = paton
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

  async updateProduct({ response, request }: HttpContext) {
    try {
      const { id, title, mardi, mercredi, jeudi, vendredi, samedi, dimanche, paton } = request.only(
        ['id', 'title', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche', 'paton']
      )
      if (!id) {
        return response.status(400).json({ error: 'ID du produit manquant' })
      }
      const product = await Product.find(id)
      if (!product) {
        return response.status(404).json({ error: 'Produit non trouvé' })
      }
      product.title = title
      product.mardi = mardi
      product.mercredi = mercredi
      product.jeudi = jeudi
      product.vendredi = vendredi
      product.samedi = samedi
      product.dimanche = dimanche
      product.paton = paton
      await product.save()
      return response.status(200).json({
        product,
      })
    } catch (e) {
      return response.status(500).json({ e: 'Produit non modifié' })
    }
  }

  async DeleteProduct({ response, request }: HttpContext) {
    try {
      const { id } = request.only(['id'])
      if (!id) return response.status(404).json({ e: 'id non trouvé' })
      const product = await Product.find(Number(id))
      if (!product) return response.status(404).json({ e: 'produit non trouvé' })
      await product.delete()
      return response.status(200).json({ message: 'workspace supprimé avec succès' })
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la suppression du produit' })
    }
  }
}
