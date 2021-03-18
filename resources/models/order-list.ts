import produce from 'immer'

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
      default:
        return state
    }
  },
  {...initialState},
)

export default OrderList