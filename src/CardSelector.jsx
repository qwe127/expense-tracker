import Select from 'react-select';
import PropTypes from 'prop-types';
import { FaArrowLeft } from "react-icons/fa";

import {useState, useEffect, useRef} from 'react'
import NewCard from './NewCard';

function CardSelector({data, setData, cardName, setCardName, setCardSelector, setSelectedCard, formatTime, selectedCard}) {
    const [cardSelectorValues, setCardSelectorValues] = useState([])
    const [newCardForm, setNewCardForm] = useState(cardName ? false : true)

    const selectorRef = useRef();
    
    useEffect(() => {
        let getValues = []
        data.map(i => {
            getValues = [...getValues, {value: (i.name).toLowerCase(), label: i.name}]
        })
        setCardSelectorValues(getValues)

    }, [data])
    
    function handleSelection(event){
        if (event.label !== ''){
            setCardName(event.label)
        }
    }

    function handleDelete(){
        console.log('test')
        if (cardName || cardName != ''){
            const filteredData = data.filter(i => i.name != cardName)
            setData(filteredData)
            selectorRef.current.setValue('');
            setSelectedCard({
                "name": ('').trim(),
                "defaultBalance": 0,
                "expenseTotal": 0,
                "incomeTotal": 0,
                "transactionsData": []
            });
        }
    }

    return(
        <>
            {!newCardForm 
            ?
                <>
                    <h1>Card Selector</h1>
                    <FaArrowLeft onClick={() => {setCardSelector(false)}}/>
                    <Select ref={selectorRef} isClearable options={cardSelectorValues} onChange={(e)=>{handleSelection(e)}}/>
                    {cardName && <button onClick={() => {handleDelete()}}>Delete Card</button>}
                    <button onClick={()=>setNewCardForm(true)}>Add New Card</button>  
                </>   
            :
                <NewCard 
                    data={data}
                    setData={setData}
                    setNewCardForm={setNewCardForm}
                    formatTime={formatTime}
                    setCardName={setCardName}
                    setCardSelector={setCardSelector}
                />
            }
        </>
    )
}
CardSelector.propTypes = {
    data: PropTypes.array,
    setData: PropTypes.func,
    setDate: PropTypes.func,
    cardName: PropTypes.string,
    setCardName: PropTypes.func,
    setCardSelector: PropTypes.func,
    setSelectedCard: PropTypes.func,
    formatTime: PropTypes.func,
    selectedCard: PropTypes.object
}

export default CardSelector