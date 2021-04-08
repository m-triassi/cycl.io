import produce from 'immer'
import {message} from 'antd'
import {cancelSale, confirmSale} from '../services/sale'


export type ItemIdsFormDataType = {
  inventory_item_id: number,
  quantity: number,
}

export type SaleItemFormDataType = {
    item_ids: Array<ItemIdsFormDataType>,
    client_name: string,
    payment_type: string,
    card_number: string,
    cardholder_name: string,
    description?: string,
    price?:number
}

export type SaleItemStateType = {
  form: SaleItemFormDataType,
  table: any,
  materialsTable: any,
  tempPrice: number,
}

const initialState: SaleItemStateType = {
    form: {
        item_ids: [],
        client_name: '',
        payment_type: '',
        card_number: '',
        cardholder_name: '',
        description: undefined,
        price: undefined
    },
    table: [],
    materialsTable: [],
    tempPrice: 0
}

const SaleItem = produce(
  (state, action) => {
    const {type, payload} = action
    switch (type) {
      case 'SET_SALE_LIST':
        state.table = payload
        break
      case 'SET_SALE_ITEM_IDS':
        state.form.item_ids.push({inventory_item_id: payload, quantity: 1})
        break
      case 'DELETE_SALE_ITEM_ID':
        state.form.item_ids.splice(payload,1)
        break
      case 'SALE_MATERIAL_CHANGE_TEMP_PRICE':
        state.tempPrice=payload
        break
      case 'SET_SALE_QUANTITY_ITEM':
        state.form.item_ids.forEach((v: ItemIdsFormDataType) => {
          if (v.inventory_item_id===payload.id){
            v.quantity=payload.value
          }})
        break
      case 'SET_SALE_MATERIAL_ITEMS':
        state.materialsTable = payload
        break
      case 'SALE_MATERIAL_CHANGE_FORM_DATA':
        state.form[payload.key] = payload.value
        break
      case 'RESET_SALE_FORM_STATE':
        state.materialsTable=[]
        state.tempPrice=0
        state.form = initialState.form
        break
      case 'CONFIRM_SALE':
        confirmSale(payload).then((response)=>{
          const {data} = response
          if (data.success) {
            message.success('Sale confirmed')
          } else {
            message.error('Sale failed to be confirmed')
          }
        })
        break
      case 'CANCEL_SALE':
        cancelSale(payload).then((response)=>{
          const {data} = response
          if (data.success) {
            message.success('Sale cancelled')
          } else {
            message.error('Sale failed to be cancelled')
          }
        })
        break
      default:
        return state
    }
  },
  {...initialState},
)

export default SaleItem
