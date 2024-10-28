import { useState, useEffect } from 'react'
import dummyData from './assets/data.json'
import Header from './Header'
import MainPage from './MainPage'
import HistoryPage from './HistoryPage'
import NewTransactionComponent from './NewTransactionComponent'
import CardSelector from './CardSelector'

function App() {
  const [data, setData] = useState(dummyData)
  const [newTransaction, setNewTransaction] = useState(false);
  const [cardSelector, setCardSelector] = useState(false);
  const [selectedCard, setSelectedCard] = useState(data.length ? data[0] : {});
  const [filterBy, setFilterBy] = useState('total');
  
  const [cardName, setCardName] = useState(data.length ? data[0].name : 'Select a card');
  const [cardBalance, setCardBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('$')

  useEffect(()=>{
    setCardBalance(0);
    setExpense(0);
    setIncome(0);
    
    function calculateBalance(){ 
      if(cardName){
        data.map(i => {
            if((cardName).toLowerCase() === (i.name).toLowerCase()){
              setSelectedCard(i);
            }
          })
          performCalculations();
          let calculatedBalance = Number(selectedCard.defaultBalance) + income - expense
          setSelectedCurrency(selectedCard.selectedCurrency)
          setCardBalance(calculatedBalance)        
      }     
    }
      
    function performCalculations(){
      let expense = 0;
      let income = 0;

      if (data.length && selectedCard.transactionsData.length && filterBy === 'total'){
        selectedCard.transactionsData.map(i => {i.transactions.map(e => e.expense ? expense = expense + e.amount : income = income + e.amount)})
      }
      else if (data.length && selectedCard.transactionsData.length && filterBy === 'month'){
        selectedCard.transactionsData.map(i => {
          console.log(i)
        })
      }
      setExpense(expense);
      setIncome(income)
    }
    calculateBalance();
  }, [cardName, data, expense, income, cardSelector, selectedCard, setSelectedCard, filterBy])
  
  function formatTime(number){
    return (number < 10 ? '0': '') + number;
  };

  function getMonth(number){
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return month[number]
  }

  return (
    <>
      <h1>Expense Tracker</h1>
      {
        !cardSelector && <button onClick={() => setCardSelector(!cardSelector)}>Change Card</button> 
      }
      {
        !cardSelector 
        ? 
          <div>
            <Header 
              cardName={cardName} 
              data={data} 
              cardBalance={cardBalance} 
              setCardBalance={setCardBalance}
              selectedCurrency={selectedCurrency}
            />
            <MainPage expense={expense} income={income} selectedCard={selectedCard}/>
            <div>
              {newTransaction 
              ? <NewTransactionComponent 
                  setDate={setData} 
                  setNewTransaction={setNewTransaction} 
                  selectedCard={selectedCard} 
                  formatTime={formatTime} 
                  setSelectedCard={setSelectedCard}
                  cardBalance={cardBalance}
                  setCardBalance={setCardBalance}
                  expense={expense}
                  setExpense={setExpense}
                  income={income}
                  setIncome={setIncome}
                  /> 
                : <HistoryPage 
                  data={data}
                  setData={setData}
                  setNewTransaction={setNewTransaction} 
                  selectedCard={selectedCard}
                  setSelectedCard={setSelectedCard} 
                  formatTime={formatTime}
                  getMonth={getMonth}
                  filterBy={filterBy}
                  />
                }
            </div>
          </div> 
          : <CardSelector 
              data={data}
              setData={setData}
              cardName={cardName}
              setCardName={setCardName}
              setCardSelector={setCardSelector}
              setSelectedCard={setSelectedCard}
              formatTime={formatTime}
              selectedCard={selectedCard}
            /> 
      }
      <button onClick={() => {
        console.log(data);
        console.log(selectedCard)}}>Other</button>

    </>
  )
}

export default App
