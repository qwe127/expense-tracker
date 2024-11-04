import { useState, useEffect } from 'react'
// import dummyData from './assets/data.json'
import Header from './Header'
import MainPage from './MainPage'
import HistoryPage from './HistoryPage'
import NewTransactionComponent from './NewTransactionComponent'
import CardSelector from './CardSelector'

function App() {
  // const [data, setData] = useState(dummyData)
  const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || [])
  const [newTransaction, setNewTransaction] = useState(false);
  const [cardSelector, setCardSelector] = useState(false);
  const [newCardForm, setNewCardForm] = useState(data.length ? false : true)
  const [selectedCard, setSelectedCard] = useState(data.length ? data[0] : {"transactionsData": []});
  
  const [filterBy, setFilterBy] = useState('total');
  const [noCardSelected, setNoCardSelected] = useState(true)
  
  const [cardName, setCardName] = useState(data.length ? data[0].name : '');
  const [cardBalance, setCardBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  
  const [selectedCurrency, setSelectedCurrency] = useState('$')

  const date = new Date()

  useEffect(()=>{
    setCardBalance(0);
    setExpense(0);
    setIncome(0);
    if (data.length){
      setNoCardSelected(false)
    }
    
    if (data.length){
      console.log('test')
      function calculateBalance(){ 
        if(cardName){
          data.map(i => {
              if((cardName).toLowerCase() === (i.name).toLowerCase()){
                setSelectedCard(i);
              }
            })
            performCalculations();
            let calculatedBalance = Number(selectedCard.defaultBalance) + totalIncome - totalExpense
            setSelectedCurrency(selectedCard.selectedCurrency)
            setCardBalance(calculatedBalance)        
        }     
      }
        
      function performCalculations(){
        let expense = 0;
        let income = 0;
        let totalExpense = 0;
        let totalIncome = 0;
        const currentDate = new Date();

        if (data.length && selectedCard.transactionsData.length){
          selectedCard.transactionsData.map(i => {i.transactions.map(e => {e.expense 
            ? 
              totalExpense = totalExpense + e.amount 
            : 
              totalIncome = totalIncome + e.amount
            })})
        }
        
        setTotalExpense(totalExpense);
        setTotalIncome(totalIncome)
        
        if (data.length && selectedCard.transactionsData.length  && filterBy === 'total'){
          selectedCard.transactionsData.map(i => {i.transactions.map(e => {e.expense 
            ? 
              expense = expense + e.amount
            : 
              income = income + e.amount
            })})
        }
        else if (data.length && selectedCard.transactionsData.length && filterBy === 'year'){
          selectedCard.transactionsData.map(i => {
            console.log(i);
            const mappedDate = new Date(Date.parse(i.date));
            i.transactions.map(e => {
              if (currentDate.getFullYear() === mappedDate.getFullYear() && e.type !== 'Income'){
                console.log('match');
                expense = expense + e.amount; 
              }
              else if (currentDate.getFullYear() === mappedDate.getFullYear() && e.type === 'Income'){
                income = income + e.amount
              }
            })
          })
        }
        else if (data.length && selectedCard.transactionsData.length && filterBy === 'month'){
          selectedCard.transactionsData.map(i => {
            console.log(i);
            const mappedDate = new Date(Date.parse(i.date));
            i.transactions.map(e => {
              if (currentDate.getFullYear() === mappedDate.getFullYear() && currentDate.getMonth() === mappedDate.getMonth() && e.type !== 'Income'){
                console.log('match');
                expense = expense + e.amount; 
              }
              else if (currentDate.getFullYear() === mappedDate.getFullYear() && currentDate.getMonth() === mappedDate.getMonth() && e.type === 'Income'){
                income = income + e.amount
              }
            })
          })
        }
        setExpense(expense);
        setIncome(income)
      }
      calculateBalance();      
    }

  }, [cardName, data, expense, income, cardSelector, selectedCard, setSelectedCard, filterBy, totalExpense, totalIncome])
  
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data))   
  },[data])

  function formatTime(number){
    return (number < 10 ? '0': '') + number;
  };

  function getMonth(number){
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return month[number]
  }

  function setAndSave(newData){
    localStorage.setItem('data', JSON.stringify(newData))
  }

  return (
    <>
      {
        !cardSelector 
        ? 
          <div className='mainWrapper'>
            <Header 
              cardName={cardName}
              setCardName={cardName}
              data={data} 
              cardBalance={cardBalance} 
              setCardBalance={setCardBalance}
              selectedCurrency={selectedCurrency}
              cardSelector={cardSelector}
              setCardSelector={setCardSelector}
              date={date}
              formatTime={formatTime}
              noCardSelected={noCardSelected}
              setSelectedCard={setSelectedCard}
            />
            <div className='secondaryWrapper'>
              <MainPage filterBy={filterBy} setFilterBy={setFilterBy }expense={expense} income={income} selectedCard={selectedCard}/>
              {noCardSelected 
              ?
                  <button onClick={()=>{setCardSelector(true)}} style={{width: '50%', height: '10dvh', margin: '1rem'}}>Create New Card</button>
              :
              newTransaction 
              ? 
                <NewTransactionComponent 
                  data={data}
                  setData={setData} 
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
                  setAndSave={setAndSave}
                  /> 
              : 
                <HistoryPage 
                  data={data}
                  setData={setData}
                  setNewTransaction={setNewTransaction} 
                  selectedCard={selectedCard}
                  setSelectedCard={setSelectedCard} 
                  formatTime={formatTime}
                  getMonth={getMonth}
                  filterBy={filterBy}
                  setAndSave={setAndSave}
                  />
                }
            </div>
          </div> 
          : 
          <div>
            <CardSelector 
                data={data}
                setData={setData}
                cardName={cardName}
                setCardName={setCardName}
                setCardSelector={setCardSelector}
                setSelectedCard={setSelectedCard}
                formatTime={formatTime}
                selectedCard={selectedCard}
                newCardForm={newCardForm}
                setNewCardForm={setNewCardForm}
                setAndSave={setAndSave}
            /> 
          </div>
      }
    </>
  )
}

export default App
