import { FaArrowLeft } from "react-icons/fa";
// import Select from 'react-select';
import PropTypes from 'prop-types';

import {useRef, useState, useEffect} from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

function NewCard({setNewCardForm, data, setData, formatTime, setCardName, setCardSelector, setAndSave}) {
    const regex=/^[0-9.]+$/;
    const currencySymbols = ["$","€","¥","₩","₴","₽","zł"];

    // const currencySymbols = [
    //     {value: "$", label: "$"},
    //     {value: "€", label: "€"},
    //     {value: "¥", label: "¥"},
    //     {value: "₩", label: "₩"},
    //     {value: "₴", label: "₴"},
    //     {value: "₽", label: "₽"},
    //     {value: "zł", label: "zł"},
    // ]

    const currentDate = new Date();
    const dateString = `${currentDate.getFullYear()}-${formatTime(currentDate.getMonth()+1)}-${formatTime(currentDate.getDay())}`

    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [newCardName, setNewCardName] = useState('');
    const [startingBalance, setStartingBalance] = useState('');
    const [currencySelector, setCurrencySelector] = useState(0);

    // const selectorRef = useRef();
    const currencyRef = useRef();

    useEffect(()=>{
        setSelectedCurrency(currencySymbols[currencySelector]);
    },[currencySelector, currencySymbols]);
    
    function validateFormAndSaveCard(event){
        event.preventDefault()
        if (newCardName != '' && startingBalance.match(regex) && startingBalance != '' && selectedCurrency != ''){
            const cardToSave = 	{
                "name": (newCardName).trim(),
                "dateCreated": dateString,
                "selectedCurrency": selectedCurrency,
                "defaultBalance": startingBalance,
                "transactionsData": []
            }
            setData([...data, cardToSave])
            setAndSave(data)
            setCardName(newCardName);
            setNewCardName('');
            setStartingBalance('');
            // selectorRef.current.setValue('');
            setNewCardForm(false);
            setCardSelector(false);
            setCurrencySelector(0)
        }
    }

    function handleCurrencyChange(value){
        if (value === '+' && currencySymbols[currencySelector + 1] !== undefined){
            setCurrencySelector(currencySelector + 1);
        }
        else if (value === '-' && currencySymbols[currencySelector - 1] !== undefined){
            setCurrencySelector(currencySelector - 1);     
        }
    }

    return(
        <div className="">
            <div className="cardSelector-svgAndTitle">
                <FaArrowLeft onClick={() => setNewCardForm(false)}/>
                <h1 className='cardSelectorTitle fontThin'>New Card</h1>
                <span/>                 
            </div>
            <hr/>
            <form className='newCardForm'>
                <p>Name: </p>
                <input value={newCardName} required onChange={(e) => setNewCardName(e.target.value)}placeholder="Name"></input>
                <p>Starting Balance: </p>
                <input type='number' value={startingBalance} required onChange={(e) => setStartingBalance(e.target.value)}placeholder="Starting Balance"></input>
                <p>Currency Type: </p>
                {/* <Select className='currencySelector' placeholder='Currency Type' ref={selectorRef} required options={currencySymbols} onChange={(e) => {setSelectedCurrency(e.value)}}/> */}
                <div className="newCard-currencySelector">
                    <MdOutlineKeyboardArrowLeft size={24} onClick={()=>{handleCurrencyChange('-')}}/>
                    <p ref={currencyRef}>{currencySymbols[currencySelector]}</p>
                    <MdOutlineKeyboardArrowRight size={24} onClick={()=>{handleCurrencyChange('+')}}/>
                </div>
            </form>    
            <button onClick={(e)=>{validateFormAndSaveCard(e)}}>Submit</button>    
        </div>

    )
}

NewCard.propTypes = {
    setNewCardForm: PropTypes.func,
    data: PropTypes.array,
    setData: PropTypes.func,
    formatTime: PropTypes.func,
    setCardName: PropTypes.func,
    setCardSelector: PropTypes.func,
    setAndSave: PropTypes.func
}
export default NewCard