import {combineReducers} from 'redux'
import router from './router'
import InventoryItem from './inventory'

const rootReducer = combineReducers({
    router,
    InventoryItem,
})

export default rootReducer
