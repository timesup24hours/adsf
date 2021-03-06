import passport from 'passport'
import { Product } from '../../db/models'
import { asyncRequest } from '../../util'

export default (app) => {

  app.get('/api/get_current_edit_product_by_owner/:id', passport.authenticate('local-jwt'), asyncRequest(async (req, res, next) => {

    let product = null

    product = await Product.findOne({ _id: req.params.id, deleted: { $ne: true } })

    if(!product) {
      res.status(400).json({ success: false, error: 'product has not found' })
      return
    }
    if(JSON.stringify(product.owner) !== JSON.stringify(req.user._id)) {
      res.status(400).json({ success: true, error: 'no right to edit' })
      return
    }

    res.status(200).json({ success: true, product })
  }))

}
