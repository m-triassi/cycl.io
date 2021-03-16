import {combineReducers} from 'redux'
import router from './router'
import InventoryItem from './inventory'
import InventoryDetail from './inventory-detail'
import VendorItem from './vendor'

const rootReducer = combineReducers({
    router,
    InventoryItem,
    InventoryDetail,
    VendorItem,
})

export default rootReducer
