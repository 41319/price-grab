/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import CurrencyContext from "./context/currencies"
import { setItem, getItem } from "./helpers/storage"
const Layout = ({ children }) => {
  const [_currencyContext, setCurrencyContext] = useState({
    selectedCurrency: getItem("currency") || "USD",
    availableCurrencies: ["USD", "SGD", "CNY", "KRW"],
    setCurrency: () => {},
  })

  return (
    <>
      <CurrencyContext.Provider
        value={{
          ..._currencyContext,
          setCurrency: currency => {
            setCurrencyContext({
              ..._currencyContext,
              selectedCurrency: currency,
            })
            setItem("currency", currency)
          },
        }}
      >
        {children}
      </CurrencyContext.Provider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
