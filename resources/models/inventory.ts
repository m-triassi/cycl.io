import produce from 'immer'
import {message} from 'antd'
import {addInventory, deleteInventory} from '../services/inventory'

export type InventoryItemFormDataType = {
    title: string,
    description: string,
    cost: number,
    sale_price: number,
    stock?: number,
    category?: string,
    size?: string,
    color?: string,
    finish?: string,
    material?: string,
    part_number?: string,
    lead_time?: number,
    labour_cost?: number,
}

export type InventoryItemStateType = {
  form: InventoryItemFormDataType,
  table: any,
}

const initialState: InventoryItemStateType = {
    form: {
        title: '',
        description: '',
        cost: 0,
        sale_price: 0,
        stock: undefined,
        category: undefined,
        size: undefined,
        color: undefined,
        finish: undefined,
        material: undefined,
        part_number: undefined,
        lead_time: undefined,
        labour_cost: undefined,
    },
    table: [],
}

const InventoryItem = produce(
  (state, action) => {
    const {type, payload} = action
    switch (type) {
      case 'SET_INVENTORY_ITEMS':
        state.table = payload
        break
      case 'INVENTORY_MATERIAL_CHANGE_FORM_DATA':
        state.form[payload.key] = payload.value
        break
      case 'RESET_INVENTORY_FORM_STATE':
        state.form = initialState.form
        break
      case 'DELETE_INVENTORY':
        deleteInventory(payload).then((response)=>{
          const {data} = response
          if (data.success) {
            message.success('Inventory deleted')
          } else {
            message.error('Inventory failed to be deleyed')
          }
        })
        break
      case 'ADD_INVENTORY':
        addInventory(state.form)
        .then((response) => {
          const {data} = response
          if (data.success) {
            message.success('Inventory added')
          } else {
            message.error('Inventory failed to be added')
          }
        })
        break
      default:
        return state
    }
  },
  {...initialState},
)

export default InventoryItem
