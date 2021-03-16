import {RouterStateType} from '../models/router'
import {InventoryItemStateType} from '../models/inventory'
import {BomMaterialStateType} from '../models/bom-material'
import {VendorItemStateType} from '../models/vendor'
import {OrderItemStateType} from '../models/order'

export type StoreType = {
    router: RouterStateType,
    InventoryItem: InventoryItemStateType,
    BomMaterial: BomMaterialStateType,
    InventoryDetail: any,
    VendorItem: VendorItemStateType,
    OrderItem: OrderItemStateType,
}

export type DispatchArgumentType = {
    type: string,
    payload?: any
}
