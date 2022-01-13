# VoteALot

The application is a single page application which is divided in three sections. On the first section, the user can create a poll with up to 10 options. In the central one, the user can vote by selecting one of the options and pressing the "vote" button. On the right, the chart will update based on the questions created and the votes that each question got.

## Use cases
- [x] As the owner, I want to change my poll question.
- [x] As the owner, I want to add, edit or remove the options of my poll.
- [x] As the owner, I want to reset the whole form, including answers.
- [x] As the user, I want to see the UI refresh automatically when something changes.
- [x] As the respondent, I want to send several answers.
- [x] As the respondent, I want to see the changes in real time.

## Non-functional Requirements
- [x] All fields have a limit of 80 characters.
- [x] When the limit is reached, fields should be disabled.
- [x] There should be always at least 2 options.
- [x] The user can vote as many times as possible.
- [x] The chart needs to adapt to the changes in the amount of answers or labels without missing
values.
- [x] The reset button should reset the whole UI: question, options and answers.

## Installation

1. download the project using ```git clone https://github.com/Yonathen/vote-a-lot.git```
2. make sure your node version is above ```v14.15``` 
3. To change your node version using ```nvm``` use ```nvm use v14.15```
2. access the application folder ```cd vote-a-lot```
3. install the application and related dependencies using ```npm install```

## Development server
- To Run the application execute `ng serve`
- Then Navigate to `http://localhost:4200/`

## Running unit tests
- For all commits and pull request automatic testing has been placed using CircleCi
- To run the tests locally execute ```npm run test```

## Important packages utilized
- [x] PrimeNg
- [x] ChartJs
- [x] Jest
- [x] Loadash
- [x] uuid


