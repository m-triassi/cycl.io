import produce from 'immer'
import {message} from 'antd'
import {addVendor, deleteVendor} from '../services/vendor'

export type VendorItemFormDataType = {
    name: string,
    partnership_start_date: any,
    partnership_end_date: any,
}

export type VendorItemStateType = {
  form: VendorItemFormDataType,
  table: any,
}

const initialState: VendorItemStateType = {
    form: {
        name: '',
        partnership_start_date: undefined,
        partnership_end_date: undefined,
    },
    table: [],
}

const VendorItem = produce(
  (state, action) => {
    const {type, payload} = action
    switch (type) {
      case 'SET_VENDOR_ITEMS':
        state.table = payload
        break
      case 'VENDOR_MATERIAL_CHANGE_FORM_DATA':
        state.form[payload.key] = payload.value
        break
      case 'RESET_VENDOR_FORM_STATE':
        state.form = initialState.form
        break
      case 'DELETE_VENDOR':
        deleteVendor(payload).then((response)=>{
          const {data} = response
          if (data.success) {
            message.success('Vendor deleted')
          } else {
            message.error('Vendor failed to be deleted')
          }
        })
        break
      case 'ADD_VENDOR':
        addVendor(state.form)
        .then((response) => {
          const {data} = response
          if (data.success) {
            message.success('Vendor added')
          } else {
            message.error('Vendor failed to be added')
          }
        })
        break
      default:
        return state
    }
  },
  {...initialState},
)

export default VendorItem
