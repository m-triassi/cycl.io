import {combineReducers} from 'redux'
import router from './router'
import InventoryItem from './inventory'
import InventoryDetail from './inventory-detail'
import BomMaterial from './bom-material'
import VendorItem from './vendor'

const rootReducer = combineReducers({
    router,
    InventoryItem,
    InventoryDetail,
    BomMaterial,
    VendorItem,
})

export default rootReducer
