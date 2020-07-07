import React, {useState} from 'react'

export const AddTransaction = () => {

    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);

    return (
        <>
            <h3>Add New Transaction</h3>
            <form>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" value={text} onChange={(e)=> setText(e.target.value)} placeholder="Enter Text..."></input>
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount <br/>
                    (Positive: Income, Negative: Expenses)
                    </label>
                    <input type="number" value={amount} onChange={(e)=> setAmount(e.target.value)} placeholder="Enter Amount..."></input>
                </div>
                <button  className="btn" type="submit">Add Transaction</button>
            </form>
        </>
    )
}
