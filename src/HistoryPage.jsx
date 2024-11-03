import PropTypes from 'prop-types';
import { BsBackspaceFill } from "react-icons/bs";

function HistoryPage({setNewTransaction, data, setData, selectedCard, formatTime, getMonth, setAndSave}){
    
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
                    if (i.transactions[e] === transactionObject){
                        i.transactions.splice(e, 1)
                    }
                }
            })
        }
        setData([...data])
        setAndSave(data)
    }
    
    return(
        <>
        {selectedCard.name !== '' && selectedCard.transactionsData.length ?
            <> 
                <div>
                <h2 className='fontBold'>History</h2>   
                    <div className='historyWrapper'>
                        {
                            selectedCard.transactionsData.map((i, index) => {
                                return(
                                    <>
                                        <hr />
                                        <span className='history-dayTotal' key={index}>
                                            <h3>{`${formatDate(i.date)}`}</h3>
                                            {totalExpensePerDay(i)}
                                        </span>    
                                        <hr />                            
                                        {i.transactions.map((e, index) => {
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
                                            }
                                        )}
                                    </>
                                )
                            })
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

HistoryPage.propTypes = {
    setNewTransaction: PropTypes.func,
    cardName: PropTypes.string,
    data: PropTypes.array,
    setData: PropTypes.func,
    selectedCard: PropTypes.object,
    formatTime: PropTypes.func,
    getMonth: PropTypes.func,
    setAndSave: PropTypes.func
}
export default HistoryPage