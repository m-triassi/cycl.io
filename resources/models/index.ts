import {combineReducers} from 'redux'
import router from './router'
import InventoryItem from './inventory'
import InventoryDetail from './inventory-detail'

const rootReducer = combineReducers({
    router,
    InventoryItem,
    InventoryDetail,
})

export default rootReducer
