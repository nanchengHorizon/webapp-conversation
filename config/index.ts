import type { AppInfo } from '@/types/app'
// export const APP_ID = `${process.env.NEXT_PUBLIC_APP_ID}`
// export const API_KEY = `${process.env.NEXT_PUBLIC_APP_KEY}`
// export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
export const API_URL = 'https://api.dify.ai/v1'

const initAppInfo = () => {
  const appinfog = process.env.NEXT_PUBLIC_APP_INFO
  if (appinfog) {
    return JSON.parse(appinfog);
  }
}

export let APP_INFO: AppInfo = initAppInfo()
export const APP_ID = APP_INFO.appId
export const API_KEY = APP_INFO.appKey

export const isShowPrompt = false
export const promptTemplate = 'I want you to act as a javascript console.'

export const API_PREFIX = '/api'

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_LEN = 48
