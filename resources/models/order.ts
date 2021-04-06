import produce from 'immer'

export type OrderItemFormDataType = {
  supplier_id: number,
  item_ids: [],
}

export type OrderItemStateType = {
    id: number,
    data?: any,
    form: OrderItemFormDataType
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
        state.form.supplier_id=payload.supplier_id
        break
      case 'SET_ORDER_QUANTITY_FORM':
        state.form.item_ids[payload.key].quantity=payload.value
        break
      default:
        return state
    }
  },
  {...initialState},
)

export default OrderItem
