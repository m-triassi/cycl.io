import {RouterStateType} from '../models/router'

export type StoreType = {
    router: RouterStateType,
    InventoryMaterial: any
}

export type DispatchArgumentType = {
    type: string,
    payload?: any
}
