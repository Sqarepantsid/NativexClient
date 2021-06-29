import axios from 'axios'

import env from '../../env/env'

export const getFood = () => ({
    type: "GET_FOOD",
    payload: axios.get(env.host + "menus/" + 1)
})

export const getDrink = () => ({
    type: "GET_DRINK",
    payload: axios.get(env.host + "menus/" + 2)
})

export const getDessert = () => ({
    type: "GET_DESSERT",
    payload: axios.get(env.host + "menus/" + 3)
})

export const updateMenu = (item, food, foodfix) => ({
    type: "UPDATE_MAKANAN",
    payload: item,
    food: food,
    foodfix: foodfix
})

export const updateDrink = (item, drink, drinkfix) => ({
    type: "UPDATE_MINUMAN",
    payload: item,
    drink: drink,
    drinkfix: drinkfix
})

export const updateDessert = (item, dessert, dessertfix) => ({
    type: "UPDATE_CEMILAN",
    payload: item,
    dessert: dessert,
    dessertfix: dessertfix
})

export const FALSE = (item, menu, menufix) => {
    return {
        type: 'FALSE_MENU',
        payload: item,
        menu,
        menufix
    }
}

export const FALSE_DRINK = (item, menu, menufix) => {
    return {
        type: 'FALSE_DRINK',
        payload: item,
        menu,
        menufix
    }
}

export const FALSE_DESSERT = (item, menu, menufix) => {
    return {
        type: 'FALSE_DESSERT',
        payload: item,
        menu,
        menufix
    }
}
