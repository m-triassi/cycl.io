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
}

const initialState: BomMaterialStateType = {
    form: {
        assembly_id: 0,
        material_ids: [],
        quantities: [],
    },
    table: [],
}

const BomMaterial = produce(
  (state, action) => {
    const {type, payload} = action
    switch (type) {
      case 'SET_BOM_ITEMS':
        state.table = payload
        break
      case 'BOM_MATERIAL_CHANGE_FORM_DATA':
        state.form[payload.key] = payload.value
        break
      case 'RESET_BOM_FORM_STATE':
        state.form = initialState.form
        break
      case 'ADD_BOM':
        addBomMaterial(state.form)
        .then((response) => {
          const {data} = response
          if (data.success) {
            message.success('BOM material added')
          } else {
            message.error('BOM material failed to be added')
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
