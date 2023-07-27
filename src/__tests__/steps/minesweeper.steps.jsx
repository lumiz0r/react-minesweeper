/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Board from "../../components/Board";
import Timer from "../../components/Timer";
import "@testing-library/jest-dom/extend-expect";

const loadMockData = async (mockData) => {
  fireEvent.keyDown(document, { key: "m", ctrlKey: true });
  const textarea = screen.getByTestId("mockDataLoader-textarea");
  const submitButton = screen.getByTestId("mockDataLoader-loadButton");

  // Simulate typing the mock data into the textarea
  fireEvent.change(textarea, { target: { value: mockData } });

  // Click the submit button to submit the form
  fireEvent.click(submitButton);

  // Since the submission might involve asynchronous behavior (setState in MockDataLoader),
  // we need to wait for it to complete before continuing the test
  await waitFor(() => expect(textarea.value).toBe(mockData));
};

const leftClickOnCell = async (row, col) => {
  const cell = screen.getByTestId("cell-" + row + "-" + col);

  await waitFor(() => {
    fireEvent.click(cell);
  });
};

const minesweeperSteps = ({
  given: Given,
  and: And,
  when: When,
  then: Then,
}) => {
  let boardComponent;

  Given("the player opens the game", () => {
    boardComponent = render(<Board />);
  });

  Given("the player loads the following mock data:", async (mockData) => {
    await loadMockData(mockData);
  });

  When(/^the player uncovers the cell \((\d+),(\d+)\)$/, (row, col) => {
    leftClickOnCell(row, col);
  });

  Then("all the cells should be covered", () => {
    const cells = boardComponent.container.querySelectorAll(".cell");
    cells.forEach((cell) => {
      expect(cell).not.toHaveAttribute("cell.clicked");
    });
  });

  Then("all the cells should be enabled", () => {
    const cells = boardComponent.container.querySelectorAll(".cell");
    cells.forEach((cell) => {
      expect(cell).toBeEnabled();
    });
  });

  Then(/^the counter should start with (\d+)$/, (expectedInitialBombs) => {
    const flagsElement = screen.getByText(/Flags: \d+/); // Use a regular expression to match the pattern "Flags: 15"

    expect(flagsElement).toHaveTextContent(`Flags: ${expectedInitialBombs}`);
  });

  Then(/^the cell \((\d+),(\d+)\) should be disabled$/, (row, col) => {
    const cell12 = screen.getByTestId("cell-" + row + "-" + col); // Replace "cell-1-2" with the correct test ID for the cell

    expect(cell12).toHaveClass("cell clicked"); // Check if the cell has the "clicked" class
  });

  Then(/^the timer should show (\d+)$/, (expectedTime) => {
  // Wait for the timer to start counting by checking the timer element content
  const timerElement = screen.queryByTestId("timer"); // Use a regular expression to match the pattern "Time: 1" or any other number
    // Wait for the expectedTime to appear in the timer element content
    waitFor(() => {
      const timeText = timerElement.textContent;
      const currentTime = parseInt(timeText.replace("Time: ", ""));
      expect(currentTime).toBe(expectedTime);
    });
  });

  Then("the player should lose the game", () => {
    act(() => {
      // Check if the "LoseGame" component is present in the DOM
      const loseGameElement = screen.getByTestId("lose-game");
      expect(loseGameElement).toBeInTheDocument();
    });
  });
  
};

export default minesweeperSteps;

// export const righClickOnCell = (row, col) => {
//   fireEvent.contextMenu(screen.getByTestId('cell-row' + row + '-col' + col))
// }