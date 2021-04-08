import {InventoryDetailStateType} from '@models/inventory-detail'
import {RouterStateType} from '@models/router'
import {InventoryItemStateType} from '@models/inventory'
import {BomMaterialStateType} from '@models/bom-material'
import {VendorItemStateType} from '@models/vendor'
import {OrderItemStateType} from '@models/order'
import {OrderListStateType} from '@models/order-list'
import {ReceivableListStateType} from '@models/receivable'
import {SaleItemStateType} from '@models/sale'

export type StoreType = {
    router: RouterStateType,
    InventoryItem: InventoryItemStateType,
    BomMaterial: BomMaterialStateType,
    InventoryDetail: InventoryDetailStateType,
    VendorItem: VendorItemStateType,
    SaleItem: SaleItemStateType,
    OrderItem: OrderItemStateType,
    OrderList: OrderListStateType,
    ReceivableList: ReceivableListStateType,
}

export type DispatchArgumentType = {
    type: string,
    payload?: any
}
