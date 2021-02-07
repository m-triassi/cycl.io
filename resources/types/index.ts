import {RouterStateType} from '../models/router'

export type StoreType = {
    router: RouterStateType
}

export type DispatchArgumentType = {
    type: string,
    payload: any
}
