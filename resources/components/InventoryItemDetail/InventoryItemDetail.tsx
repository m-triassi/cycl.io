import {connect} from 'react-redux'
import React, {useEffect, useState} from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import {pathToRegexp} from 'path-to-regexp'
import {Button, Col, message, Row} from 'antd'
import {InventoryItemModal} from '@components'
import {editInventory, getInventoryDetail} from 'services/inventory'
import {getBomMaterial} from 'services/bom-material'
import {dataDisplay} from '@utils'

type InventoryItemDetailPropType = {
    dispatch: (arg: DispatchArgumentType) => void,
    InventoryDetail: any,
    isDrawer: boolean,
}

const InventoryItemDetail = ({
    dispatch,
    InventoryDetail,
    isDrawer,
}: InventoryItemDetailPropType) => {
    const {id, data, form} = InventoryDetail
    const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false)
    const fetchInventoryDetail = () => {
        getInventoryDetail(id).then((response: any) => {
            if (response.data.success) {
                dispatch({type: 'SET_INVENTORY_DETAIL_DATA', payload: response.data.data})
            }
        })
    }
    const fetchBomList = (inventoryId: number) => {
      getBomMaterial(inventoryId).then((response: any) => {
        if (response.data.success) {
          dispatch({type: 'RESET_BOM_STATE'})
          dispatch({type: 'SET_INITIAL_BOM_ITEMS', payload: response.data.data})
          dispatch({type: 'SET_BOM_ASSEMBLY_ID', payload: inventoryId})
        }
      })
    }
    useEffect(() => {
        if (!isDrawer) {
            const regexp = pathToRegexp('/Production/Inventory/(\\d+)')
            const IdString = regexp.exec(window.location.pathname)
            const pathId = IdString && parseInt(IdString[1])
            dispatch({type: 'CHANGE_DETAIL_ID', payload: pathId})
        }
        if (id !== 0 ) {
            fetchInventoryDetail()
            fetchBomList(id)
        }
    }, [id])
    const ignoredKeys = ['id', 'created_at' , 'updated_at', 'is_below_minimum']
    const dataRow = dataDisplay(data, ignoredKeys, {isDrawer})
    const onSubmit = () => {
        editInventory({id, data: form}).then((response) => {
            if (response.data.success) {
                message.success('Item edit successful')
                fetchInventoryDetail()
            }
        })
    }
    const resetState = () => {
        dispatch({type: 'RESET_INVENTORY_ITEM_EDIT_FORM_STATE'})
        fetchInventoryDetail()
    }
    const changeFormData = (key: string, value: any) => dispatch({type: 'INVENTORY_MATERIAL_EDIT_CHANGE_FORM_DATA', payload: {key, value}})
    return (
      <>
        <InventoryItemModal
          onSubmit={onSubmit}
          isVisible={isEditModalVisible}
          setIsVisible={setIsEditModalVisible}
          resetState={resetState}
          changeFormData={changeFormData}
          form={data}
          isCreate={false} />
        <Row style={{margin: 6}}>
          <Col span={6}>
            <Button block onClick={() => setIsEditModalVisible(true)} shape='round' type='ghost'>Edit</Button>
          </Col>
        </Row>
        {dataRow}
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
    InventoryDetail: state.InventoryDetail,
})

InventoryItemDetail.displayName = 'InventoryItemDetail'
export default connect(mapStateToProps)(InventoryItemDetail)
