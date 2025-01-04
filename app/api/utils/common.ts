import { API_KEY, API_URL, APP_ID } from '@/config'
import { ChatClient } from 'dify-client'
import { type NextRequest } from 'next/server'
import { v4 } from 'uuid'

const userPrefix = `user_${APP_ID}:`
// 获取用户id
export const initUser = (user: string) => {
  if (!user) {
    user = v4();
  }
  const userId = `${userPrefix}_${user}`;
  // console.log('init userId', userId);
  return userId;
}


export const getInfo = (request: NextRequest) => {
  let requestSession = request.cookies.get('session_id')
  let requestSessionId = ''
  if (requestSession) {
    requestSessionId = requestSession.value
  }

  const sessionId = requestSessionId || v4()
  const user = request.cookies.get('user_session_id')?.value || null

  console.log(`gggggggggggggggggggggggetInfo userId=${user} nexUrl=${request.nextUrl.href}`)

  if (!user) {
    throw new Error('User ID is not initialized. Please ensure the user is logged in.');
  }

  return {
    sessionId,
    user,
  }
}

export const setSession = (sessionId: string) => {
  return { 'Set-Cookie': `session_id=${sessionId}; path=/; SameSite=None; Secure;` }
}

export const client = new ChatClient(API_KEY, API_URL || undefined)
