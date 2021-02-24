import {RouterStateType} from '../models/router'
import {InventoryItemStateType} from '../models/inventory'

export type StoreType = {
    router: RouterStateType,
    InventoryItem: InventoryItemStateType
}

export type DispatchArgumentType = {
    type: string,
    payload?: any
}
