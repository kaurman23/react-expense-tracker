import React, {createContext, useReducer} from "react";
import AppReducer from "./AppReducer";
import axios from "axios"

//Initial State
const initialState = {
    transactions: [
        ],
    error: null,
    loading: true
}

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Action
    async function getTransaction(){
        try {
            const res = await axios.get('/api/v1/transactions');
            dispatch({
                type: 'GET_TRANSACTION',
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
            
        }
    }


    async function deleteTransaction(id){
        try {
            await axios.delete(`/api/v1/transactions/${id}`);
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });

        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }
        
    }

    async function addTransaction(transaction){
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/v1/transactions', transaction, config);
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }
        
    }

    return(
        <GlobalContext.Provider value={
            { transaction: state.transactions,
            error: state.error,
            loading: state.loading,
            getTransaction,
            deleteTransaction,
            addTransaction}
            
        } >
            {children}
        </GlobalContext.Provider>
    )
}
