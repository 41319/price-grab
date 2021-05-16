const PRICE_ENDPOINT =
  "http://5df9cc6ce9f79e0014b6b3dc.mockapi.io/"

const HOTEL_ENDPOINT = "https://5df9cc6ce9f79e0014b6b3dc.mockapi.io/"

export const getHotels = async (suffix) => {
    return await fetch(
        `${HOTEL_ENDPOINT}hotels/${suffix}`
      ).then(d => d.json())
}
