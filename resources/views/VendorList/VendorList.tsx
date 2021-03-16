import {Button, Col, Form, Input, DatePicker, Modal, Row, Table, Typography} from 'antd'
import React, {useEffect, useState} from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {VendorItemStateType} from 'models/vendor'
import {filterVendor, getVendor} from 'services/vendor'
import {DeleteButton} from '@components'

const StyledRow = styled(Row)`
    padding: 10px 0px;
`

type VendorListPropType = {
    dispatch: (arg: DispatchArgumentType) => void,
    VendorItem: VendorItemStateType
}

const VendorList = ({
    dispatch,
    VendorItem,
}: VendorListPropType) => {
    const {Item} = Form
    const {form, table} = VendorItem
    const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false)
    const { Text, Link } = Typography
    const changeFormData = (key: string, value: any) => dispatch({type: 'VENDOR_MATERIAL_CHANGE_FORM_DATA', payload: {key, value}})
    const resetState = () => dispatch({type: 'RESET_VENDOR_FORM_STATE'})
    const onFilterVendor = (value: string) => {
      filterVendor(value).then((response: any) => {
        const {data} = response
        if (data.success) {
          dispatch({type: 'SET_VENDOR_ITEM', payload: data.data})
        }
      })
    }
    const fetchVendorList = () => {
      getVendor().then((response: any) => {
        const {data} = response
        if (data.success) {
          dispatch({type: 'SET_VENDOR_ITEMS', payload: data.data})
        }
      })
    }
    const onSubmit = () => {
      dispatch({type: 'ADD_VENDOR'})
      fetchVendorList()
  }

    useEffect(() => {
      fetchVendorList()
    }, [])
    const addVendorModal = (
      <Modal
        visible={isCreateModalVisible}
        title='Add vendor item'
        onOk={() => {
            onSubmit()
            setIsCreateModalVisible(false)
            resetState()
        }}
        onCancel={() => {
            setIsCreateModalVisible(false)
            resetState()
        }}>
        <Item required label='Name'><Input data-cy='vendor-form-name' value={form.name} onChange={(e) => changeFormData('name', e.target.value)} /></Item>
        <Row>
          <Col span={12}>
            <Item required label='Partnership Start Date'><DatePicker data-cy='vendor-form-partnership-start-date' onChange={(value) => changeFormData('partnership_start_date', value)} /></Item>
          </Col>
          <Col span={12}>
            <Item required label='Partnership End Date'><DatePicker data-cy='vendor-form-partnership-end-date' onChange={(value) => changeFormData('partnership_end_date', value)} /></Item>
          </Col>
        </Row>
      </Modal>
    )
    const columns = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            render: (text: string, record: any) => (
              <Link href={`/Vendor/Suppliers/${record.id}`}>{text}</Link>
              )
        },
        {
            title: 'Partnership Start Date',
            key: 'partnership_start_date',
            dataIndex: 'partnership_start_date',
            render: (text: any) => `${text}`
        },
        {
          title: 'Partnership End Date',
          key: 'partnership_end_date',
          dataIndex: 'partnership_end_date',
          render: (text: any) => `${text}`
      },
      {
          title: 'Action',
          key: 'action',
          render: (text: any, record: any) => {
            const onDelete = ()=>{
              dispatch({type: 'DELETE_VENDOR', payload: record.id})
              fetchVendorList()
            }
            return (
              <DeleteButton type='Vendor' onDelete={onDelete} />
          )},
      },
    ]
    return (
      <>
        {addVendorModal}
        <Row><Typography.Title>Vendor</Typography.Title></Row>
        <Row>
          <Col span={8}>
            <StyledRow>
              <Button type='primary' onClick={() => setIsCreateModalVisible(true)} shape='round'>Add Vendor Item</Button>
            </StyledRow>
            <StyledRow>
              <Input
                onPressEnter={(e: any) => onFilterVendor(e.target.value)}
                placeholder='Search Vendor Item' />
            </StyledRow>
          </Col>
        </Row>

        <Table bordered columns={columns} dataSource={table} pagination={{position: ['bottomCenter']}} scroll={{x: 'max-content'}} />
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
    VendorItem: state.VendorItem,
})

VendorList.displayName = 'VendorList'
export default connect(mapStateToProps)(VendorList)
