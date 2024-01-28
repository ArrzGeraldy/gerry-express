import { Request, Response } from 'express'
import { createProductValidation, createUpdateProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import {
  addProductToDB,
  deleteProductById,
  getProductById,
  getProductFromDB,
  updateProductById
} from '../services/productService'
import { v4 as uuidv4 } from 'uuid'
// import ProductType from '../types/porduct.types'

export const getProduct = async (req: Request, res: Response) => {
  const products: any = await getProductFromDB()
  const {
    params: { id }
  } = req

  if (id) {
    const product = await getProductById(id)
    if (product) {
      logger.info('succes get product by id')
      return res.status(200).send({
        status: 200,
        type: true,
        data: product
      })
    } else {
      return res.status(400).send({
        status: 400,
        type: false,
        message: 'product not found',
        data: product
      })
    }
  } else {
    logger.info('Get all products succes')
    return res.status(200).send({
      status: 200,
      type: true,
      data: products
    })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4()
  const { error, value } = createProductValidation(req.body)

  // validation error
  if (error) {
    logger.error('ERR: product - create = ', error.details[0].message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
      data: {}
    })
  }

  try {
    await addProductToDB(value)
    logger.info('Add new product succees')
    return res.status(201).send({
      status: true,
      statusCode: 201,
      message: 'Add new product succees'
    })
  } catch (error) {
    logger.info('failed create product')
    logger.error(error)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
    })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req
  const { error, value } = createUpdateProductValidation(req.body)

  // validation error
  if (error) {
    logger.error('ERR: product - create = ', error.details[0].message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
      data: {}
    })
  }

  try {
    const result = await updateProductById(id, value)
    if (result) {
      logger.info('succes update product')
      return res.status(200).send({
        status: true,
        statusCode: 200,
        data: value
      })
    } else {
      logger.info('product not found')
      return res.status(404).send({
        status: false,
        statusCode: 404,
        message: 'product not found'
      })
    }
  } catch (error) {}
}

export const deleteProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const result = await deleteProductById(id)
    if (result) {
      logger.info('prodcut deleted')
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: 'succes deleted'
      })
    } else {
      logger.info('product not found')
      return res.status(404).send({
        status: false,
        statusCode: 404,
        message: 'product not found'
      })
    }
  } catch (error) {}
}
