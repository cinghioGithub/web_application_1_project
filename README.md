# Exam #1: "Questionario"
## Student: s283938 BRAVI ENRICO 

## React Client Application Routes

- Route `/`: show the listof questionnaires available to compile
- Route `/login`: show the login form for authentication
- Route `/manage`: show user's questionnaires and permits to delete them or see results of them
- Route `/create`: permits to create a questionnaire
- Route `/compile/:id`: show question list of a questionnaire and permits to submit a compile. <id> is the questionnaire's id 
- Route `/result/:id`: show a results for a specific questionnaire. <id> is the questionnaire's id

## API Server

- POST `/api/login`
  - request parameters and request body content
  - response body content
- GET `/api/something`
  - request parameters
  - response body content
- POST `/api/something`
  - request parameters and request body content
  - response body content
- ...

## Database Tables

- Table `users` - contains id username hash name
- Table `questionnaires` - contains id title id_user num_submit
- Table `questions` - contains id id_questionnaire open question answer_1 answer_2 answer_3 answer_4 answer_5 answer_6 answer_7 answer_8 answer_9 answer_10 min max
- Table `answers` - contains id_compile id_questionnaire id_question answer option name open selection

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- admin1@test.it, password (plus any other requested info)
- admin2@test.it, password (plus any other requested info)
