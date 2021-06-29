const initialState = {
    isLoading: true,
    cart: [],
    cartFix: [],
    data: [],
    isSelected: false
}

export default function categories(state = initialState, action) {
    switch (action.type) {

        case 'ADD_TO_ORDERS':
            return {
                ...state,
                isLoading: false,
                cart: [...state.cart, action.payload],
                isSelected: true
            }

        case 'PUSH':
            return {
                ...state,
                isLoading: false,
                cart: [...state.cart, action.payload]
            }

        case 'GET_CART':
            return {
                ...state,
                isLoading: false,
                cart: action.payload.data
            }

        case 'GET_CART_BACK':
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }

        case 'RESET_ORDERS':
            return {
                ...state,
                cart: []
            }

        case 'DELETE_ORDERS':
            action.datafix.splice(action.datafix.findIndex(e => e.menuId == action.payload.menuId), 1);
            if (action.datafix.qty == 0) {
                return {
                    ...state,
                    cart: []
                }
            } else {
                return {
                    ...state,
                    cart: action.datafix
                }
            }

        case 'UPDATE_ORDERS':
            let dataOrders = action.datapatch.findIndex(y => y.menuId == action.payload.menuId)
            console.log(action.datapatch[dataOrders])
            let statusNew = { ...action.datapatch[dataOrders], status: 1 }
            action.datapatch = action.datapatch.splice(dataOrders, 1, statusNew)
            let dataStatus = [...action.datafix, statusNew]
            dataStatus.pop()
            return {
                ...state,
                cart: dataStatus
            }



        case 'INCREMENT':

            let dataincrement = action.datapatch.findIndex(y => y.menuId == action.payload.menuId)
            console.log(action.datapatch[dataincrement])
            let qtyNew = action.payload.qty + 1
            let dataincrementfix = { ...action.datapatch[dataincrement], qty: qtyNew }
            // let datafixDrink = { ...action.drink[dataDrink], selected: true }
            // console.warn(datafixDrink)

            action.datapatch = action.datapatch.splice(dataincrement, 1, dataincrementfix)
            let dataincrementNew = [...action.datafix, dataincrementfix]
            // // console.log(datamakananfix)
            // // console.log(datamakananfixbanget)
            dataincrementNew.pop()
            return {
                ...state,
                cart: dataincrementNew
            }


        case 'DECREMENT':

            let datadecrement = action.datapatch.findIndex(y => y.menuId == action.payload.menuId)
            console.log(action.datapatch[datadecrement])
            let qtyNewDec = action.payload.qty - 1
            let datadecrementfix = { ...action.datapatch[datadecrement], qty: qtyNewDec }
            // let datafixDrink = { ...action.drink[dataDrink], selected: true }
            // console.warn(datafixDrink)

            action.datapatch = action.datapatch.splice(datadecrement, 1, datadecrementfix)
            let datadecrementNew = [...action.datafix, datadecrementfix]
            // // console.log(datamakananfix)
            // // console.log(datamakananfixbanget)
            datadecrementNew.pop()
            return {
                ...state,
                cart: datadecrementNew
            }



        default:
            return state
    }
}