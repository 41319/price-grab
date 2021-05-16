import React, { useContext, useState, useEffect } from "react"
import { Button, Tip } from "grommet"
import Layout from "../components/layout"
import CurrencyContext from "../context/currencies"
import { List, Box, Image } from "grommet"
import Rating from "../components/Rating"
import ReactHtmlParser from "react-html-parser"
import { calculateSavings } from '../helpers/number'
import BadgeList from '../components/BadgeList'
import { getHotels } from '../service/hotels'

const createPriceBreakdown = (totalprice, miscFeesObject = {}) => {
  const roomFee = Object.values(miscFeesObject).reduce((acc, next) => {
    return acc - next
  }, totalprice)
  return {
    ...miscFeesObject,
    roomFee: roomFee,
  }
}

const IndexPage = () => {
  const _currencyContext = useContext(CurrencyContext)
  const [datasource, setDatasource] = useState([])

  useEffect(async () => {
    if (_currencyContext.selectedCurrency) {
      const hotels = await getHotels('tokyo/1')

      const priceInfo = await getHotels(`tokyo/1/${_currencyContext.selectedCurrency}`)

      const _datasource = hotels.map((hotel, index) => {
        const rateInformation = priceInfo.find(e => e.id === hotel.id)
        const { taxes_and_fees, price } = rateInformation || {}
        const order = rateInformation ? order : hotels.length + 1
        return {
          ...hotel,
          price: price || -1,
          order,
          competitors: rateInformation &&
            rateInformation.competitors && {
              ...rateInformation.competitors,
              Us: rateInformation.price,
            },
          hasTax: !!taxes_and_fees,
          breakdown:
            (price || taxes_and_fees) &&
            createPriceBreakdown(price, taxes_and_fees),
        }
      })

      setDatasource(_datasource)
    }
  }, [_currencyContext.selectedCurrency])

  return (
    <Layout>
      <List primaryKey="id" step={2} paginate={true} data={datasource}>
        {datum => (
          <Box gap="small">
            <Box direction="row">
              {datum.name}
              <Rating rate={datum.rating} stars={datum.stars} />
            </Box>
            <Box width={{ max: "600px" }}>
              <Image src={datum.photo} />
            </Box>
            <Box>
              <strong>Address:</strong> {datum.address}
            </Box>
            <Box>
              <strong>About:</strong>
              {ReactHtmlParser(datum.description)}
              <Box direction="row" justify="end"></Box>
              <Tip
                plain
                content={
                  <Box margin="xsmall" pad="small" background="accent-4">
                    {datum.breakdown && (
                      <BadgeList
                        data={datum.breakdown}
                        pricePrefix={_currencyContext.selectedCurrency}
                      />
                    )}
                  </Box>
                }
              >
                <Button
                  label={`Book for ${_currencyContext.selectedCurrency}${datum.price}${datum.hasTax ? '**' : ''}`}
                  primary
                  size="large"
                />
              </Tip>
            </Box>

            {datum.competitors && (
              <Box>
                <BadgeList
                  data={datum.competitors}
                  pricePrefix={_currencyContext.selectedCurrency}
                  afterBadgeRender={entry => {
                    const savingsPercentage = calculateSavings(
                      datum.price,
                      entry[1]
                    )
                    return savingsPercentage > 0
                      ? `Save ${savingsPercentage}%`
                      : ""
                  }}
                />
              </Box>
            )}
            <Box></Box>
          </Box>
        )}
      </List>
    </Layout>
  )
}

export default IndexPage
