import {RouterStateType} from '../models/router'
import {InventoryItemStateType} from '../models/inventory'
import {InventoryDetailStateType} from '../models/inventory-detail'
import {BomMaterialStateType} from '../models/bom-material'


export type StoreType = {
    router: RouterStateType,
    InventoryItem: InventoryItemStateType,
    BomMaterial: BomMaterialStateType,
    InventoryDetail: InventoryDetailStateType
}


export type DispatchArgumentType = {
    type: string,
    payload?: any
}
