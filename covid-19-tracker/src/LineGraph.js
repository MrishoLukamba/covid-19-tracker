import React , {useState, useEffect}from 'react';
import {Line}from 'react-chartjs-2';
import numeral from 'numeral';
import {casesTypeColors} from './utl'

const options ={
    legend: {
        display:false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode:'index',
        intersect: false,
        callback: {
            label: function(tooltipItem, data) {
                return numeral(tooltipItem.value).format('+0,0');
            },
        },
    },
    scales: {
        xAxes:[
            {
                type: 'time',
                time: {
                    format: 'MM/DD/YY',
                    tooltipFormat:'ll',
                },
            },

        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format('+0,0');
                    },
                },
            },
        ],
    },
};


const buildChartData = (data, casesType) => {
    let chartData =[];
    let lastDataPoint;

    for(let date in data.cases){
        if (lastDataPoint){
            let newDataPoint = {
                x: date,
                y: data[casesType][date]- lastDataPoint,
            };
            chartData.push(newDataPoint)
            
        }
        lastDataPoint = data[casesType][date]; 
    };
    return chartData;
};

function LineGraph({casesType='cases'}) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then((response) => response.json())
            .then((data) => {
                let chartData = buildChartData(data, casesType);
                setData(chartData);
            });       
        };
         fetchData();

    }, [casesType]);

   
    return (
        <div>
            <h2>CASES GRAPH</h2>
            {data?.length > 0 &&(
                <Line
                  options ={options}
                  data ={{
                    datasets: [
                        {
                            backgroundColor:'#F0E68C',
                            borderColor:'#778899',
                            data:data
                        },    
                    ],
                  }}
                  
                />

            )}
            
            
        </div>
    )
}

export default LineGraph
