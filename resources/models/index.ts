import {combineReducers} from 'redux'
import router from './router'
import InventoryItem from './inventory'
import InventoryDetail from './inventory-detail'
import BomMaterial from './bom-material'

const rootReducer = combineReducers({
    router,
    InventoryItem,
    InventoryDetail,
    BomMaterial
})

export default rootReducer
