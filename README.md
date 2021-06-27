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

- POST `/api/sessions`
  - request body content: `{username:<username>, password:<password>}`
  - response body content: `{id: <id>, username:<username>, name:<name>}`
- GET `/api/sessions/current`
  - No requested body. Check is performed with cookie
  - response body content: `{id: <id>, username:<username>, name:<name>}`
- DELETE `/api/sessions/current`
  - No requested body
  - No response body
- GET `/api/admin/questionnaires`
  - Request body: No request body. Information about user are taken from cookie
  - Response body: A JSON object with the list of the authenticated user's questionnaires
  ```
  [{
    id: <id>,
    admin: <id_user>,
    title: <questionnaire's title>,
    compiled: <num of compiles>,
    questions: [
      { id: <id_question>, title: <title_question>, open: true, required: true },
      {
        id: <id_question>,
        title: <id_question>,
        open: false,
        min: 1,
        max: 1,
        options: [
          { id: <id_option>, value: <text_option> },
          ...
        ],
      },
      ...
    ],
  },
  ...]
  ```
- GET `/api/questionnaires`
  - Request body: No request body
  - Response body: A JSON object with the list of all available questionnaires
  ```
  [{
    id: <id>,
    title: <questionnaire's title>,
    questions: [
      { id: <id_question>, title: <title_question>, open: true, required: true },
      {
        id: <id_question>,
        title: <id_question>,
        open: false,
        min: 1,
        max: 1,
        options: [
          { id: <id_option>, value: <text_option> },
          ...
        ],
      },
      ...
    ],
  },
  ...]
  ```
- GET `/api/questionnaires?id=<id>`
  - Request body: No request body
  - Response body: A JSON object with the questionnaire with id=`<id>`
  ```
  {
    id: <id>,
    title: <questionnaire's title>,
    questions: [
      { id: <id_question>, title: <title_question>, open: true, required: true },
      {
        id: <id_question>,
        title: <id_question>,
        open: false,
        min: 1,
        max: 1,
        options: [
          { id: <id_option>, value: <text_option> },
          ...
        ],
      },
      ...
    ],
  }
  ```
- GET `/api/admin/answers?id=<id>`
  - Request body: No request body
  - Response body: A JSON object with all the answers to a specific questionnaire, which has id=`<id>`
  ```
  {
    id: <id_questionnaire>,
    compiles: [
      {
        username: <name>,
        answers: [
          { id: <id_question>, answer: <text_answer> },
          { id: <id_question>, selection: <index_of_selection> },
          { id: <id_question>, options: [false, true, false, false, true] },
          ...
        ],
      },
      ...
    ]
  }
  ```
- POST `/api/admin/questionnaires`
  - Request body: A JSON object with the questionnaire created
  ```
  {
    admin: <id_user>,
    title: <questionnaire's title>,
    compiled: 0,
    questions: [
      { id: <id_question>, title: <title_question>, open: true, required: true },
      {
        id: <id_question>,
        title: <id_question>,
        open: false,
        min: 1,
        max: 1,
        options: [
          { id: <id_option>, value: <text_option> },
          ...
        ],
      },
      ...
    ],
  }
  ```
  - Response body: A JSON object with the id of the created questionnaire
  ```
  { id_questionnaire: <id> }
  ```
- POST `/api/answers?id=<id>`
  - Request body: A JSON object with answers for the questionnaire with id=`<id>`
  ```
  {
    username: <name>,
    answers: [
      { id: <id_question>, answer: <text_answer> },
      { id: <id_question>, selection: <index_of_selection> },
      { id: <id_question>, options: [false, true, false, false, true] },
      ...
    ],
  }
  ```
  - Response body: A JSON object with the id of the answers' questionnaire 
  ```
  { id_questionnaire: <id> }
  ```
- DELETE `/api/admin/questionnaires?id=<id>`
  - Request body: No request body
  - Response body: A JSON object with the id of the deleted questionnaire 
  ```
  { id_questionnaire: <id> }
  ```
## Database Tables

- Table `users` - contains id username hash name
- Table `questionnaires` - contains id title id_user num_submit
- Table `questions` - contains id id_questionnaire open question answer_1 answer_2 answer_3 answer_4 answer_5 answer_6 answer_7 answer_8 answer_9 answer_10 min max
- Table `answers` - contains id_compile id_questionnaire id_question answer option name open selection

## Main React Components

- `Main` (in `Main.js`): component purpose and main functionality
- `QuestionnaireCompile` (in `QuestionnaireCompile.js`): component purpose and main functionality
- `QuestionnaireCreate` (in `QuestionnaireCreate.js`): component purpose and main functionality
- `QuestionnaireResult` (in `QuestionnaireResult.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- admin1@test.it, password (plus any other requested info)
- admin2@test.it, password (plus any other requested info)
