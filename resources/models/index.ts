import {combineReducers} from 'redux'
import router from './router'
import InventoryItem from './inventory'
import InventoryDetail from './inventory-detail'
import BomMaterial from './bom-material'
import VendorItem from './vendor'
import SaleItem from './sale'
import ReceivableList from './receivable'
import OrderItem from './order'
import OrderList from './order-list'

const rootReducer = combineReducers({
    router,
    InventoryItem,
    InventoryDetail,
    BomMaterial,
    VendorItem,
    SaleItem,
    OrderItem,
    OrderList,
    ReceivableList,
})

export default rootReducer
