/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

 import React, { useState } from "react"
 import PropTypes from "prop-types"
 import CurrencyContext from './context/currencies'
 
 const Layout = ({ children }) => {
   const [_currencyContext, setCurrencyContext] = useState({
       selectedCurrency: 'USD',
       setCurrency: () => {
           alert('13')
       }
   });
 
   return (
     <>
       <CurrencyContext.Provider value={{ 
           ..._currencyContext,
           setCurrency: (currency) => setCurrencyContext({
                selectedCurrency: currency
           })
        }}>
       { children }
       </CurrencyContext.Provider>
     </>
   )
 }
 
 Layout.propTypes = {
   children: PropTypes.node.isRequired,
 }
 
 export default Layout
 