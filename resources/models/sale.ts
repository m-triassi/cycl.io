import produce from 'immer'
import {message} from 'antd'
import {addSale} from '../services/sale'

export type SaleItemFormDataType = {
    client_name: string,
    status: string,
    payment_type: string,
    card_number: string,
    cardholder_name: string,
    price: number,
    description: string,
}

export type SaleItemStateType = {
  form: SaleItemFormDataType,
  table: any,
}

const initialState: SaleItemStateType = {
    form: {
        client_name: '',
        status: '',
        payment_type: '',
        card_number: '',
        cardholder_name: '',
        price: 0,
        description: '',
    },
    table: [],
}

const SaleItem = produce(
  (state, action) => {
    const {type, payload} = action
    switch (type) {
      case 'SET_SALE_ITEMS':
        state.table = payload
        break
      case 'SALE_MATERIAL_CHANGE_FORM_DATA':
        state.form[payload.key] = payload.value
        break
      case 'RESET_SALE_FORM_STATE':
        state.form = initialState.form
        break
      case 'ADD_SALE':
        addSale(state.form)
        .then((response) => {
          const {data} = response
          if (data.success) {
            message.success('Sale added')
          } else {
            message.error('Sale failed to be added')
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
