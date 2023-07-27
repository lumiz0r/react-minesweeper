/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
};

export default minesweeperSteps;

// export const righClickOnCell = (row, col) => {
//   fireEvent.contextMenu(screen.getByTestId('cell-row' + row + '-col' + col))
// }

// export const tagCell = (row, col, tag) => {
//   const cell = screen.getByTestId('cell-row' + row + '-col' + col)
//   const cellImage = cell.querySelector('img')
//   switch (tag) {
//     case 'mined': {
//       if (cellImage === null) {
//         fireEvent.contextMenu(cell)
//       } else if (cellImage.src.includes('question.svg')) {
//         fireEvent.contextMenu(cell)
//         fireEvent.contextMenu(cell)
//       }
//       break
//     }
//     case 'uncertain': {
//       if (cellImage === null) {
//         fireEvent.contextMenu(cell)
//         fireEvent.contextMenu(cell)
//       } else if (cellImage.src.includes('flag.svg')) {
//         fireEvent.contextMenu(cell)
//       }
//       break
//     }
//     case '':
//     case 'empty': {
//       if (cellImage.src.includes('flag.svg')) {
//         fireEvent.contextMenu(cell)
//         fireEvent.contextMenu(cell)
//       } else if (cellImage.src.includes('question.svg')) {
//         fireEvent.contextMenu(cell)
//       }
//       break
//     }
//   }
// }

// export const isGameOver = () => {
//   return screen.getByTestId('game-status').textContent === APP.GAME_STATUS_GAME_OVER
// }

// export const isGameWon = () => {
//   return screen.getByTestId('game-status').textContent === APP.GAME_STATUS_GAME_WON
// }

// export const isUncovered = (row, col) => {
//   const cell = screen.getByTestId('cell-row' + row + '-col' + col)
//   return cell.nodeName !== 'BUTTON'
// }

// export const verboseToSymbol = (verbose) => {
//   switch (verbose) {
//     case 'mined': {
//       return '!'
//     }
//     case 'uncertain': {
//       return '?'
//     }
//     case 'empty': {
//       return '0'
//     }
//     case 'a highlighted mine':
//     case 'exploded': {
//       return '@'
//     }
//     case 'a mine':
//     case 'mine': {
//       return '*'
//     }
//     case 'a wrongly tagged cell':
//     case 'wrongly': {
//       return 'x'
//     }
//     case 'covered': {
//       return '.'
//     }
//     case '1':
//     case '2':
//     case '3':
//     case '4':
//     case '5':
//     case '6':
//     case '7':
//     case '8':
//     {
//       return verbose
//     }
//     default: {
//       return verbose
//     }
//   }
// }

// export const getCellContent = (row, col) => {
//   const cell = screen.getByTestId('cell-row' + row + '-col' + col)
//   let cellValue
//   if (isUncovered(row, col)) {
//     cellValue = cell.querySelector('img')
//     if (cellValue === null) {
//       if (cell.innerHTML === '') {
//         return '0'
//       } else {
//         return cell.innerHTML
//       }
//     } else {
//       if (cellValue.src.includes('mine.svg')) {
//         return '*'
//       } if (cellValue.src.includes('explosion.svg')) {
//         return '@'
//       }
//     }
//   } else {
//     cellValue = cell.querySelector('img')
//     if (cellValue === null) {
//       return '.'
//     } else {
//       if (cellValue.src.includes('flag.svg')) {
//         return '!'
//       } if (cellValue.src.includes('question.svg')) {
//         return '?'
//       } if (cellValue.src.includes('wrongly.svg')) {
//         return 'x'
//       }
//     }
//   }
// }

// export const areAllCellsCovered = () => {
//   const mineField = screen.getByTestId('mine-field')
//   const cells = mineField.querySelectorAll('.mine-field-cell-button')
//   return cells.length === APP.NUMBER_OF_ROWS * APP.NUMBER_OF_COLUMNS
// }

// export const areAllCellsEnabledIs = (status) => {
//   let result = true
//   const mineField = screen.getByTestId('mine-field')
//   const cells = mineField.querySelectorAll('.mine-field-cell-button')
//   cells.forEach((cell) => {
//     if (cell.disabled === status) {
//       result = false
//     }
//   })
//   return result
// }

// export const isMineFieldLookLike = (expectedMineFieldStatus) => {
//   const strData = parseMockDataToString(expectedMineFieldStatus)
//   const mineField = strData.split('-').map((row) => { return row.split('') })
//   for (let row = 0; row < mineField.length; row++) {
//     for (let col = 0; col < mineField[0].length; col++) {
//       if (!getCellContent(row, col) === mineField[row][col]) {
//         return false
//       }
//     }
//   }
//   return true
// }

// export const getLeftMinesCounter = () => {
//   return screen.getByTestId('left-mines-counter').textContent
// }

// const doLogin = (user, password) => {
//   fireEvent.change(screen.getByLabelText('User'), { target: { value: user } })
//   fireEvent.change(screen.getByLabelText('Password'), { target: { value: password } })
//   fireEvent.click(screen.getByText('Login'))
// }

// export const MineSweeperSteps = {

// TheUserShouldWinTheGame () {
//   expect(screen.getByText('You win!')).toBeInTheDocument()
// },
// AllTheCellsInTheBoardShouldBeCovered () {
//   // LoginScreenSteps.IEnterUsernameAndPassword(user, password)
// }
// IAmOnTheLoginPage () {
//   render(<Game />)
// },
// IEnterAValidUsernameAndPassword () {
//   doLogin('GoodUser', 'GoodPassword')
// },
// IShouldBeLoggedIn () {
//   const welcomeElement = screen.getByText('Welcome to the app')
//   expect(welcomeElement).toBeInTheDocument()
// },
// IEnterUsernameAndPassword (user, password) {
//   doLogin(user, password)
// },
// IShouldNotBeLoggedIn () {
//   const welcomeElement = screen.getByText('Invalid credentials')
//   expect(welcomeElement).toBeInTheDocument()
// }
// }
