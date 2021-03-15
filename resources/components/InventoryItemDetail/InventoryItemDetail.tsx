import {connect} from 'react-redux'
import React, {useEffect, useState} from 'react'
import {getInventoryDetail} from 'services/inventory'
import {StoreType, DispatchArgumentType} from '@types'
import {pathToRegexp} from 'path-to-regexp'

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
    const {id, data} = InventoryDetail
    // const [isEditState, setIsEditState] = useState<boolean>(false)
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

    return (
      <h1>hi inventory detail</h1>
    )
}

const mapStateToProps = (state: StoreType) => ({
    InventoryDetail: state.InventoryDetail,
})

InventoryItemDetail.displayName = 'InventoryItemDetail'
export default connect(mapStateToProps)(InventoryItemDetail)
