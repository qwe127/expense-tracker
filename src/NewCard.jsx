import { FaArrowLeft } from "react-icons/fa";
import Select from 'react-select';
import PropTypes from 'prop-types';

import {useRef, useState} from 'react';

function NewCard({setNewCardForm, data, setData, formatTime, setCardName, setCardSelector, setAndSave}) {
    const regex=/^[0-9.]+$/;
    const currencySymbols = [
        {value: "$", label: "$"},
        {value: "€", label: "€"},
        {value: "¥", label: "¥"},
        {value: "₩", label: "₩"},
        {value: "₴", label: "₴"},
        {value: "₽", label: "₽"},
        {value: "zł", label: "zł"},
    ]
    const currentDate = new Date();
    const dateString = `${currentDate.getFullYear()}-${formatTime(currentDate.getMonth()+1)}-${formatTime(currentDate.getDay())}`

    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [newCardName, setNewCardName] = useState('');
    const [startingBalance, setStartingBalance] = useState('');

    const selectorRef = useRef();

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
            selectorRef.current.setValue('');
            setNewCardForm(false);
            setCardSelector(false)
        }
    }

    return(
        <div className="">
            <div className="cardSelector-svgAndTitle">
                <FaArrowLeft onClick={() => setNewCardForm(false)}/>
                <h1 className='cardSelectorTitle fontThin'>New Card</h1>                 
            </div>

            <form className='newCardForm'>
                <input value={newCardName} required onChange={(e) => setNewCardName(e.target.value)}placeholder="Name"></input>
                <input value={startingBalance} required onChange={(e) => setStartingBalance(e.target.value)}placeholder="Starting Balance"></input>
                <Select placeholder='Currency Type' ref={selectorRef} required options={currencySymbols} onChange={(e) => {setSelectedCurrency(e.value)}}/>
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