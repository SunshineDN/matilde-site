import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// Configurar o S3 Client para o MinIO
const s3Client = new S3Client({
  endpoint: `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`,
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
  },
  forcePathStyle: true,
})

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME || 'uploads'

export async function POST(request) {
  try {
    const formData = await request.formData()
    
    const user_email = formData.get('user_email')
    const slug = formData.get('slug')
    const partner_name = formData.get('partner_name')
    const phrasesStr = formData.get('phrases')
    const photos = formData.getAll('photos') // Array of File objects
    const music = formData.get('music') // File object or null

    if (!user_email || !slug || !partner_name) {
      return NextResponse.json({ error: 'Faltam dados obrigatórios' }, { status: 400 })
    }

    // Verificar se o slug já existe
    const existing = await prisma.page.findUnique({
      where: { slug }
    })

    if (existing) {
      return NextResponse.json({ error: 'Esse link já está em uso, escolha outro.' }, { status: 400 })
    }

    const phrases = phrasesStr ? JSON.parse(phrasesStr) : []
    const imageUrls = []
    let musicUrl = null

    // Função auxiliar para upload pro MinIO
    const uploadFile = async (file, folder) => {
      const buffer = Buffer.from(await file.arrayBuffer())
      const extension = file.name.split('.').pop()
      const fileName = `${folder}/${uuidv4()}.${extension}`
      
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      })
      
      await s3Client.send(command)
      // Como o bucket é público, podemos gerar a URL direta (no MinIO o formato com forcePathStyle é endpoint/bucket/key)
      return `http://localhost:9000/${BUCKET_NAME}/${fileName}`
    }

    // Fazer upload das fotos
    for (const photo of photos) {
      if (photo && photo.size > 0) {
        const url = await uploadFile(photo, 'photos')
        imageUrls.push(url)
      }
    }

    // Fazer upload da música
    if (music && music.size > 0) {
      musicUrl = await uploadFile(music, 'music')
    }

    // Salvar no Prisma
    const newPage = await prisma.page.create({
      data: {
        slug,
        user_email,
        partner_name,
        phrases,
        images: imageUrls,
        music_url: musicUrl,
        payment_status: 'pending',
      }
    })

    return NextResponse.json({ success: true, page: newPage })

  } catch (error) {
    console.error('Erro na API:', error)
    return NextResponse.json({ error: 'Erro interno ao criar a página' }, { status: 500 })
  }
}
