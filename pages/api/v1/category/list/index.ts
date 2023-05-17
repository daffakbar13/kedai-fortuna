// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const categoryPath = path.join(process.cwd(), 'public/data/category.json')
  const category = fs.readFileSync(categoryPath, 'utf-8')
  res.status(200).json(JSON.parse(category))
}
