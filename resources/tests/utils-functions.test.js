import {
    numberFormatter,
    serializeItem,
    toTitleText,
    dataDisplay,
} from '../utils'

const number = 22.051
const toBeRoundedNumber = 22.049
const mockInventoryItem = {
    id: 1,
    supplier_id: 3,
    title: 'sequi',
    description:
        'Vero molestiae fugit eos laudantium. Hic distinctio nihil molestiae. Est veniam deleniti aut incidunt temporibus qui voluptates.',
    cost: 7836.97,
    sale_price: 1385.85,
    stock: 3,
    category: 'ea',
    size: 'architecto',
    color: 'LightGray',
    finish: 'delectus',
    material: 'et',
    part_number: '2411675fe7gi53a8h9d43gc62bj',
    lead_time: null,
    labour_cost: null,
    created_at: '2021-04-06T06:37:40.000000Z',
    updated_at: '2021-04-06T06:37:40.000000Z',
    minimum_stock: 2,
    is_below_minimum: false,
}

describe('util functions test', () => {
    it('numberFormatter test', () => {
        const expectedNumber = '22.05'
        const formattedNumber = numberFormatter(number)
        const formattedNumber2 = numberFormatter(toBeRoundedNumber)
        expect(formattedNumber).toBe(expectedNumber)
        expect(formattedNumber2).toBe(expectedNumber)
    })
    it('serializeItem test', () => {
        const expectedResult = '$22.05'
        const costResult = serializeItem('cost', number)
        const expectedNonCostResult = 'test title'
        const mockObj = {
            name: 'test title',
        }
        const nonCostResult = serializeItem('title', 'test title')
        const objResult = serializeItem('obj', mockObj)
        expect(costResult).toBe(expectedResult)
        expect(nonCostResult).toBe(expectedNonCostResult)
        expect(objResult).toBe(expectedNonCostResult)
    })
    it('toTitleText test', () => {
        const expectedResult0 = 'Sale price'
        const expectedResult1 = 'Cost'
        const testKey0 = 'sale_price'
        const testKey1 = 'cost'
        const result0 = toTitleText(testKey0)
        const result1 = toTitleText(testKey1)
        expect(result0).toBe(expectedResult0)
        expect(result1).toBe(expectedResult1)
    })
    it('dataDisplay test', () => {
        const dataRow = dataDisplay(mockInventoryItem, [])
        expect(dataRow).toHaveLength(16)
        dataRow.map((element) => {
            expect(element.key).toBeDefined()
        })
    })
})
