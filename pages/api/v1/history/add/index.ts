// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Products } from '@fortuna/services/product/types'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body.data as Products[]
  const productItems = [...new Set(body.map((p) => p.productName))]
  const newHistoryData = productItems.map((p) => {
    const product = body.find((item) => item.productName === p)
    const quantity = body.filter((item) => item.productName === p).length
    return {
      product_category_id: product?.productCategoryId,
      product_name: product?.productName,
      price: product?.price,
      quantity,
    }
  })
  const now = new Date().toISOString()
  const historyPath = path.join(process.cwd(), 'public/data/history.json')
  const history = JSON.parse(fs.readFileSync(historyPath, 'utf-8'))
  const newHistory = {
    data: [
      ...history.data,
      {
        date: now,
        products: newHistoryData,
      },
    ],
  }
  fs.writeFileSync(historyPath, JSON.stringify(newHistory))

  const productPath = path.join(process.cwd(), 'public/data/product.json')
  const product = JSON.parse(fs.readFileSync(productPath, 'utf-8'))
  const newProduct = {
    data: (product.data as any[]).map((p) => {
      const quantity = body.filter((e) => e.productName === p.product_name).length
      return { ...p, stock: p.stock - quantity }
    }),
  }
  fs.writeFileSync(productPath, JSON.stringify(newProduct))

  res.status(200).json(newHistory)
}
