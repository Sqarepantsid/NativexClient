import axios from 'axios'

import env from '../../env/env'

export const addToCart = (data, id) => {
    dataorder = {
        menuId: data.id,
        transactionId: id,
        price: data.price,
        qty: 1,
        name: data.name,
        categoryId: data.categoryId,
        status: 0
    }
    return {
        type: "ADD_TO_ORDERS",
        payload: dataorder
    }
}

export const getCart = (transactionId) => {
    return {
        type: 'GET_CART',
        payload: axios.get(env.host + 'order/' + transactionId)
    }
}

export const getCartBack = (data) => {
    return {
        type: 'GET_CART_BACK',
        payload: data
    }
}

export const pushCart = (orders) => {
    return {
        type: 'PUSH',
        payload: axios.post(env.host + 'order', orders)
    }
}


export const UPDATE = (data, datapatch, datafix) => {
    return {
        type: 'UPDATE_ORDERS',
        payload: data,
        datapatch,
        datafix
    }
}

export const DELETE = (data, datapatch, datafix) => {
    return {
        type: 'DELETE_ORDERS',
        payload: data,
        datapatch,
        datafix
    }
}


export const RESET = () => {
    return {
        type: 'RESET_ORDERS'
    }
}

export const Increment = (data, datapatch, datafix) => {
    return {
        type: 'INCREMENT',
        payload: data,
        datapatch,
        datafix
    }
}


export const Decrement = (data, datapatch, datafix) => {
    return {
        type: 'DECREMENT',
        payload: data,
        datapatch,
        datafix
    }
}

export const Count = (data, datapatch, datafix) => {
    return {
        type: 'COUNT',
        payload: data,
        datapatch,
        datafix
    }
}