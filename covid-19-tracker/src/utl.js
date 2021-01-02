import{ Circle, Popup} from "react-leaflet";
import React from "react";
import numeral from "numeral";

const casesTypeColors ={
    cases: {
        hex: '#DEB887',
        multiplier:750,
    },
    recovered: {
        hex: '#778899',
        multiplier:1000,
    },
    deaths: {
        hex: '#DC143C',
        multiplier:1600,
    },
};

export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) =>{
        if (a.cases > b.cases) {
            return -1;

        }else {
            return 1;
        }
      });
    return sortedData;
};

export const prettyPrintStat =(stat) =>
    stat ? `${numeral(stat).format('0,0a')}` : '+0';

export const showDataOnMap = (data, casesType='cases') =>
    data.map((country) => (
        <Circle 
          center={[country.countryInfo.lat, country.countryInfo.long]} 
          fillOpacity={0.4} 
          color={casesTypeColors[casesType].hex}
          fillColor={casesTypeColors[casesType].hex}
          radius={
            Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
          }
        >
          <Popup>
              <div className='popup_box'>
                  <div className='info_flag' style={{backgroundImage:`url(${country.countryInfo.flag})`}}></div>
                  <div className='info_country'>{country.country}</div>
                  <div className='info_cases'>Cases: {numeral(country.cases).format('0,0')}</div>
                  <div className='info_recovered'>recovered: {numeral(country.recovered).format('0,0')}</div>
                  <div className='info_deaths'>Deaths: {numeral(country.deaths).format('0,0')}</div>
                  <div className='info_test'>Test: {numeral(country.tests).format('0,0')}</div>
              </div>


          </Popup>
        </Circle>
    ));
