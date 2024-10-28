import PropTypes from 'prop-types';

function Header({cardName, cardBalance, selectedCurrency}) {    

    return(
        <header>
            <h2>{cardName}</h2>
            <div className="header-currentBalance">
                <h2>Balance: {selectedCurrency}{cardBalance}</h2>              
            </div>
        </header>
    )
}
Header.propTypes = {
    cardName: PropTypes.string,
    cardBalance: PropTypes.number,
    selectedCurrency: PropTypes.string
}

export default Header