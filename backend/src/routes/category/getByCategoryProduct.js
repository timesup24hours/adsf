import { Category, Product } from '../../db/models'
import { asyncRequest } from '../../util'

export default (app) => {

  app.get('/api/get_products_by_category/:category', asyncRequest(async (req, res, next) => {
    let products = null

    products = await Product.find({ category: req.params.category, deleted: { $ne: true } })

    if(products.length === 0) {
      res.status(400).json({ success: false, error: 'no such category' })
      return
    }

    res.status(200).json({ success: true, products })
  }))

}
