import React, { useContext, useState, useEffect } from "react"
import { Button, Tip } from "grommet"
import { List, Box, Image } from "grommet"

const BadgeList = ({
    data = [],
    pricePrefix,
    afterBadgeRender,
  }) => {
    const sortable = Object.entries(data).sort(([, a], [, b]) => a - b)
    const highestPrice = sortable[sortable.length - 1]
    const colors = [
      "accent-1",
      "accent-2",
      "accent-3",
      "neutral-1",
      "neutral-2",
      "neutral-3",
    ]
    const colorSet =
      sortable.length / colors.length > 1 ? sortable.length / colors.length : 1
    const colorsMap = [...Array(colorSet).keys()].reduce((acc, next) => {
      return acc.concat(colors)
    }, [])
    return (
      <Box gap="small">
        {sortable &&
          sortable.map((entry, i) => {
            return (
              <Box direction="row">
                <Box>
                  <Button
                    color={colorsMap[i]}
                    primary
                    label={`${entry[0]} ${pricePrefix}${entry[1]}`}
                  />
                  {afterBadgeRender && afterBadgeRender(entry)}
                </Box>
              </Box>
            )
          })}
      </Box>
    )
  }

  export default BadgeList