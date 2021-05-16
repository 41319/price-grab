import React, { useContext, useState, useEffect } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Button, Tip } from 'grommet'
import Layout from "../components/layout"
import Seo from "../components/seo"
import CurrencyContext from '../context/currencies'
import { List, Box, Image } from 'grommet'
import Rating from '../components/Rating'
import ReactHtmlParser from 'react-html-parser'; 

const PRICE_ENDPOINT = 'http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo/1/'

const CompetitorList = ({ data, originPrice, pricePrefix }) => {
  const sortable = Object.entries(data).sort(([,a],[,b]) => a-b)
  const highestPrice = sortable[sortable.length - 1]
  const calculateSavings = (price, comparePrice) => comparePrice - price / price * 100
  const colors = ['accent-1', 'accent-2', 'accent-3', 'neutral-1', 'neutral-2', 'neutral-3']
  const colorSet = sortable.length / colors.length > 1 ? sortable.length / colors.length : 1
  const colorsMap = [...Array(colorSet).keys()].reduce((acc, next) => {
    return acc.concat(colors)
  }, [])
  return <Box gap="small">
      {
      sortable && sortable.map((entry, i) => {
        const savingsPercentage = calculateSavings(originPrice,entry[1]);

    return <Box direction="row" >
              <Box>
              <Button color={colorsMap[i]} primary label={`${entry[0]} ${pricePrefix}${entry[1]}`} />
              {
                savingsPercentage > 0 ? `Save ${savingsPercentage}%` : ''
              }
              </Box>
              
              
           </Box>
      
  })}</Box>
}


const IndexPage = () => {
  
  const _currencyContext = useContext(CurrencyContext)
  const [datasource, setDatasource] = useState([])

  useEffect(async () => {
    if(_currencyContext.selectedCurrency) {
      const hotels = await fetch('https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/hotels/tokyo')
      .then(d => d.json())

      const priceInfo = await fetch(`${PRICE_ENDPOINT}${_currencyContext.selectedCurrency}`)
      .then(d => d.json())

      const _datasource = hotels.map((hotel, index) => {
        const rateInformation = priceInfo.find(e => e.id === hotel.id);
        const price = rateInformation ? rateInformation.price : -1
        const order = rateInformation ? order : hotels.length + 1;

        return ({
          ...hotel,
          price: rateInformation && rateInformation.taxes_and_fees ? price :price,
          order,
          competitors: rateInformation && rateInformation.competitors && { ...rateInformation.competitors, Us: rateInformation.price  },
          tax: rateInformation && rateInformation.taxes_and_fees
        })
      })
      

      setDatasource(_datasource)
    }

  }, [_currencyContext.selectedCurrency])

  return (
    <Layout>
      <List
        primaryKey="id"
        step={2}
        paginate={true}
        data={datasource}
      >
        {datum => (
          <Box gap="small"> 
          <Box direction="row">
            { datum.name }
            <Rating rate={datum.rating} stars={datum.stars} />
          </Box>  
          <Box width={{ max: '600px'}}>
          <Image

            src={datum.photo}
            

          />
          </Box>
          <Box>
            <strong>Address:</strong> { datum.address }
          </Box>
          <Box>
            <strong>About:</strong>
          { ReactHtmlParser (datum.description) } 
          <Box direction="row" justify="end">
            </Box>
          <Tip plain content={<Box margin="xsmall" pad="small" background="accent-4">{
            <CompetitorList data={{
              ...datum.tax,
              room: datum.price,
            }} pricePrefix={_currencyContext.selectedCurrency} />
          }</Box>}>
            <Button label={ `Book for ${_currencyContext.selectedCurrency}${datum.price}` } primary size="large"/>
          </Tip>
          </Box>

          {
            datum.competitors &&           <Box>

            <CompetitorList 
              data={datum.competitors} 
              originPrice={datum.price} 
              pricePrefix={_currencyContext.selectedCurrency}
            />

            </Box>
          }
          <Box>
            
          </Box>
          </Box>
        )}
      </List>
    </Layout>
  )
}

export default IndexPage
