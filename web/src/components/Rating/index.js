import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Star } from "grommet-icons"
import { Box } from "grommet"

const Rating = ({ rate, stars }) => {
  return (
    <Box direction="row">
      {[...Array(stars).keys()].map(e => (
        <Star key={e} color="#FFC95E" />
      ))}
      {rate}
    </Box>
  )
}

export default Rating
