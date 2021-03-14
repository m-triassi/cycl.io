import produce from 'immer'

export type InventoryDetailStateType = {
    id: number,
    data?: any,
}

const initialState: InventoryDetailStateType = {
    id: 0,
    data: undefined
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
      default:
        return state
    }
  },
  {...initialState},
)

export default InventoryDetail
