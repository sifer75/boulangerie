/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const ProductControllers = () => import('#controllers/products_controller')

// CRUD product
router.post('/product/create', [ProductControllers, 'createProduct'])
router.get('/product/get', [ProductControllers, 'getAllProducts'])
