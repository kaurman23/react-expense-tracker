const Transaction = require("../models/Transaction");


//@desc get all transactions
//type ADD
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

//@desc add a transaction
//type POST
exports.addTransactions = async(req,res,next) => {
    try {
        const {text, body} = req.body;
        const transaction = await Transaction.create(req.body);

        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        if(error.name==="ValidationError")
        {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
              });
        }
    }
    


}

//@desc delete a transaction  
//type DELETE  /:id
exports.deleteTransactions =async (req,res,next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if(!transaction)
        {
            res.status(404).json({
                success: false,
                error: "No such transaction found"
            });
        }
        await Transaction.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            data: {}
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
          });
    }
}