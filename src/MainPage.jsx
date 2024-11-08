import PropTypes from 'prop-types'

import Chart from './Chart';
import { FaChartBar } from "react-icons/fa";
import { useState } from 'react';

function MainPage({filterBy, setFilterBy, expense, income, selectedCard}) {
    const [showChart, setShowChart] = useState(false)

    return(
        <>
        {selectedCard.name !== '' && selectedCard.transactionsData.length 
        ?
            <div className='main-mainDiv'>
                <hr></hr>
                    <div className='mainButtons'>
                        {showChart 
                        ? 
                        <div className='main-buttonsAndChart'>
                            <div className='main-buttons'>
                                <button onClick={()=>{setFilterBy('total')}} style={filterBy === 'total' ? {backgroundColor: '#689865'}: {backgroundColor: ''}}>Total</button>
                                <button onClick={()=>{setFilterBy('year')}} style={filterBy === 'year' ? {backgroundColor: '#689865'}: {backgroundColor: ''}}>This Year</button>
                                <button onClick={()=>{setFilterBy('month')}} style={filterBy === 'month' ? {backgroundColor: '#689865'}: {backgroundColor: ''}}>This Month</button>
                            </div>
                            <Chart selectedCard={selectedCard} income={income} expense={expense} filterBy={filterBy} showChart={showChart}/>
                        </div>
                        : 
                        <div className='main-buttons'>
                            <button onClick={()=>{setFilterBy('total')}} style={filterBy === 'total' ? {backgroundColor: '#689865'}: {backgroundColor: ''}}>Total</button>
                            <button onClick={()=>{setFilterBy('year')}} style={filterBy === 'year' ? {backgroundColor: '#689865'}: {backgroundColor: ''}}>This Year</button>
                            <button onClick={()=>{setFilterBy('month')}} style={filterBy === 'month' ? {backgroundColor: '#689865'}: {backgroundColor: ''}}>This Month</button>
                        </div>                        
                    }
             
                    </div>
                <div className='main-incomeExpense'>
                    <p>Income: {income}</p>
                    <div className='mainChartButton'>
                        <FaChartBar onClick={() => setShowChart(!showChart)} size='2rem' />                            
                    </div>        
                    <p>Expense: {expense}</p>       
                </div>
                <hr></hr>
            </div>       
        :
            <></>     
        }        
        </>


    )
}

MainPage.propTypes = {
    filterBy: PropTypes.string,
    setFilterBy: PropTypes.func,
    expense: PropTypes.number,
    income: PropTypes.number,
    selectedCard: PropTypes.object
}
export default MainPage