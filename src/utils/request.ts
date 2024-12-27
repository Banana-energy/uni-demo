import {
  type UnCanceledError,
  type UnConfig,
  type UnData,
  type UnError,
  type UnResponse,
  un,
} from '@uni-helper/uni-network'
import qs from 'qs'
import { useToast, } from 'wot-design-uni'
import to from 'await-to-js'

const interfaceConfig = {
  redirectCode: [ '302', '401', ],
  timeout: 60 * 1000,
}

enum ErrorMsgEnum {
  DEFAULT_ERROR = '未知错误，请稍后再试!',
  CLIENT_ERROR = '客户端出错，请稍后再试!',
  SERVER_ERROR = '服务器出错，请稍后再试!',
  LOGIN_ERROR = '登录过期，请重新登录!',
}

interface RequestConfig<T = UnData, D = UnData,> extends UnConfig<T, D> {
  notIncludeCode?: boolean
}

const toast = useToast()

const instance = un.create({
  baseURL: '',
  withCredentials: true,
  timeout: interfaceConfig.timeout,
  paramsSerializer(params,) {
    return qs.stringify(params, {
      arrayFormat: 'comma',
    },)
  },
} as RequestConfig,)

function handleError(msg?: string,) {
  const localMsg = msg || '未知错误，请稍后再试!'
  toast.error(localMsg,)
}

instance.interceptors.request.use(
  (config: RequestConfig,) => {
    toast.loading('加载中...',)
    return config
  },
  (error,) => {
    toast.close()
    handleError(ErrorMsgEnum.CLIENT_ERROR,)
    return Promise.reject(error,)
  },
)

instance.interceptors.response.use(
  (response,) => {
    toast.close()
    const {
      data,
      config,
    } = response as UnResponse<ResponseData<any>, UnData>
    if (config?.notIncludeCode) {
      return response
    }
    const { responseCode, } = data || {}
    if (data && responseCode && responseCode !== '0001') {
      if (interfaceConfig.redirectCode.includes(responseCode,)) {
        location.reload()
        return response
      }
      handleError(data.responseDesc || ErrorMsgEnum.DEFAULT_ERROR,)
      return response
    }
    return response
  },
  (error: UnError | UnCanceledError,) => {
    toast.close()
    if ('isUnCanceledError' in error) {
      return
    }
    handleError(error.message || ErrorMsgEnum.SERVER_ERROR,)
    return Promise.reject(error,)
  },
)

// 抽取通用请求逻辑
async function formatRequest<T,>(
  method: 'GET' | 'POST',
  config: UnConfig,
  headers?: Record<string, string>,
): Promise<T extends { data: infer U } ? U : T | undefined> {
  const [ error, response, ] = await to<UnResponse<T>>(
    instance.request({
      method,
      ...config,
      headers: {
        ...headers,
        ...config.headers,
      },
    },),
  )

  if (!error && response?.data) {
    // 判断数据是否包含 data 属性
    if (hasData(response.data,)) {
      return response.data.data as T extends { data: infer U } ? U : T
    }
    return response.data as T extends { data: infer U } ? U : T | undefined
  }

  return undefined as T extends { data: infer U } ? U : T | undefined
}

// 类型守卫函数，判断对象是否包含 data 属性
function hasData<T,>(data: T,): data is T & { data: unknown } {
  return typeof data === 'object' && data !== null && 'data' in data
}

// GET 请求方法
export function get<T,>(config: UnConfig,) {
  return formatRequest<T>('GET', config,)
}

// POST JSON 请求方法
export function postJSON<T,>(config: UnConfig,) {
  return formatRequest<T>('POST', config, {
    'Content-Type': 'application/json',
  },)
}

export function postFormData<T, >(config: UnConfig,) {
  return formatRequest<T>('POST', config, {
    'Content-Type': 'multipart/form-data',
  },)
}

export function postForm<T, >(config: UnConfig,) {
  return formatRequest<T>('POST', config, {
    'Content-Type': 'application/x-www-form-urlencoded',
  },)
}
