import produce from 'immer'
import {message} from 'antd'
import {addBomMaterial} from '../services/bom-material'

export type BomMaterialFormDataType = {
    assembly_id: number,
    material_ids: Array<number>,
    quantities: Array<number>,
}

export type BomMaterialStateType = {
  form: BomMaterialFormDataType,
  table: any,
  initialTable: any
}

const initialState: BomMaterialStateType = {
    form: {
        assembly_id: 0,
        material_ids: [],
        quantities: [],
    },
    table: [],
    initialTable: [],
}

const BomMaterial = produce(
  (state, action) => {
    const {type, payload} = action
    switch (type) {
      case 'SET_BOM_ITEMS':
        state.table = payload
        break
      case 'SET_INITIAL_BOM_ITEMS':
        state.table = payload
        state.initialTable = payload
        payload.forEach((item: { id: any; pivot: { quantity: any } }) =>{
          state.form.material_ids.push(item.id)
          state.form.quantities.push(item.pivot.quantity)
        })
        break
      case 'BOM_MATERIAL_PUSH_FORM_DATA':
        state.form[payload.key].push(payload.value)
        break
      case 'SET_BOM_ASSEMBLY_ID':
        state.form.assembly_id=payload
        break
      case 'BOM_MATERIAL_CHANGE_FORM_QUANTITY':
        state.form.quantities[payload.key]=payload.value
        break
      case 'DELETE_BOM':
        state.form.material_ids.splice(payload,1)
        state.form.quantities.splice(payload,1)
        break
      case 'RESET_BOM_STATE':
        state.form = initialState.form
        break
      case 'CANCEL_BOM':
        state.table = state.initialTable
        break
      case 'ADD_BOM':
        addBomMaterial(state.form)
        .then((response) => {
          const {data} = response
          if (data.success) {
            message.success('BOM material modified')
          } else {
            message.error('BOM material failed to be modified')
          }
        })
        break
      default:
        return state
    }
  },
  {...initialState},
)

export default BomMaterial
