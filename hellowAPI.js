//const express = require ('express')();
//const app =express();
// const Joi = require ('joi');
const Joi = require('@hapi/joi');
const express = require ('express');
const app =express();
app.use(express.json());




//app.use(express.json())
const port = process.env.PORT || 8080 ;
app.listen(
    port,() => console.log(`it is live on http://localhost:${port}`)
    )

app.get('/cust_info',(req, res)=> {
    res.status(200).send({
        acc_number: '10002211623',
        cust_name: 'TinsaE Teka',
        acc_type: 'SAVING',
        acc_open_date: '12-03-18',
       
        balance: '60000'
    })
});


app.get('/',(req, res)=> {
    res.status(200).send({
       Hellow : 'FROM the  API team AT DASHEN BANK |'
     
    })
});

app.get('/trx_info', (req, res)=>{
    res.status(200).send({
        acc_number: '10002211623',
        cust_name: 'Tinsae Teka',
        acc_type: 'SAVING',
        acc_open_date: '12-03-18',
       
        trx_type: 'internet transfer',
        amount: '7000',
        date: '5-03-19',
        credited_acc: '51236494949',
        bank: 'CBE'


    })
});


app.get('/posts/:year/:month',(req, res)=> {
    res.status(200).send(req.params);
});

const transactions = [
  { id: 1, acc_n0: '5556425252474', balance:'25000', amount: '2000', currency : 'ETB' } , 
  { id: 2, acc_n0: '5022301252014',  balance:'25000', amount: '1000', currency : 'ETB' } , 
  { id: 3, acc_n0: '5532235322585',  balance:'25000', amount: '500', currency : 'USD' } , 
  { id: 4, acc_n0: '0002525555225',  balance:'25000',amount: '15000', currency : 'ETB' } , 

];


app.get('/transaction/:id',(req, res)=> {
    //res.status(200).send(req.params);
    let trx= transactions.find(c => c.id=== parseInt(req.params.id));
    if(!trx) res.status(404).send('record not found on the server. <br> 404');// 404
    res.send(trx); 
});

// all transactions
app.get('/transactions/',(req, res)=> {
    res.status(200).send(transactions);
});


const schema = Joi.object({
    acc_n0:Joi.string().min(10).required(),
   
});
// creating resources

//req ,res --- route handler || OR
app.post('/transactions', (req,res) => { 
    // if(req.body.acc_n0.length != 10){
    //     //400 bad request
    //     res.status(400).send('Account number is not valid. <br> Account number must be only ten (10) diigits');
    //     return;
    // }
    // if (!req.body.amount || !req.body.balance || !req.body.acc_n0 || !req.body.amount ){
    //     res.status(400).send('All fields are required. Acc_n0, balance, amount and currency');
    // }

    // joi
    // the shape of the object properties ... data tyoe... length...
    const { error } = schema.validate(req.body);

    // Error in response

    res.send(error.details[0].message);
    
 const transaction = {
     id : transactions.length + 1,
     acc_n0: req.body.acc_no,
     balance: req.body.balance,
     amount: req.body.amount,
     currency: req.body.currency
 };
 transactions.push(transaction);
 res.send(transaction);
});


app.put('/transaction/:id', (req, res) =>{

})











/*
all transactions  http://localhost:8080/transactions
one transaction detail http://localhost:8080/transaction/5/
unavilable resource on the server  http://localhost:8080/transaction/90/


*/
// const express = require ('express')();
// const app =express();
// // const app = require ('express')();
// const port  =8080;

// app.use(express.json())

// app.listen(
//     port,() => console.log('it is live on http://localhost:8080')
//     )

// app.get('/cust_info',(req, res)=> {
//     res.status(200).send({
//         acc_number: '10002211623',
//         cust_name: 'Tinsae Teka',
//         acc_type: 'SAVING',
//         acc_open_date: '12-03-18',
       
//         balance: '60000'
//     })
// });

// app.get('/trx_detail', (req, res)=>{
//     res.status(200).send({
//         acc_number: '10002211623',
//         cust_name: 'Tinsae Teka',
//         acc_type: 'SAVING',
//         acc_open_date: '12-03-18',
       
//         trx_type: 'internet transfer',
//         amount: '7000',
//         date: '5-03-19',
//         credited_acc: '51236494949',
//         bank: 'CBE'


//     })
// });

