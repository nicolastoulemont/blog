import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as Accordion from "../Accordion"

jest.spyOn(window, "scrollTo").mockImplementation()

describe("Accordion", () => {
  test("should open and close correctly", async () => {
    render(
      <Accordion.Root>
        <Accordion.Header>
          Header content
          <Accordion.Icon />
        </Accordion.Header>
        <Accordion.Panel>Panel content</Accordion.Panel>
      </Accordion.Root>
    )

    const header = screen.getByRole("button")

    expect(screen.queryByRole("region")).toBe(null)

    userEvent.click(header)

    await waitFor(() => {
      expect(screen.queryByRole("region")).toBeTruthy()
    })

    userEvent.click(header)

    await waitFor(() => {
      expect(screen.queryByRole("region")).toBe(null)
    })
  })
})
