import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

import PropTypes from 'prop-types'

import { useState, useEffect } from 'react';
// import { NonceProvider } from 'react-select';
function Chart({selectedCard, income, expense, filterBy, showChart}){
    const [chartDataState, setChartData] = useState([])
    

    useEffect(()=>{
        function filterData(filterBy){
            const currentDate = new Date();
            let chartData = [];
            let chartObject = {};
            if (filterBy === 'total'){
                selectedCard.transactionsData.map(i => {
                    i.transactions.map(e => {
                        if (e.type !== 'Income'){
                            chartObject = {
                                "name": e.type,
                                "amount": e.amount,
                            }
                            chartData.push(chartObject);                         
                        }                   
                    })
                })
            }
            if (filterBy === 'year'){
                selectedCard.transactionsData.map(i => {
                    const mappedDate = new Date(Date.parse(i.date))
                    i.transactions.map(e => {
                        if (e.type !== 'Income' && currentDate.getFullYear() === mappedDate.getFullYear()){
                            chartObject = {
                                "name": e.type,
                                "amount": e.amount,
                            }
                            chartData.push(chartObject);                                       
                        }    
                    })
                })
            }         
            if (filterBy === 'month'){
                selectedCard.transactionsData.map(i => {
                    const mappedDate = new Date(Date.parse(i.date))
                    i.transactions.map(e => {
                        if (e.type !== 'Income' && currentDate.getFullYear() === mappedDate.getFullYear() && currentDate.getMonth() === mappedDate.getMonth()){
                            chartObject = {
                                "name": e.type,
                                "amount": e.amount,
                            }
                            chartData.push(chartObject);                                       
                        }    
                    })
                })
            }         
            const holder = {};
            
            chartData.forEach(d => {
                if (Object.prototype.hasOwnProperty.call(holder, d.name)) {
                  holder[d.name] = holder[d.name] + d.amount;
                } else {
                  holder[d.name] = d.amount;
                }
              });          

            var obj2 = [];

            for (var prop in holder) {
                obj2.push({ name: prop, amount: holder[prop] });
            }
            setChartData(obj2)
        }
        filterData(filterBy)
    },[filterBy, selectedCard.transactionsData, income, expense])
    

    
    return(
        <>  
        {
            chartDataState.length && showChart
            ?  
                <div className='chartContainer'>
                    <ResponsiveContainer width={'100%'} height={'100%'}>
                        <BarChart

                            data={chartDataState}
                            margin={{
                                top: 5,
                                right: 70,
                                left: 20,
                                bottom: 5,
                            }}
                            barSize={20}
                            >
                            <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} style={{ textAnchor: 'center', fontSize: '80%', fill: 'hsla(0, 0%, 100%, 0.87)' }}/>
                            <YAxis style={{ fontSize: '80%', fill: 'hsla(0, 0%, 100%, 0.2)' }}/>
                            <Tooltip contentStyle={{background: 'white', border: 'none', borderRadius: '5px'}} labelStyle={{color: 'black'}}/>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar dataKey={"amount"} fill="hsl(0, 67%, 57%, 0.9)" background={{ fill: '#eee' }}>
                                {/* <LabelList angle="90" dataKey="name" position="center" style={{fill: 'white', fontWeight: 100}} clockWise='true'/> */}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            :
                <></>                                     
        }
        </>  

    );
}

Chart.propTypes = {
    selectedCard: PropTypes.object,
    income: PropTypes.number,
    expense: PropTypes.number,
    filterBy: PropTypes.string,
    showChart: PropTypes.bool
}
export default Chart