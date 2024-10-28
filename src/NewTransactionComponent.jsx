import {useState, useRef, useEffect} from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { BsBackspaceFill } from "react-icons/bs";

import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';

const regex=/^[0-9.]+$/;

function NewTransaction({setNewTransaction, selectedCard, setSelectedCard, formatTime, cardBalance, setCardBalance, expense, setExpense, income, setIncome}) {
    const [currentDateBool, setCurrentDateBool] = useState(true);
    const [isExpense, setIsExpense] = useState(false);
    const [typeValues, setTypeValues] = useState([
        {value: "transportation", label: "Transportation"},
        {value: "healthcare", label: "Healthcare"},
        {value: "shopping", label: "Shopping"},
        {value: "taxes", label: "Taxes"},
        {value: "other", label: "Other"}
    ])
    const [selectedType, setSelectedType] = useState('');

    const [info, setInfo] = useState('');
    const [type, setType] = useState();
    const [amount, setAmount] = useState(0);
    const [icon, setIcon] = useState('default')

    const [date, setDate] = useState(new Date());
    const [customDate, setCustomDate] = useState('');
    
    const selectorRef = useRef();
    const infoRef = useRef();
    const amountRef = useRef();

    useEffect(()=>{
        const oneSecondInterval = setInterval(()=>{
            setDate(new Date())
        }, 1000);

        return () => {
            clearInterval(oneSecondInterval);
        }
    })

    useEffect(()=>{

    }, [])

    function handleSelectChange(event){
        setSelectedType(event.label)
        if (event.__isNew__ && event != null){
            const newValue = {value: (event.value).toLowerCase(), label: event.label};
            setTypeValues([...typeValues, newValue]);
        }
        setType(event.label);
    };
    
    function handleSelectDelete(){
        if (selectedType !== ''){
            const filteredTypeValues = typeValues.filter(i => (i.value).toLowerCase() != (selectedType).toLowerCase())
            selectorRef.current.setValue('');
            setTypeValues(filteredTypeValues);
            setSelectedType('');
        }
    };

    function verifyNewTransaction(e){
        e.preventDefault();
        let hasDate = false;
        const updatedCard = selectedCard
        let transactionToAdd = {}
        const currentDate = `${date.getFullYear()}-${formatTime(date.getMonth()+1)}-${formatTime(date.getDate())}`
        if (info.trim() == ''){
            infoRef.current.value = ''
            infoRef.current.style.borderStyle = "solid"
            infoRef.current.style.borderColor = "red"
        }
        if (!amount.match(regex)){
            amountRef.current.value = ''
            amountRef.current.style.borderStyle = "solid"
            amountRef.current.style.borderColor = "red"
        }
        if (info.trim() != '' && type != '' && amount.trim() != '' && Number(amount) > 0){
            updatedCard.transactionsData.map(i => {
                if (currentDateBool && currentDate === i.date || !currentDateBool && customDate === i.date){
                    hasDate = true;
                    transactionToAdd = {
                        "id": i.transactions.length ? i.transactions.length + 1 : 1,
                        "icon": icon,
                        "type": isExpense ? type : 'Income',
                        "amount": Number(amount),
                        "info": info,
                        "time": `${date.getFullYear()}T${formatTime(date.getHours())}:${formatTime(date.getMinutes())}:${formatTime(date.getSeconds())}`,
                        "expense": isExpense
                    }
                    i.transactions.push(transactionToAdd)

                    setCardBalance(isExpense ? cardBalance - Number(amount) : cardBalance + Number(amount));
                    isExpense ? setExpense(expense + Number(amount)): setIncome(income + Number(amount));
                } 
            })
            if (!hasDate){
                console.log('hasDate is false')
                transactionToAdd = {
                    "date": currentDateBool ? currentDate : customDate,
                    "transactions": [
                        {
                            "id": 1,
                            "icon": icon,
                            "type": isExpense ? type : 'Income',
                            "amount": Number(amount),
                            "info": info,
                            "time": `${date.getFullYear()}T${formatTime(date.getHours())}:${formatTime(date.getMinutes())}:${formatTime(date.getSeconds())}`,
                            "expense": isExpense
                        }
                    ]
                }
                updatedCard.transactionsData = [transactionToAdd, ...updatedCard.transactionsData]
                updatedCard.transactionsData.sort((a, b) => a.date < b.date)
                setCardBalance(isExpense ? cardBalance - Number(amount) : cardBalance + Number(amount));
                isExpense ? setExpense(expense + Number(amount)): setIncome(income + Number(amount));
                setSelectedCard(updatedCard)
            }
            setAmount('');
            amountRef.current.value = '';
            setInfo('');            
            infoRef.current.value = '';
            setNewTransaction(false)
        }
    }

    function handleInfoChange(event){
        setInfo(event.target.value)
    }
    function handleAmountChange(event){
        setAmount(event.target.value)
    }

    return(
        <>
            <div>
                <FaArrowLeft onClick={() => setNewTransaction(false)}/>
                <h2>New Transaction</h2>
                <button onClick={()=> setIsExpense(!isExpense)}>{isExpense ? "Expense" : "Income"}</button>
            </div>
            <form>
                <p>Icon:</p>
                <FaWallet/>
                {isExpense &&
                    <div >
                        <p>Type:</p>
                        <CreatableSelect required ref={selectorRef} isClearable options={typeValues} onChange={(e)=> handleSelectChange(e)}/>
                        <BsBackspaceFill onClick={() => handleSelectDelete()}/>
                    </div>                
                }
                <p>Info:</p>
                <input required type='text' placeholder='Info' onChange={(e) => handleInfoChange(e)} ref={infoRef} onClick={()=>{infoRef.current.placeholder = 'Info'; infoRef.current.style.borderColor = ""}}></input>
                <p>Amount:</p>
                <input required type='number' placeholder='Amount' onChange={(e) => handleAmountChange(e)} ref={amountRef} onClick={()=>{amountRef.current.placeholder = 'Amount'; amountRef.current.style.borderColor = ""}}></input>
                <div>
                    <p>Date:</p>
                    <button type='button' onClick={() => {setCurrentDateBool(!currentDateBool); currentDateBool && setDate(new Date)}}>Current</button>
                    {currentDateBool 
                    ? 
                        <>                    
                            <p>{`${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`}</p>
                            <p>{`${date.getHours()}:${formatTime(date.getMinutes())}:${formatTime(date.getSeconds())}`}</p>
                        </> 
                    : 
                        <div>
                            <input required min="2000-01-01" max='2050-01-01' type='date' onChange={(e) => {setCustomDate(e.target.value)}}></input>
                        </div> 
                    }
                </div>
                <button onClick={(e)=>verifyNewTransaction(e)}>Confirm</button>
            </form>
        </>
    )
}

NewTransaction.propTypes = {
    setNewTransaction: PropTypes.func,
    selectedCard: PropTypes.object,
    setSelectedCard: PropTypes.func,
    formatTime: PropTypes.func,
    cardBalance: PropTypes.number,
    setCardBalance: PropTypes.func,
    expense: PropTypes.number,
    setExpense: PropTypes.func,
    income: PropTypes.number,
    setIncome: PropTypes.func
}

export default NewTransaction
