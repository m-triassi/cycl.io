import produce from 'immer'

export type OrderItemStateType = {
    id: number,
    data?: any,
    form: any,
}

const initialState: OrderItemStateType = {
    id: 0,
    data: {},
    form: {}
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
        break
      default:
        return state
    }
  },
  {...initialState},
)

export default OrderItem
