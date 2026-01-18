// app/api/uploadPhoto/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  const res = await fetch(
    process.env.API_URL + '/api/uploadPhoto',
    {
      method: 'POST',
      body: formData,
    }
  )

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
