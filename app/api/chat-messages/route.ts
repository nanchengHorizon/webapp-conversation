import { type NextRequest } from 'next/server'
import { client, getInfo } from '@/app/api/utils/common'

export async function POST(request: NextRequest) {
  // console.log('0000000000000000000request', request)
  const body = await request.json()
  const {
    inputs,
    query,
    files,
    conversation_id: conversationId,
    response_mode: responseMode,
  } = body
  // console.log('1111111111111111111111request', request)
  const { user } = getInfo(request)
  console.log('222222222222222222222request', user)
  const res = await client.createChatMessage(inputs, query, user, responseMode, conversationId, files)
  // console.log('33333333333333333request', request)
  return new Response(res.data as any)
}
