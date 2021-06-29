'use strict'

const initialState = {
    isLoading: true,
    food: [],
    drink: [],
    dessert: [],
    error: null
}

const menus = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FOOD':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_FOOD_FULFILLED':
            const food = action.payload.data.map(item => ({
                ...item, selected: false
            }))
            return {
                ...state,
                isLoading: false,
                food
            }

        case 'GET_FOOD_REJECTED':
            return {
                ...state,
                isLoading: false,
                error: action.payload.message
            }

        // DRINK
        case 'GET_DRINK':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_DRINK_FULFILLED':
            const drink = action.payload.data.map(item => ({
                ...item, selected: false
            }))
            return {
                ...state,
                isLoading: false,
                drink
            }

        case 'GET_DRINK_REJECTED':
            return {
                ...state,
                isLoading: false,
                error: action.payload.message
            }

        case 'GET_DESSERT':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_DESSERT_FULFILLED':
            const dessert = action.payload.data.map(item => ({
                ...item, selected: false
            }))
            return {
                ...state,
                isLoading: false,
                dessert
            }

        case 'GET_DESSERT_REJECTED':
            return {
                ...state,
                isLoading: false,
                error: action.payload.message
            }



        case 'UPDATE_MAKANAN':
            let dataCart = action.food.findIndex(x => x.id == action.payload.id)

            let datafix = { ...action.food[dataCart], selected: true }

            action.food = action.food.splice(dataCart, 1, datafix)
            let datamakananfixbanget = [...action.foodfix, datafix]
            // console.log(datamakananfix)
            // console.log(datamakananfixbanget)
            datamakananfixbanget.pop()
            return {
                ...state,
                food: datamakananfixbanget
            }


        case 'UPDATE_MINUMAN':
            let dataDrink = action.drink.findIndex(x => x.id == action.payload.id)
            console.log(action.drink[dataDrink])

            let datafixDrink = { ...action.drink[dataDrink], selected: true }

            action.drink = action.drink.splice(dataDrink, 1, datafixDrink)
            let dataMinuman = [...action.drinkfix, datafixDrink]
            // console.log(datamakananfix)
            // console.log(datamakananfixbanget)
            dataMinuman.pop()
            return {
                ...state,
                drink: dataMinuman
            }


        case 'UPDATE_CEMILAN':
            let dataDessert = action.dessert.findIndex(x => x.id == action.payload.id)
            console.log(action.dessert[dataDessert])

            let datafixDessert = { ...action.dessert[dataDessert], selected: true }

            action.dessert = action.dessert.splice(dataDessert, 1, datafixDessert)
            let dataCemilan = [...action.dessertfix, datafixDessert]
            // console.log(datamakananfix)
            // console.log(dataCemilan)
            dataCemilan.pop()
            return {
                ...state,
                dessert: dataCemilan
            }


        case 'FALSE_MENU':
            let dataOrdersFix = action.menu.findIndex(y => y.id == action.payload.menuId)
            // console.warn(action.menu[dataOrdersFix])

            let statusNewOrders = { ...action.menu[dataOrdersFix], selected: false }
            action.menu = action.menu.splice(dataOrdersFix, 1, statusNewOrders)
            let dataStatusFix = [...action.menufix, statusNewOrders]
            dataStatusFix.pop()
            // console.log(action.menufix[dataStatusFix])
            return {
                ...state,
                food: dataStatusFix
            }


        case 'FALSE_DRINK':
            let dataDrinkFix = action.menu.findIndex(y => y.id == action.payload.menuId)
            // console.warn(action.menu[dataDrinkFix])

            let statusNewDrink = { ...action.menu[dataDrinkFix], selected: false }
            action.menu = action.menu.splice(dataDrinkFix, 1, statusNewDrink)
            let dataDrinkk = [...action.menufix, statusNewDrink]
            dataDrinkk.pop()
            // console.log(action.menufix[dataDrinkk])
            return {
                ...state,
                drink: dataDrinkk
            }


        case 'FALSE_DESSERT':
            let dataDessertFix = action.menu.findIndex(y => y.id == action.payload.menuId)
            // console.warn(action.menu[dataDessertFix])

            let statusNewDessert = { ...action.menu[dataDessertFix], selected: false }
            action.menu = action.menu.splice(dataDessertFix, 1, statusNewDessert)
            let dataStatuss = [...action.menufix, statusNewDessert]
            dataStatuss.pop()
            // console.log(action.menufix[dataStatuss])
            return {
                ...state,
                dessert: dataStatuss
            }




        default:
            return state
    }
}

export default menus