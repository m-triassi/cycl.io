import produce from 'immer'
import {message} from 'antd'
import {cancelPayable, confirmPayable} from '../services/order'

export type OrderListStateType = {
  table: any,
}

const initialState: OrderListStateType = {
    table: [],
}

const OrderList = produce(
  (state, action) => {
    const {type, payload} = action
    switch (type) {
      case 'SET_ORDER_LIST':
        state.table = payload
        break
      case 'CONFIRM_PAYABLE':
        confirmPayable(payload).then((response)=>{
          const {data} = response
          if (data.success) {
            message.success('Payable confirmed')
          } else {
            message.error('Payable failed to be confirmed')
          }
        })
        break
      case 'CANCEL_PAYABLE':
        cancelPayable(payload).then((response)=>{
          const {data} = response
          if (data.success) {
            message.success('Payable cancelled')
          } else {
            message.error('Payable failed to be cancelled')
          }
        })
        break
      default:
        return state
    }
  },
  {...initialState},
)

export default OrderList