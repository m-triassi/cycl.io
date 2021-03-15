import {RouterStateType} from '../models/router'
import {InventoryItemStateType} from '../models/inventory'
import {InventoryDetailStateType} from '../models/inventory-detail'
import {VendorItemStateType} from '../models/vendor'

export type StoreType = {
    router: RouterStateType,
    InventoryItem: InventoryItemStateType,
    InventoryDetail: any,
    VendorItem: VendorItemStateType,
}

export type StoreType2 = {
    router: RouterStateType,
    InventoryDetail: InventoryDetailStateType
}

export type DispatchArgumentType = {
    type: string,
    payload?: any
}
