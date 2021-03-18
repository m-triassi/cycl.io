import produce from 'immer'
import {message} from 'antd'
import {addOrder} from '../services/order'

export type OrderItemStateType = {
    id: number,
    data?: any,
    form: any
}

const initialState: OrderItemStateType = {
    id: 0,
    data: {},
    form: {
      supplier_id: 0,
      item_ids: [],
    },
}

const OrderItem = produce(
  (state, action) => {
    const {type, payload} = action
    switch (type) {
      case 'SET_ITEM_DETAIL_ID':
        state.id = payload
        break
      case 'SET_ORDER_DETAIL_DATA':
        state.data = payload
        state.form.item_ids.push({'inventory_item_id': payload.id, 'quantity': 1})
        break
      case 'SET_ORDER_DETAIL_FORM':
        state.form.item_ids[payload.key].quantity=payload.value.quantity
        state.form.supplier_id=payload.value.supplier_id
        break
      case 'ADD_ORDER':
        addOrder(state.form).then((response) => {
          const {data} = response
          if (data.success) {
            message.success('Purchase Order added')
          } else {
            message.error('Purchase Order failed to be added')
          }
        })
        break
      default:
        return state
    }
  },
  {...initialState},
)

export default OrderItem
