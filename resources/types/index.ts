import {RouterStateType} from '../models/router'

export type StoreType = {
    router: RouterStateType,
    inventoryMaterial: any
}

export type DispatchArgumentType = {
    type: string,
    payload?: any
}
