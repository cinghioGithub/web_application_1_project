'use strict';

const express = require('express');
const morgan = require("morgan"); //logging middleware
const passport = require("passport"); // middleware
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const { body, validationResult } = require("express-validator"); // validation middleware

const db = require("./db.js");
const users = require("./users.js");

/***********************************
 * SERVER CONFIGURATION
***********************************/

// init express
const app = new express();
const port = 3001;

// AUTHENTICATION
passport.use(
  new LocalStrategy(function (username, password, done) {
    users.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, {
          message: "Incorrect username and/or password",
        });
      return done(null, user);
    })
    .catch( err => {
      console.log("AUTHENTICATION ERROR: ", err);
      return done(err, false, err.Error);
    });
  })
);

// SERIALIZER FOR A NEW SESSION
passport.serializeUser((user, done) => {
  console.log("SERIALIZEUSER - USER: ", user);
  done(null, user.id);
});

// DESERIALIZER FROM AN EXISTING SESSION
passport.deserializeUser((id, done) => {
  console.log("DESERIALIZEUSER - USERID: ", id);
  users.getUserById(id)
    .then((user) => {
      console.log("DESERIALIZEUSER [DONE] - USER: ", user);
      done(null, user); // this will be available in req.user
    })
    .catch((err) => {
      console.log("DESERIALIZEUSER [ERROR] - USER: ", err);
      done(err, null);
    });
});

// MIDDLEWARE INITIALIZATION
app.use(morgan("dev"));
app.use(express.json());
app.use(
  session({
    secret: "exam secret for serializing cookie",
    resave: false,
    saveUninitialized: false,
  })
);

// MIDDLEWARES CUSTOM
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()){
    return next();
  }
  return res.status(401).json({ error: "Not Authenticated" });
};

// PASSPORT INITIALIZAZION
app.use(passport.initialize());
app.use(passport.session());

 /***********************************
 *	LIST OF DATABASE API
 ***********************************/

 /* Retrive questionnaires of a user (if authenticated)*/
app.get('/api/admin/questionnaires', isLoggedIn, async (req, res) => {
  try{
    const result = await db.getQuestionnairesByUser(req.user.id);
    if (result.error) {
      return res.status(404).json(result);
    } else{
      //setTimeout(() => res.status(200).json(result), 2000);
      return res.status(200).json(result);
    }      
  }
  catch(err){
    return res.status(500).json({ error: "500 - Internal Server Error" });
  }
});

 /* Retrive questionnaires of all users */
app.get('/api/questionnaires', async (req, res) => {
  /* retrive all questionnaire to compile */
  if(req.query.id){
    try {
      const result = await db.getQuestionnaireById(req.query.id);
      if (result.error) {
        return res.status(404).json(result);
      } else {
        //setTimeout(() => res.status(200).json(result), 2000);
        return res.status(200).json(result);
      }
    }
    catch (err) {
      return res.status(500).json({ error: "500 - Internal Server Error" });
    }
  }
  else{
    try {
      const result = await db.getQuestionnaires();
      if (result.error) {
        return res.status(404).json(result);
      } else {
        //setTimeout(() => res.status(200).json(result), 2000);
        return res.status(200).json(result);
      }
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ error: "500 - Internal Server Error" });
    }
  }
});

/* retrive answer for a specific questionnaire */
app.get('/api/admin/answers', isLoggedIn, async (req, res) => {
  if(req.query.id){
    try{
      const user = await db.getUserIdQuestionnaire(req.query.id);
      if(user.error) return res.status(404).json(user);
      if(user.id_user === req.user.id){
        try {
          const result = await db.getQuestionnaireAnswers(req.query.id);
          if (result.error) {
            return res.status(404).json(result);
          } else {
            //setTimeout(() => res.status(200).json(result), 2000);
            return res.status(200).json(result);
          }
        }
        catch(err){
          return res.status(500).json({ error: "500 - Internal Server Error" });
        }
      }
      else{
        return res.status(401).json({ error: "Unauthorized" });
      }
    }
    catch(err){
      return res.status(500).json({ error: "500 - Internal Server Error" });
    }
  }
  else{
    return res.status(400).json({ error: "id NOT present in URL" });
  }
});

/* POST a new questionnaire */
app.post('/api/admin/questionnaires', [
  body("admin").isInt(),
  body("questions").custom((questions) => {
    console.log(questions);
    for(const question of questions){
      if(!Number.isInteger(question.id)) return false;
      if(!typeof question.open === 'boolean') return false;
      if(question.open === true){
        if(!typeof question.required === 'boolean') return false;
      }
      else{
        if(!Number.isInteger(question.min)) return false;
        if(!Number.isInteger(question.max)) return false;
        if(!Array.isArray(question.options)) return false;
        for (const option of question.options) {
          if (!Number.isInteger(option.id)) return false;
          if (!option.value instanceof String) return false;
        }
      }
      if(!question.title instanceof String) return false;
    }
    return true;
  }),
  body("title").isString(),
  body("compiled").isInt(),
  isLoggedIn
], async (req, res) => {   
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw res.status(422).json({ error: errors.array() });
  }
  try{
    const result = await db.createQuestionnaire(req.body);
    //setTimeout(() => res.status(200).json(result), 2000);
    return res.status(200).json(result);
  }
  catch(err){
    console.log(err);
    return res.status(500).json({ error: "500 - Internal Server Error" });
  }
});

/* POST a new compile */
app.post('/api/answers', [
  body("username").isString(),
  body("answers").custom((answers) => {
    for(const answer of answers){
      if(!typeof answer.open === 'boolean') return false;
      if(!Number.isInteger(answer.id)) return false;
      if(answer.answer){
        if(!answer.answer instanceof String) return false;
      }
      if(answer.selection){
        if(!Number.isInteger(answer.selection)) return false;
      }
      if(answer.options){
        if(!Array.isArray(answer.options)) return false;
        for(const opt of answer.options){
          if(!typeof opt === 'boolean') return false;
        }
      }
    }
    return true;
  })
],async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw res.status(422).json({ error: errors.array() });
  }
  try{
    if(req.query.id){
      const result = await db.createCompile(req.query.id, req.body);
      //setTimeout(() => res.status(200).json(result), 2000);
      return res.status(200).json(result);
    }
    else{
      return res.status(400).json({ error: "id NOT present in URL" });
    }
  }
  catch(err){
    console.log(err);
    return res.status(500).json({ error: "500 - Internal Server Error" });
  }
});

/* DELETE a questionnaire */
app.delete('/api/admin/questionnaires', isLoggedIn, async (req, res) => {
  if(req.query.id){
    try{
      const user = await db.getUserIdQuestionnaire(req.query.id);
      if(user.id_user === req.user.id){
        const result = await db.deleteQuestionnaire(req.query.id);
        //setTimeout(() => res.status(200).json(result), 2000);
        return res.status(200).json(result);
      }
      else{
        if(user.error){
          return res.status(404).json(user);
        }
        else{
          return res.status(401).json({ error: "Unauthorized" });
        }
      }
    }
    catch(err){
      return res.status(500).json({ error: "500 - Internal Server Error" });
    }
  }
  else{
    return res.status(400).json({ error: "id NOT present in URL" });
  }
});

/***********************************
 *	List of SESSION API
 ***********************************/

// POST /session
// Login
app.post('/api/sessions', function (req, res, next) {
  console.log("AUTHENTICATE SESSION SERVER API [START]");
  passport.authenticate("local", (err, user, info) => {
    if (err){
      console.log("AUTHENTICATE SESSION SERVER API [ERROR]", err);
      return next(err.Error);
    } 
    if (!user) {
      console.log("AUTHENTICATE SESSION SERVER API [FAILED]", info);
      // display wrong login messages
      return res.status(401).json(info);
    }
    console.log("AUTHENTICATE SESSION SERVER API [SUCCESS]", user);
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);
      console.log("AUTHENTICATE SESSION SERVER API [LOGIN]");
      // req.user contains the authenticated user, we send all the user info back
      // this is coming from db.getUser()
      return  res.json(req.user); //setTimeout(() => res.json(req.user), 2000);
    });
  })(req, res, next);
});


// DELETE /sessions/current 
// logout
app.delete("/api/sessions/current", (req, res) => {
  console.log("LOGOUT SERVER API");
  req.logout();
  res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get("/api/sessions/current", (req, res) => {
  console.log("CHECKSESSION SERVER API [START]");
  if (req.isAuthenticated()) {
    console.log("CHECKSESSION SERVER API [OK]: ", req.user);
    //setTimeout(() => res.status(200).json(req.user), 2000);
    return res.status(200).json(req.user);
  } else {
    const error = {error: "Unauthenticated user!"}
    console.log('CHECKSESSION SERVER API [ERROR]: ', error.error);
    return res.status(401).json(error);
  }
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});