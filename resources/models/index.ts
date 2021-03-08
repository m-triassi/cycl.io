import {combineReducers} from 'redux'
import router from './router'
import InventoryItem from './inventory'
import VendorItem from './vendor'

const rootReducer = combineReducers({
    router,
    InventoryItem,
    VendorItem,
})

export default rootReducer
