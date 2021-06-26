/* retrive from server questionnaires */
async function getQuestionnaires() {
  const response = await fetch("/api/questionnaires");
  if (response.ok) {
    const questionnaires = await response.json();
    return questionnaires;
  } else {
    const error = await response.json();
    throw error;
  }
}

async function getQuestionnaireById(id) {
  const response = await fetch(`/api/questionnaires?id=${id}`);
  if (response.ok) {
    const questionnaire= await response.json();
    return questionnaire;
  } else {
    const error = await response.json();
    throw error;
  }
}

/* retrive questionnaires of an authenticated admin */
async function getAdminQuestionnaires() {
  const response = await fetch("/api/admin/questionnaires");
  if (response.ok) {
    const questionnaires = await response.json();
    return questionnaires;
  } else {
    if(response.status === 404){
      return [];
    }
    const error = await response.json();
    throw error;
  }
}

/* create a questionnaire (just for admin) */
async function insertQuestionnaire(questionnaire) {
  const response = await fetch("/api/admin/questionnaires", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(questionnaire),
  });
  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    const error = await response.json();
    throw error;
  }
}

/* retrive answers of a questionnaire (just for admin) */
async function getAnswers(id_questionnaire) {
  const response = await fetch(`/api/admin/answers?id=${id_questionnaire}`);
  if (response.ok) {
    const answers = await response.json();
    return answers;
  } else {
    const error = await response.json();
    throw error;
  }
}
/*create a compile for a questionnaire */
async function insertAnswer(id_questionnaire, compile) {
  const response = await fetch(`/api/answers?id=${id_questionnaire}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(compile),
  });
  if (response.ok) {
    const answers = await response.json();
    return answers;
  } else {
    const error = await response.json();
    throw error;
  }
}

/* delete a questionnaire */
async function deleteQuestionnaire(id_questionnaire) {
  const response = await fetch(`/api/admin/questionnaires?id=${id_questionnaire}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const id_questionnaire = await response.json();
    return id_questionnaire;
  } else {
    const error = await response.json();
    throw error;
  }
}

async function logIn(credentials) {
  console.log("LOGIN CLIENT API [credential] : ", credentials);
  let response = await fetch("/api/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    if (response.status !== 401) {
      const error = {
        message: "Database error",
      };
      throw error;
    } else {
      const responseBody = await response.json();
      console.log(responseBody);
      if (responseBody.message) throw responseBody;
    }
  }
}

async function logOut() {
  await fetch("/api/sessions/current", { method: "DELETE" });
}

async function checkSession() {
  //console.log("CHECK SESSION CLIENT API [START]");
  const response = await fetch("/api/sessions/current");
  const userInfo = await response.json();
  if (response.ok) {
    //console.log("CHECK SESSION CLIENT API [OK]", userInfo);
    return userInfo;
  } else {
    throw userInfo;
  }
}

const API = {
  logIn,
  logOut,
  checkSession,
  getQuestionnaires,
  getAdminQuestionnaires,
  insertQuestionnaire,
  getAnswers,
  insertAnswer,
  deleteQuestionnaire,
  getQuestionnaireById,
};
export default API;
