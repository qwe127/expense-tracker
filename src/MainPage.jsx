import PropTypes from 'prop-types'

import Chart from './Chart';

function MainPage({expense, income, selectedCard}) {

    return(
        <>
        {selectedCard.name !== '' && selectedCard.transactionsData.length 
        ?
            <div>
                <p>Income: {income}</p>
                <p>Expense: {expense}</p>
                <Chart selectedCard={selectedCard}/>
            </div>       
        :
            <></>     
        }        
        </>


    )
}

MainPage.propTypes = {
    expense: PropTypes.number,
    income: PropTypes.number,
    selectedCard: PropTypes.object
}
export default MainPage