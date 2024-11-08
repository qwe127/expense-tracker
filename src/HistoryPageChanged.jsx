import PropTypes from 'prop-types';
import { BsBackspaceFill } from "react-icons/bs";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

import { useState } from 'react';

function HistoryPageChanged({setNewTransaction, data, setData, selectedCard, formatTime, getMonth, setAndSave, date}){
    const [pageSelector, setPageSelector] = useState(0);
    // const [sortedHistory, setSortedHistory] = useState([])

    function getDate(num){
        return selectedCard.transactionsData[num] !== undefined ? new Date(selectedCard.transactionsData[num].date) : new Date()
    }
    
    function sortByDate(){
        var sortedArray = [];
        var object = {};
        
        selectedCard.transactionsData.forEach((datum, i) => {
            object['year'] = getDate(i).getFullYear();
            object['month'] = getMonth(getDate(i).getMonth());
            object['transactionsData'] = [{day: getDate(i).getDate(), transactions: datum.transactions}]
            
            for (let e = 1; e < selectedCard.transactionsData.length; e++){
                let year = getDate(e).getFullYear()
                let month = getMonth(getDate(e).getMonth());
                let day = getDate(e).getDate();
                
                if (object.month === month && object.year === year){
                    object.transactionsData = [...object.transactionsData, {day: day, transactions: selectedCard.transactionsData[e].transactions}]
                }
            }                            
            sortedArray = [...sortedArray, object]
            object = {};
        })
        sortedArray = sortedArray.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.month === value.month && t.year === value.year
            ))
            )

        sortedArray.map(i => {
            i.transactionsData = i.transactionsData.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.day === value.day
                ))
                )      
        })
        return(sortedArray)
    }   

    // function formatDate(date){
    //     const dateParse = new Date(date)
    //     return new Date().getFullYear() === dateParse.getFullYear() ? `${getMonth(dateParse.getMonth())} ${dateParse.getDate()}` : `${dateParse.getFullYear()} ${getMonth(dateParse.getMonth())} ${dateParse.getDate()}`
    // }

    function totalExpensePerDay(object){
        let total = 0;
        object.transactions.map(i => i.expense ? total -= i.amount : total += i.amount)
        return(<p>Total: {total}</p>)
    }

    function handleDelete(mappedData, transactionObject){
        const card = selectedCard
        const parsedDate = new Date (Date.parse(transactionObject.time))
        const formattedDate = `${parsedDate.getFullYear()}-${formatTime(parsedDate.getMonth()+1)}-${formatTime(parsedDate.getDate())}`

        if (mappedData.transactions.length <= 1){
            console.log('len = 1')
            for (let i = 0; i < card.transactionsData.length; i++){
                if (card.transactionsData[i].date === formattedDate){
                    card.transactionsData.splice(i, 1)
                }
            }            
        }
        else if(mappedData.transactions.length >= 2){
            console.log('remove len +2')
            card.transactionsData.map(i => {
                for (let e = 0; e < i.transactions.length; e++){
                    if (i.transactions[e] === transactionObject){
                        i.transactions.splice(e, 1)
                    }
                }
            })
        }
        setData([...data])
        setAndSave(data)
    }
    
    function handlePageChange(value){
        if (sortByDate()[pageSelector + 1] !== undefined && value === '+'){
            setPageSelector(pageSelector + 1)
        }
        else if (sortByDate()[pageSelector - 1] !== undefined && value === '-'){
            setPageSelector(pageSelector - 1)
        }
        else {setPageSelector(pageSelector)}
    }

    return(
        <>
        {selectedCard.name !== '' && selectedCard.transactionsData.length ?
            <> 
                <div>
                <h2 className='fontBold'>History</h2>   
                    <div className='historyWrapper'>
                        <>
                            <div className='historyMonthSelector' style={{display:'flex', position:'sticky', top:0, borderRadius: '0.3rem'}}>
                                <MdOutlineKeyboardArrowLeft size={24} onClick={()=>{handlePageChange('+')}}/>
                                {date.getFullYear() === sortByDate()[pageSelector].year 
                                    ? <h3 style={{fontWeight: 300}}>{sortByDate()[pageSelector].month}</h3>  
                                    : <h3 style={{fontWeight: 300}}>{sortByDate()[pageSelector].year} {sortByDate()[pageSelector].month}</h3>
                                }
                                <MdOutlineKeyboardArrowRight size={24} onClick={()=>{handlePageChange('-')}}/>
                            </div>
                            {sortByDate()[pageSelector].transactionsData.map((i,index) => {
                                return(
                                    <>
                                        <hr />
                                        <span className='history-dayTotal' key={index}>
                                            <h3 style={{padding: 0}}>{`Day ${i.day}`}</h3>
                                            {totalExpensePerDay(i)}
                                        </span>    
                                        <hr />   
                                        {i.transactions.reverse().map((e, index)=>{
                                            return(           
                                                <>
                                                    <span className='historyCard' key={index}>
                                                        <div style={e.expense ? {borderLeftColor: "hsl(0, 67%, 57%)", borderLeftStyle: "solid", backgroundColor:"hsl(0, 35%, 5%, 0.8)"}:{borderLeftColor: "hsl(120, 35%, 65%, 0.7)", borderLeftStyle: "solid", backgroundColor:"hsl(120, 35%, 5%, 0.8)"}} className='history-typeDelete'>
                                                            <p>{`${e.type}`}</p> 
                                                            <p>{`${formatTime(new Date(e.time).getHours())}:${formatTime(new Date(e.time).getMinutes())}`}</p>
                                                            {e.expense ? <p>-{e.amount}</p> : <p>{e.amount}</p>}                                                      
                                                            <BsBackspaceFill size={24} onClick={() => handleDelete(i, e)}/>                                                        
                                                        </div>
                                                        <div style={e.expense ? { backgroundColor: "hsl(0, 67%, 57%)"} : { backgroundColor: "hsl(120, 35%, 65%, 0.7)"}} className='history-infoAndAmount'>
                                                            <p style={{ wordBreak: "break-word"}}>{`${e.info}`}</p>                                                        
                                                        </div>                         
                                                    </span>
                                                </>
                                            )   
                                        })}
                                    </>
                                )
                            })
                            
                            }
                        </>
                        {
                            // selectedCard.transactionsData[pageSelector].map((i, index) => {
                            //     return(
                            //         <>
                            //             <hr />
                            //             <span className='history-dayTotal' key={index}>
                            //                 <h3>{`${formatDate(i.date)}`}</h3>
                            //                 {totalExpensePerDay(i)}
                            //             </span>    
                            //             <hr />                            
                            //             {i.transactions.map((e, index) => {
                            //                 return(
                            //                     <>
                            //                         <span className='historyCard' key={index}>
                            //                             <div style={e.expense ? {borderLeftColor: "hsl(0, 67%, 57%)", borderLeftStyle: "solid", backgroundColor:"hsl(0, 35%, 5%, 0.8)"}:{borderLeftColor: "hsl(120, 35%, 65%, 0.7)", borderLeftStyle: "solid", backgroundColor:"hsl(120, 35%, 5%, 0.8)"}} className='history-typeDelete'>
                            //                                 <p>{`${e.type}`}</p> 
                            //                                 <p>{`${formatTime(new Date(e.time).getHours())}:${formatTime(new Date(e.time).getMinutes())}`}</p>
                            //                                 {e.expense ? <p>-{e.amount}</p> : <p>{e.amount}</p>}                                                      
                            //                                 <BsBackspaceFill size={24} onClick={() => handleDelete(i, e)}/>                                                        
                            //                             </div>
                            //                             <div style={e.expense ? { backgroundColor: "hsl(0, 67%, 57%)"} : { backgroundColor: "hsl(120, 35%, 65%, 0.7)"}} className='history-infoAndAmount'>
                            //                                 <p style={{ wordBreak: "break-word"}}>{`${e.info}`}</p>                                                        
                            //                             </div>                         
                            //                         </span>
                            //                     </>
                            //                     )
                            //                 }
                            //             )}
                            //         </>
                            //     )
                            // })
                        }
                    </div>
                </div>  
                <button className="newTransactionButton" onClick={() => {setNewTransaction(true)}}>New Transaction</button>
            </>
            : selectedCard.name !== '' ? <button onClick={() => {setNewTransaction(true)}}>New Transaction</button>:<></>  
    }
    
        </>        
    )
}

HistoryPageChanged.propTypes = {
    setNewTransaction: PropTypes.func,
    cardName: PropTypes.string,
    data: PropTypes.array,
    setData: PropTypes.func,
    selectedCard: PropTypes.object,
    formatTime: PropTypes.func,
    getMonth: PropTypes.func,
    setAndSave: PropTypes.func,
    date: PropTypes.func
}
export default HistoryPageChanged