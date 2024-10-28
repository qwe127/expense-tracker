import PropTypes from 'prop-types';
import { FaArrowsRotate } from "react-icons/fa6";
import { BsBackspaceFill } from "react-icons/bs";

function HistoryPage({setNewTransaction, data, setData, selectedCard, formatTime, getMonth}){
    
    function formatDate(date){
        const dateParse = new Date(date)
        console.log(date)
        console.log(dateParse.getMonth())
        return new Date().getFullYear() === dateParse.getFullYear() ? `${getMonth(dateParse.getMonth())} ${dateParse.getDate()}` : `${dateParse.getFullYear()} ${getMonth(dateParse.getMonth())} ${dateParse.getDate()}`
    }

    function totalExpensePerDay(object){
        let total = 0;
        object.transactions.map(i => i.expense ? total -= i.amount : total += i.amount)
        return(<p>Total: {total}</p>)
    }

    function handleDelete(mappedData, transactionObject){
        const card = selectedCard
        console.log('mappedData:')
        console.log(mappedData)
        console.log('transactionObject:')
        console.log(transactionObject)

        if (mappedData.transactions.length <= 1){
            for (let i = 0; i < card.transactionsData.length; i++){
                if (card.transactionsData[i].date === mappedData.date && mappedData.transactions.length <= 1){
                    card.transactionsData.splice(i, 1)
                }
            }            
        }
        else if(mappedData.transactions.length >= 2){
            console.log('remove len +2')
            card.transactionsData.map(i => {
                for (let e = 0; e < i.transactions.length; e++){
                    console.log(i.transactions[e])
                    if (i.transactions[e] === transactionObject){
                        console.log('true')
                        i.transactions.splice(e, 1)
                    }
                }
            })
        }
        setData([...data])
    }
    
    return(
        <>
        {selectedCard.name !== '' && selectedCard.transactionsData.length ?
            <>
                <h2>History:</h2>   
                <div>
                    {
                        selectedCard.transactionsData.map((i, index) => {
                            return(
                                <>
                                    <span key={index}>
                                        <h3>{`${formatDate(i.date)}:`}</h3>
                                        {totalExpensePerDay(i)}
                                    </span>                                
                                    {i.transactions.map((e, index) => {
                                        return(
                                            <>
                                                <span key={index}>
                                                    <p>{e.type}</p>
                                                    <p>{`${e.info} (${formatTime(new Date(e.time).getHours())}:${formatTime(new Date(e.time).getMinutes())}:${formatTime(new Date(e.time).getSeconds())})`}</p>
                                                    {e.expense ? <p>-{e.amount}</p> : <p>{e.amount}</p>}
                                                    <BsBackspaceFill onClick={() => handleDelete(i, e)}/>
                                                </span>
                                            </>
                                            )
                                        }
                                    )}
                                </>
                            )
                        })
                    }
                </div>
                <button onClick={() => {setNewTransaction(true)}}>New Transaction</button>    
            </>
            : selectedCard.name !== '' ? <button onClick={() => {setNewTransaction(true)}}>New Transaction</button>:<></>  
    }
    
        </>        
    )
}

HistoryPage.propTypes = {
    setNewTransaction: PropTypes.func,
    cardName: PropTypes.string,
    data: PropTypes.array,
    setData: PropTypes.func,
    selectedCard: PropTypes.object,
    formatTime: PropTypes.func,
    getMonth: PropTypes.func
}
export default HistoryPage