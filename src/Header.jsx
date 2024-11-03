import PropTypes from 'prop-types';
import { IoMdCard } from "react-icons/io";

function Header({cardName, setCardName, cardBalance, selectedCurrency, cardSelector, setCardSelector, noCardSelected, setSelectedCard}) {    

    return(
        <header>
            {
                !noCardSelected 
                ?
                    <>
                        <div className='header-cardName-Icon'>
                            <h1 className='fontThin'>{cardName}</h1>
                            {!cardSelector && <IoMdCard size={35} onClick={() => {setCardSelector(!cardSelector); setSelectedCard({"transactionsData": []}); setCardName('')}}/>}  
                        </div>
                        
                        <div className="header-currentBalance">
                            <h2 className='fontThin'>Balance: <strong>{selectedCurrency}{cardBalance}</strong></h2>              
                        </div> 
                    </>
                :
                    <h1 className='fontThin'>No Card Selected</h1>             
            }

        </header>
    )
}
Header.propTypes = {
    cardName: PropTypes.string,
    cardBalance: PropTypes.number,
    selectedCurrency: PropTypes.string,
    cardSelector: PropTypes.bool,
    setCardSelector: PropTypes.func,
    setCardName: PropTypes.func,
    noCardSelected: PropTypes.bool,
    setSelectedCard: PropTypes.func
}

export default Header