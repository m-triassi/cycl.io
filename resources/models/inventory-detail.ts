import produce from 'immer'

export type InventoryDetailStateType = {
    id: number,
    data?: any,
    form: any,
}

const initialState: InventoryDetailStateType = {
    id: 0,
    data: {},
    form: {}
}

const InventoryDetail = produce(
  (state, action) => {
    const {type, payload} = action
    switch (type) {
      case 'CHANGE_DETAIL_ID':
          state.id = payload
          break
      case 'SET_INVENTORY_DETAIL_DATA':
          state.data = payload
          break
      case 'INVENTORY_MATERIAL_EDIT_CHANGE_FORM_DATA':
        state.data[payload.key] = payload.value
        state.form[payload.key] = payload.value
        break
      case 'RESET_INVENTORY_ITEM_EDIT_FORM_STATE':
        state.form = initialState.form
        break
      default:
        return state
    }
  },
  {...initialState},
)

export default InventoryDetail
