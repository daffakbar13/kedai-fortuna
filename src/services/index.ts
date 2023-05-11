import axios, { CreateAxiosDefaults } from 'axios'
import { responseInterceptor, errorInterceptor, requestInterceptor } from './interceptors'

export const defaultConfig: CreateAxiosDefaults = {
  headers: {
    msisdn: '628979618420',
    'originator-id': 'xyz',
    'device-id': 'xyz',
    'Accept-Language': 'id',
  },
}

export function fortunaService() {
  const newService = axios.create({
    ...defaultConfig,
  })
  newService.interceptors.response.use(responseInterceptor, errorInterceptor)
  newService.interceptors.request.use(requestInterceptor, errorInterceptor)

  return newService
}
