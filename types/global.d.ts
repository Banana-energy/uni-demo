declare global {

  declare interface TtInterface {
    requestAccess: (options: {
      scopeList: any[]
      success: (res: { code: string }) => void | Promise<void>
      fail: (res: Error) => void | Promise<void>
    }) => void
  }

  declare const tt: TtInterface

  declare interface BasicResponseData {
    /** 返回标记：成功标记=0001，其余都是失败 */
    responseCode: '0001' | string
    /** 响应描述 */
    responseDesc: string
    /** 表示请求是否成功 */
    success: boolean
  }

  /**
   * 通用的响应数据类型。
   * 结合基本响应数据和泛型参数 T 指定的数据类型。
   * @template T 响应中的数据类型
   */
  declare type ResponseData<T, > = BasicResponseData & {
    data: T
  }

  /**
   * 基础分页信息接口。
   * 包含分页所需的基本属性。
   */
  declare interface BasicPage {
    /** 当前页码 */
    current: number
    /** 每页显示的记录数 */
    size: number
    /** 总记录数 */
    total: number
    /** 总页数 */
    pages?: number
  }

  /**
   * 分页请求参数的接口。
   * 用于指定分页请求的当前页和页大小。
   */
  declare interface PageParams {
    /** 当前页码 */
    current: number
    /** 每页显示的记录数 */
    size: number
  }
}

export {}
