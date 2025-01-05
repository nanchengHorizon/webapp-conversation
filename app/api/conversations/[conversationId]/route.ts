import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { client, getInfo, setSession } from '@/app/api/utils/common'

export async function DELETE(request: NextRequest, { params }: {
  params: { conversationId: string }
}) {
  const { conversationId } = params
  const { user } = getInfo(request)
  console.log('999999999999999999999999 \n\n\nn\n\n\nconversationId request', user)
  // auto generate name
  const { data } = await client.deleteConversation(conversationId, user)
  return NextResponse.json(data)
}

