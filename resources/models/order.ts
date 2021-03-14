import produce from 'immer'

export type OrderItemFormDataType = {
    type: string,
    orderId: number,
    inventoryId: number,
    quantity: number,
}

export type OrderItemStateType = {
  form: OrderItemFormDataType,
  table: any,
}

const initialState: OrderItemStateType = {
    form: {
        type: '',
        orderId: 0,
        inventoryId: 0,
        quantity: 0,
    },
    table: [],
}

const OrderItem = produce(
  (state, action) => {
    const {type, payload} = action
    switch (type) {
      case 'SET_ORDER':
        state.table = payload
        break
      case 'INVENTORY_MATERIAL_CHANGE_FORM_DATA':
        state.form[payload.key] = payload.value
        break
      case 'RESET_INVENTORY_FORM_STATE':
        state.form = initialState.form
        break
      case 'DELETE_ORDER':
        break
      case 'ADD_ORDER':
        break
      default:
        return state
    }
  },
  {...initialState},
)

export default OrderItem