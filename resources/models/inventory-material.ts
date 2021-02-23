import produce from 'immer'
import {message} from 'antd'
import {addInventory} from '../services/inventory'

export type InventoryMaterialFormDataType = {
    title: string,
    description: string,
    cost: number,
    sale_price: number,
    stock: number,
    category: string ,
    size: string,
    color: string,
    finish: string,
    material: string,
    part_number: string,
    lead_time: number,
    labour_cost: number,
}

export type InventoryMaterialStateType = {
  form: InventoryMaterialFormDataType,
  table: any
}

const initialState: InventoryMaterialStateType = {
    form: {
        title: '',
        description: '',
        cost: 0,
        sale_price: 0,
        stock: 0,
        category: '',
        size: '',
        color: '',
        finish: '',
        material: '',
        part_number: '',
        lead_time: 0,
        labour_cost: 0,
    },
    table: {}
}

const InventoryMaterial = produce(
  (state, action) => {
    const {type, payload} = action
    switch (type) {
      case 'INVENTORY_MATERIAL_CHANGE_FORM_DATA':
        state.form[payload.key] = payload.value
        break
      case 'RESET_INVENTORY_FORM_STATE':
        state.form = initialState.form
        break
      case 'ADD_INVENTORY':
        addInventory(state.form).then((response) => {
          const {data} = response
          if (data.success) {
            message.success('Inventory added')
          } else {
            message.error(data.error)
          }
        })
        break
      default:
        return state
    }
  },
  {...initialState},
)

export default InventoryMaterial
