import {RouterStateType} from '../models/router'
import {InventoryItemStateType} from '../models/inventory'
import {BomMaterialStateType} from '../models/bom-material'

import {VendorItemStateType} from '../models/vendor'

export type StoreType = {
    router: RouterStateType,
    InventoryItem: InventoryItemStateType,
    BomMaterial: BomMaterialStateType,
    InventoryDetail: any,
    VendorItem: VendorItemStateType,
}


export type DispatchArgumentType = {
    type: string,
    payload?: any
}
