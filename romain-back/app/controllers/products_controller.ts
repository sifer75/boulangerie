import type { HttpContext } from '@adonisjs/core/http'
import Product from 'App/models/product.js'

export default class ProductsController {
  async createProduct({ response, request }: HttpContext) {
    try {
      const {
        title,
        mardi,
        mercredi,
        jeudi,
        vendredi,
        samedi,
        dimanche,
        total,
        paton,
        unit,
      }: Partial<Product> = request.only([
        'title',
        'mardi',
        'mercredi',
        'jeudi',
        'vendredi',
        'samedi',
        'dimanche',
        'total',
        'paton',
        'unit',
      ])
      const product = new Product()
      product.title = title
      product.mardi = mardi
      product.mercredi = mercredi
      product.jeudi = jeudi
      product.vendredi = vendredi
      product.samedi = samedi
      product.dimanche = dimanche
      product.total = total
      product.paton = paton
      product.unit = unit
      await product.save()
      return response.status(201).json(product)
    } catch (e) {
      return response.status(500).json({ e: 'Produits non trouvé' })
    }
  }
}
