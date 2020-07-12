import React, {useContext, useEffect} from 'react';
import {GlobalContext} from '../context/GlobalState';
import { Transaction } from "./Transaction";


export const TransactionList = () => {
    const {transaction, getTransaction} = useContext(GlobalContext);

    useEffect(() => {
        getTransaction();
    },[]);
    
 
    return (
       <>
           <h3>History</h3>
           <ul id="list" className="list">
                {transaction.map((transaction) => <Transaction key={transaction._id} transaction={transaction} />
            )}
              
           </ul>
       </>
    )
}
