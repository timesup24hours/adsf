import passport from 'passport'
import { Product } from '../../db/models'
import { asyncRequest } from '../../util'
import inspector from 'schema-inspector'
const uuidV4 = require('uuid/v4');

import multer from 'multer'

const storage = multer.diskStorage({
  // destination: 'public/uploads/images',
  // destination: '../frontend/build/images/products',
  destination: process.env.NODE_ENV === 'production' ? '../frontend/build/images/products' : '../frontend/public/images/products',
  filename(req, file, cb) {
    cb(null, `${Math.random()}-${new Date()}-${file.originalname}`) // file name should be unique
    // cb(null, `${file.originalname}`) // test only
  },
})

const upload = multer({ storage })

export default (app) => {

  app.put('/api/eidt_product', passport.authenticate('local-jwt'), upload.any(), asyncRequest(async (req, res, next) => {

    let product = await Product.findOne({ _id: req.body.id, deleted: { $ne: true } })

    if(JSON.stringify(product.owner) !== JSON.stringify(req.user._id)) {
      res.status(400).json({ success: true, error: 'no right to edit' })
      return
    }

    if(req.files && req.files.length === 0 && JSON.parse(req.body.images).length === 0) {
      res.status(400).json({ error: 'images if required' })
      return
    }

    req.body.salePrice = req.body.salePrice.length === 0 ? 0 : parseInt(req.body.salePrice.split(',').join(''))
    req.body.price = parseInt(req.body.price.split(',').join(''))

    const validatedBody = validateAddProductBody(sanitizationProductBody(req.body).data)
    if(!validatedBody.valid) {
      res.status(400).json({ error: validatedBody.error })
      return
    }

    let newImages = []
    req.files.forEach(f => {
      newImages.push(f.filename)
    })

    product.name = req.body.name,
    product.brand = req.body.brand,
    product.price = req.body.price,
    product.salePrice = req.body.salePrice,
    product.listDesc = []
    req.body.listDesc.forEach((l, i) => {
      product.listDesc.push(l)
    })
    product.department = req.body.department
    product.subCategory = req.body.subCategory
    product.desc = req.body.desc,
    product.images = newImages.concat(JSON.parse(req.body.images)),
    product.category = req.body.category,
    product.stock = req.body.stock,
    product.numberOfStock = req.body.numberOfStock,
    product.onSale = req.body.onSale,
    product.size = req.body.size,
    product.soldBy = req.body.soldBy,
    product.owner = req.user._id,

    await product.save()

    res.status(200).json({ success: true, product })
  }))

}

const sanitizationProductBody = data => {

  const sanitization = {
    type: 'object',
    properties: {
      name: { type: 'string', rules: ['trim', 'title'], optional: false },
      brand: { type: 'string', rules: ['trim', 'title'], optional: false },
      desc: { type: 'string', rules: ['trim'], optional: false },
      listDesc: {
        type: 'array',
        splitWith: ',',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
        },
        optional: false,
      },
      price: { type: 'number', optional: false },
      salePrice: { type: 'number', optional: true, def: 0 },
      onSale: { type: 'boolean', optional: false },
      stock: { type: 'boolean', optional: true },
      numberOfStock: { type: 'number', optional: true, def: 0 },
      size: { type: 'string', optional: true },
      department: { type: 'string', optional: false },
      category: { type: 'string', optional: false },
      subCategory: { type: 'string', optional: false },
      soldBy: { type: 'string', optional: false },
    }
  }

  // Let's update the data
  return inspector.sanitize(sanitization, data)
}


const validateAddProductBody = (data) => {
  const body = JSON.stringify(data)
  var validation = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        // pattern: /^[0-9a-z_]{1,3}$/,
        optional: false,
      },
      brand: {
        type: 'string',
        minLength: 1,
        optional: false,
      },
      desc: {
        type: 'string',
        minLength: 2,
        optional: false,
      },
      listDesc: {
          type: 'array',
          minLength: 2,
          optional: false,
      },
      price: {
          type: 'number',
          gt: 0,
          optional: false,
      },
      salePrice: {
          type: 'number',
          optional: true,
      },
      onSale: {
          type: 'boolean',
          optional: false,
      },
      stock: {
          type: 'boolean',
          optional: true,
      },
      numberOfStock: {
          type: 'number',
          optional: true,
      },
      size: {
          type: 'string',
          optional: true,
      },
      department: {
          type: 'string',
          optional: false,
      },
      category: {
          type: 'string',
          optional: false,
      },
      subCategory: {
          type: 'string',
          optional: false,
          minLength: 1,
      },
      soldBy: {
          type: 'string',
          optional: false,
      },

      // gender: {
      //     type: 'string',
      //     pattern: /(male|female)$/
      // },
      // email: {
      //     type: 'string',
      //     pattern: 'email'
      // }
    }
  };

  return inspector.validate(validation, JSON.parse(body))
}
