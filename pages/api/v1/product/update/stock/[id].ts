// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const productPath = path.join(process.cwd(), 'public/data/product.json')
  const product = JSON.parse(fs.readFileSync(productPath, 'utf-8'))
  fs.writeFileSync(
    productPath,
    JSON.stringify({
      data: [...product.data].map((d, i) => ({
        ...d,
        stock: i === Number(req.query.id as string) ? d.stock - 1 : d.stock,
      })),
    }),
  )
  res.status(200).json(product)
}
