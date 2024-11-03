import Select from 'react-select';
import PropTypes from 'prop-types';
import { FaArrowLeft } from "react-icons/fa";

import {useState, useEffect, useRef} from 'react'
import NewCard from './NewCard';

function CardSelector({data, setData, cardName, setCardName, setCardSelector, setSelectedCard, formatTime, newCardForm, setNewCardForm, setAndSave}) {
    const [cardSelectorValues, setCardSelectorValues] = useState([])

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
            setAndSave(data)
        }
    }

    return(
        <>
            {!newCardForm 
            ?
                <div className='backdropFilter'>
                    <div className='cardSelector-svgAndTitle mainWrapper'>
                        <FaArrowLeft className='returnButton' onClick={() => {setCardSelector(false)}}/>
                        <h1 className='cardSelectorTitle fontThin'>Card Selector</h1>                        
                    </div>
                    <div className='secondaryWrapper'>
                        <h2>Selected Card: {cardName}</h2>
                        <Select className='cardSelector' ref={selectorRef} options={cardSelectorValues} onChange={(e)=>{handleSelection(e)}}/>
                        {cardName && <button onClick={() => {handleDelete()}}>Delete Card</button>}
                        <button onClick={()=>setNewCardForm(true)}>Add New Card</button>                         
                    </div>

                </div>   
            :
                <NewCard 
                    data={data}
                    setData={setData}
                    setNewCardForm={setNewCardForm}
                    formatTime={formatTime}
                    setCardName={setCardName}
                    setCardSelector={setCardSelector}
                    setAndSave={setAndSave}
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