import { BarChart, Bar, ResponsiveContainer, Tooltip} from 'recharts';
import PropTypes from 'prop-types'

function Chart({selectedCard}){
    const dummyData = [
        { amount: 100, category: 'Healthcare', fill: '#1f77b4'},
        { amount: 250, category: 'Transportation'},
        { amount: 100, category: 'Shopping'},
        { amount: 1000, category: 'Healthcare'},
        { amount: 150, category: 'Transportation'}
    ]

    function filterData(){
        console.log(selectedCard)
        selectedCard.transactionsData.map(i=>(console.log(i)))
    }
    return(
        <div>
            <div>
                <button onClick={()=>{filterData('total')}}>Total</button>
                <button onClick={()=>{filterData('year')}}>This Year</button>
                <button onClick={()=>{filterData('month')}}>This Month</button>                
            </div>
        
                <ResponsiveContainer width={500} height={300}>
                    <BarChart width={48} height={48} data={dummyData} fill='#1010d8'>
                        <Tooltip/>
                            <Bar dataKey="amount" fill='#8874d8' />
                    </BarChart>
                </ResponsiveContainer>                
        </div>

    );
}

Chart.propTypes = {
    selectedCard: PropTypes.object
}
export default Chart