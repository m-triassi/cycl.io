import {RouterStateType} from '../models/router'
import {InventoryItemStateType} from '../models/inventory'
import {BomMaterialStateType} from '../models/bom-material'
import {VendorItemStateType} from '../models/vendor'
import {SaleItemStateType} from '../models/sale'
import {OrderItemStateType} from '../models/order'
import {OrderListStateType} from '../models/order-list'

export type StoreType = {
    router: RouterStateType,
    InventoryItem: InventoryItemStateType,
    BomMaterial: BomMaterialStateType,
    InventoryDetail: any,
    VendorItem: VendorItemStateType,
    SaleItem: SaleItemStateType,
    OrderItem: OrderItemStateType,
    OrderList: OrderListStateType,
}

export type DispatchArgumentType = {
    type: string,
    payload?: any
}
