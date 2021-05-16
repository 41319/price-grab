import React from "react"
import renderer from "react-test-renderer"
import BadgeList from "../"
describe("Badge List", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<BadgeList />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
