import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Button } from 'grommet'
import Layout from "../components/layout"
import Seo from "../components/seo"
import CurrencyContext from '../context/currencies'


const IndexPage = () => {
  
  const size = React.useContext(CurrencyContext)
  return (
    <Layout>
      
      {
        JSON.stringify(size)
      }
      <Seo title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <StaticImage
        src="../images/gatsby-astronaut.png"
        width={300}
        quality={95}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem` }}
      />
      <p>
        <Button label="!23" onClick={() => { size.setCurrency('ddd') }}>Go to page 2</Button> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </p>
    </Layout>
  )
}

export default IndexPage
