import {connect} from 'react-redux'
import React, {useEffect, useState, ReactNodeArray} from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import {pathToRegexp} from 'path-to-regexp'
import {Button, Col, message, Row, Typography} from 'antd'
import {InventoryItemModal} from '@components'
import {editInventory, getInventoryDetail} from 'services/inventory'

type InventoryItemDetailPropType = {
    dispatch: (arg: DispatchArgumentType) => void,
    InventoryDetail: any,
    isDrawer: boolean,
    isOrderForm: boolean,
}

const InventoryItemDetail = ({
    dispatch,
    InventoryDetail,
    isDrawer,
    isOrderForm,
}: InventoryItemDetailPropType) => {
    const {Text} = Typography
    const {id, data, form} = InventoryDetail
    const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false)
    const fetchInventoryDetail = () => {
        getInventoryDetail(id).then((response: any) => {
            if (response.data.success) {
                dispatch({type: 'SET_INVENTORY_DETAIL_DATA', payload: response.data.data})
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
        }
    }, [id])
    const ignoredKeys = ['id', 'created_at' , 'updated_at']
    const toTitleText = (text: string) => {
        if (text.includes('_')) {
            const upperCaseText = text.charAt(0).toUpperCase() + text.slice(1)
            return upperCaseText.replace('_', ' ')
        }
        return text.charAt(0).toUpperCase() + text.slice(1)
    }
    const dataRow: ReactNodeArray = []
    if (data) {
        Object.entries(data).forEach(([key, value]: any) => {
            if (ignoredKeys.includes(key) || !value) return null
            dataRow.push(
              <Row>
                <Col span={isDrawer ? 12 : 6}><Text strong>{toTitleText(key).concat(':')}</Text></Col>
                <Col span={isDrawer ? 12 : 6}><Text>{value.toString()}</Text></Col>
              </Row>
            )
        })
    }
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
        {!isOrderForm && <Row style={{margin: 6}}>
          <Col span={6}>
            <Button block onClick={() => setIsEditModalVisible(true)} shape='round' type='ghost'>Edit</Button>
          </Col>
        </Row>}
        {dataRow}
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
    InventoryDetail: state.InventoryDetail,
})

InventoryItemDetail.displayName = 'InventoryItemDetail'
export default connect(mapStateToProps)(InventoryItemDetail)
