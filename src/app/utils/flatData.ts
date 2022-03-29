interface IRouterData extends IRouterDataItem {
    children?: IRouterData[]
}

interface IRouterDataItem {
    key: string
    name: string
    component: JSX.Element
    router: string
}

/**
 * 扁平化数据
 * @param routerData - 树状路由数据
 * @returns 扁平化路由数据
 */
export default function flatData(routerData: IRouterData[]): IRouterDataItem[] {
    const arr: IRouterDataItem[] = []
    const handle = (data: IRouterData[]): void => {
        data.map(i => {
            arr.push(i)
            if (i.children) {
                handle(i.children)
            }
        })
    }
    handle(routerData)
    return arr
}

/**
 * 获取树状数据最顶层数据
 * @param routerData - 树状路由数据
 * @returns 路由对象
 */
export function firstData(routerData: IRouterData[]): IRouterDataItem {
    let obj: IRouterDataItem = {} as IRouterDataItem
    const handle = (data: IRouterData[]): void => {
        data.map((i, index) => {
            if (!index || data.length === 1) {
                obj = i
                if (i.children) {
                    if (i.children.length === 1 && i.children[0].router.indexOf(':') > -1) {
                        return
                    }
                    handle(i.children)
                }
            }
        })
    }
    handle(routerData)
    return obj
}
