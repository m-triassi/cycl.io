import {RouterStateType} from '../models/router'
import {InventoryItemStateType} from '../models/inventory'
import {VendorItemStateType} from '../models/vendor'

export type StoreType = {
    router: RouterStateType,
    InventoryItem: InventoryItemStateType,
    InventoryDetail: any,
    VendorItem: VendorItemStateType,
}

export type DispatchArgumentType = {
    type: string,
    payload?: any
}
