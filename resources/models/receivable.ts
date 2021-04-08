import produce from 'immer'
import {message} from 'antd'
import {cancelReceivable, confirmReceivable} from '../services/receivable'

export type ReceivableListStateType = {
  table: any,
}

const initialState: ReceivableListStateType = {
    table: [],
}


const ReceivableList = produce(
  (state, action) => {
    const {type, payload} = action
    switch (type) {
      case 'SET_RECEIVABLE_LIST':
        state.table = payload
        break
      case 'SET_RECEIVABLE_STATUS':
        state.table = payload
        break
      case 'CONFIRM_RECEIVABLE':
        confirmReceivable(payload).then((response)=>{
          const {data} = response
          if (data.success) {
            message.success('Receivable confirmed')
          } else {
            message.error('Receivable failed to be confirmed')
          }
        })
        break
      case 'CANCEL_RECEIVABLE':
        cancelReceivable(payload).then((response)=>{
          const {data} = response
          if (data.success) {
            message.success('Receivable cancelled')
          } else {
            message.error('Receivable failed to be cancelled')
          }
        })
        break
      default:
        return state
    }
  },
  {...initialState},
)

export default ReceivableList
