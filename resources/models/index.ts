import {combineReducers} from 'redux'
import router from './router'
import InventoryMaterial from './inventory-material'

const rootReducer = combineReducers({
    router,
    InventoryMaterial,
})

export default rootReducer
