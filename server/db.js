"use strict";

const sqlite = require("sqlite3");
const db = new sqlite.Database("exam.db", (err) => {
  if (err) throw err;
});

/* retrive questionnaire's questions */
const getQuestionnaireQuestions = (id_questionnaire) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * from questions WHERE id_questionnaire=?";
    db.all(sql, [id_questionnaire], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length === 0) {
          resolve({ error: "Database Error - Get Questionnaires's questions" });
        } else {
          const questionsList = rows.map((row) => {
            let closeQuestion;
            let openQuestion;
            if (row.open === 0) {
              closeQuestion = {
                id: row.id,
                title: row.question,
                open: row.open === 1,
                min: row.min,
                max: row.max,
                options: [],
              };
              if (row.answer_1)
                closeQuestion.options.push({ id: 1, value: row.answer_1 });
              if (row.answer_2)
                closeQuestion.options.push({ id: 2, value: row.answer_2 });
              if (row.answer_3)
                closeQuestion.options.push({ id: 3, value: row.answer_3 });
              if (row.answer_4)
                closeQuestion.options.push({ id: 4, value: row.answer_4 });
              if (row.answer_5)
                closeQuestion.options.push({ id: 5, value: row.answer_5 });
              if (row.answer_6)
                closeQuestion.options.push({ id: 6, value: row.answer_6 });
              if (row.answer_7)
                closeQuestion.options.push({ id: 7, value: row.answer_7 });
              if (row.answer_8)
                closeQuestion.options.push({ id: 8, value: row.answer_8 });
              if (row.answer_9)
                closeQuestion.options.push({ id: 9, value: row.answer_9 });
              if (row.answer_10)
                closeQuestion.options.push({ id: 10, value: row.answer_10 });
            } else {
              openQuestion = {
                id: row.id,
                title: row.question,
                open: row.open === 1,
                required: row.min === 1 && row.max === 1 ? true : false,
              };
            }
            return row.open === 1 ? openQuestion : closeQuestion;
          });
          resolve(questionsList);
        }
      }
    });
  });
};

/* retrive questionnaires */
exports.getQuestionnaires = () => {
  return new Promise(async (resolve, reject) => {
    const sql = "SELECT * from questionnaires";
    db.all(sql, [], async (err, rows) => {
      if (err) {
        reject(err); //TODO
      } else {
        if (rows.length === 0) {
          resolve({ error: "Database Error - Get Questionnaires" });
        } else {
          const questionnaireList = rows.map((row) => {
            return {
              id: row.id,
              title: row.title,
              /*compiled: row.num_submit,*/
              /*admin: row.id_user,*/
              questions: [],
            };
          });
          for (let questionnaire of questionnaireList) {
            try {
              const questions = await getQuestionnaireQuestions(questionnaire.id);
              questionnaire.questions = [...questions];
            } catch (err) {
              reject(err);
            }
          }
          resolve(questionnaireList);
        }
      }
    });
  });
};

/* retrive questionnaire by id */
exports.getQuestionnaireById = (id) => {
  return new Promise(async (resolve, reject) => {
    const sql = "SELECT * from questionnaires WHERE id=?";
    db.all(sql, [id], async (err, rows) => {
      if (err) {
        reject(err); //TODO
      } else {
        if (rows.length === 0) {
          resolve({ error: "Database Error - Get questionnaire by id" });
        } else {
          const questionnaireList = rows.map((row) => {
            return {
              id: row.id,
              title: row.title,
              compiled: row.num_submit,
              admin: row.id_user,
              questions: [],
            };
          });
          try {
            const questions = await getQuestionnaireQuestions(
              questionnaireList[0].id
            );
            questionnaireList[0].questions = [...questions];
          } catch (err) {
            reject(err);
          }
          resolve(questionnaireList[0]);
        }
      }
    });
  });
};

/* retrive questionnaires by user id*/
exports.getQuestionnairesByUser = (user) => {
  return new Promise(async (resolve, reject) => {
    const sql = "SELECT * from questionnaires WHERE id_user=?";
    db.all(sql, [user], async (err, rows) => {
      if (err) {
        reject(err); //TODO
      } else {
        if (rows.length === 0) {
          resolve({ error: "Database Error - Get questionnaires" });
        } else {
          const questionnaireList = rows.map((row) => {
            return {
              id: row.id,
              title: row.title,
              compiled: row.num_submit,
              admin: row.id_user,
              questions: [],
            };
          });
          for (let questionnaire of questionnaireList) {
            try {
              const questions = await getQuestionnaireQuestions(questionnaire.id);
              questionnaire.questions = [...questions];
            } catch (err) {
              reject(err);
            }
          }
          resolve(questionnaireList);
        }
      }
    });
  });
};

/* retrive questionnaire answers*/
exports.getQuestionnaireAnswers = (id_questionnaire) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * from answers WHERE id_questionnaire=?";
    db.all(sql, [id_questionnaire], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length === 0) {
          resolve({ error: "Database Error - Get Questionnaire's Answers" });
        } else {
          const idCompileList = rows.map((row) => {
            return row.id_compile;
          });
          const setIdCompile = [...new Set(idCompileList)]; //distinct name of compilations
          let questionnaireList = {
            id: id_questionnaire,
            compiles: [],
          };
          for (const id_compile of setIdCompile) {
            let compile = {
              username: '',
              answers: [],
            };
            for (const row of rows) {
              if (row.id_compile === id_compile) {
                if(!compile.username) compile.username = row.name;
                compile.answers.push(
                  row.open === 1
                    ? {
                        id: row.id_question,
                        answer: row.answer,
                      }
                    : row.selection
                    ? {
                        id: row.id_question,
                        selection: row.selection,
                      }
                    : {
                        id: row.id_question,
                        options: JSON.parse(row.options),
                      }
                );
              }
            }
            questionnaireList.compiles.push(compile);
          }
          resolve(questionnaireList);
        }
      }
    });
  });
};

/* create a question for a questionnaire */
const createQuestion = (question, id_questionnaire) => {
  return new Promise((resolve, reject) => {
    const openSql =
      "INSERT INTO questions(id,id_questionnaire,open,question,answer_1,answer_2,answer_3,answer_4,answer_5,answer_6,answer_7,answer_8,answer_9,answer_10,min,max) VALUES(?,?,?,?,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,?,?)";
    const closeSql =
      "INSERT INTO questions(id,id_questionnaire,open,question,answer_1,answer_2,answer_3,answer_4,answer_5,answer_6,answer_7,answer_8,answer_9,answer_10,min,max) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    let options = [];
    if (question.open === false) {
      const arrayNull = [];
      for (let i = 0; i < 10 - question.options.length; i++) {
        arrayNull.push(null);
      }
      options = question.options.map((val) => val.value);
      options = [...options, ...arrayNull];
    }
    db.run(
      question.open === true ? openSql : closeSql,
      question.open === true
        ? [
            question.id,
            id_questionnaire,
            question.open,
            question.title,
            question.required ? 1 : 0,
            1,
          ]
        : [
            question.id,
            id_questionnaire,
            question.open,
            question.title,
            ...options,
            question.min,
            question.max,
          ],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id_question: question.id });
        }
      }
    );
  });
};

/* create a questionnaire */
exports.createQuestionnaire = (questionnaire) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO questionnaires(title,id_user,num_submit) VALUES(?,?,?)";
    db.run(sql, [questionnaire.title, questionnaire.admin, questionnaire.compiled], async function(err){
      if (err) {
        reject(err);
      } else {
        const id_questionnaire = this.lastID;
        console.log(id_questionnaire);
        for (const question of questionnaire.questions) {
          try {
            const res = await createQuestion(question, id_questionnaire);
          } catch (err) {
            reject(err);
          }
        }
        resolve({ id_questionnaire: questionnaire.id });
      }
    });
  });
};

const getMaxId = () => {
  return new Promise((resolve, reject) => {
    const sql = "select max(id_compile) as maxId from answers";
    db.get(sql, [], (err, row) => {
      if (err) reject(err);
      else {
        if (row) resolve(row.maxId);
        else resolve(0);
      }
    });
  });
};

const updateCompileNumber = (id_questionnaire) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE questionnaires SET num_submit=num_submit+1 WHERE id=?";
    db.get(sql, [id_questionnaire], (err, row) => {
      if (err) reject(err);
      else {
        resolve(id_questionnaire);
      }
    });
  });
};

/* insert a single answer fo a specific questionnaire */
exports.createAnswer = (id_compile, id_questionnaire, answer, username) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO answers(id_compile,id_questionnaire,id_question,answer,options,name,open,selection) VALUES(?,?,?,?,?,?,?,?)";
    db.run(
      sql,
      [
        id_compile,
        id_questionnaire,
        answer.id,
        answer.answer ? answer.answer : null,
        answer.options ? JSON.stringify(answer.options) : null,
        username,
        answer.open === true ? 1 : 0,
        answer.selection ? answer.selection : null,
      ],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id_answer: answer.id });
        }
      }
    );
  });
  
};

/* create a new compile fo a specific questionnaire */
exports.createCompile = (id_questionnaire, compile) => {
  return new Promise(async (resolve, reject) => {
    let maxId = -1;
    try{
      maxId = await getMaxId();
      const id = await updateCompileNumber(id_questionnaire);
    }
    catch(err){
      reject(err);
    }
    for (const answer of compile.answers) {
      try {
        const res = await this.createAnswer(
          maxId + 1,
          id_questionnaire,
          answer,
          compile.username
        );
      } catch (err) {
        reject(err);
      }
    }
    resolve({ id_questionnaire: id_questionnaire });
  });
};

/* delete answers for a specific questionnaire */
exports.deleteAnswers = (id_questionnaire) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM answers WHERE id_questionnaire=?";
    db.run(sql, [id_questionnaire], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ id_questionnaire: id_questionnaire });
      }
    });
  });
};
/* delete questions for a specific questionnaire */
exports.deleteQuestions = (id_questionnaire) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM questions WHERE id_questionnaire=?";
    db.run(sql, [id_questionnaire], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ id_questionnaire: id_questionnaire });
      }
    });
  });
};

/* delete a specific questionnaire */
exports.deleteQuestionnaire = (id_questionnaire) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM questionnaires WHERE id=?";
    db.run(sql, [id_questionnaire], async (err) => {
      if (err) {
        reject(err);
      } else {
        try {
          const answers = await this.deleteAnswers(id_questionnaire);
          const questions = await this.deleteQuestions(id_questionnaire);
          resolve({ id_questionnaire: id_questionnaire });
        } catch (err) {
          reject(err);
        }
      }
    });
  });
};

/* get user id of a specific questionnaire */
exports.getUserIdQuestionnaire = (id_questionnaire) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id_user FROM questionnaires WHERE id=?";
    db.all(sql, [id_questionnaire], (err, rows) => {
      if (err) {
        reject(err); //TODO
      } else {
        if (rows.length === 0) {
          resolve({ error: "Database Error - Get questionnaires" });
        } else {
          const id_user = rows[0].id_user;
          resolve({ id_user: id_user });
        }
      }
    });
  });
};

const main = async () => {
  // const res = await this.getQuestionnaires();
  // console.log(res);
  // console.log(res[0].questions);
  // console.log(res[1].questions);
  // const res = await this.getQuestionnaireAnswers(1);
  // console.log(res.compiles[0].answers);
  // const questionnaire = {
  //   id: 3,
  //   admin: 1,
  //   title: "Your Favourite foods and Drinks",
  //   compiled: 2,
  //   questions: [
  //     { id: 1, title: "Question 1", open: true, required: true },
  //     {
  //       id: 2,
  //       title: "Question 2",
  //       open: false,
  //       min: 1,
  //       max: 1,
  //       options: [
  //         { id: 1, value: "si" },
  //         { id: 2, value: "no" },
  //         { id: 3, value: "forse" },
  //       ],
  //     },
  //     { id: 3, title: "Question 3", open: true, required: true },
  //     {
  //       id: 4,
  //       title: "Question 4",
  //       open: false,
  //       min: 1,
  //       max: 4,
  //       options: [
  //         { id: 1, value: "si" },
  //         { id: 2, value: "no" },
  //         { id: 3, value: "forse" },
  //         { id: 4, value: "più si che no" },
  //         { id: 5, value: "più no che si" },
  //         { id: 6, value: "più no che si 2" },
  //       ],
  //     },
  //     { id: 5, title: "Question 5", open: true, required: true },
  //   ],
  // };
  // const res = await this.createQuestionnaire(questionnaire);
  // console.log(res);
  // const res = await this.getQuestionnaireById(1);
  // console.log(res);
  // const compile = {
  //   username: "Enrico",
  //   answers: [
  //     { id: 1, answer: "Answer 111" },
  //     { id: 2, selection: 3 },
  //     { id: 3, answer: "Answer 3333" },
  //     { id: 4, options: [false, false, true, true, false] },
  //     { id: 5, answer: "Answer 544" },
  //   ],
  // };
  // const res = await this.createCompile(3, compile);
  // console.log(res);
  // const res = await this.deleteQuestionnaire(3);
  // console.log(res);
  // const res = await this.getUserIdQuestionnaire(3);
  // console.log(res);
};

main();
