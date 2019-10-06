
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https = require('https');

const url1 ='https://api.github.com/users/';
const url2 ='https://api.github.com/search/users';
const fetch = require('node-fetch');

async function makeRequest(url) {
  const config = {
    method: "GET"
  };
  try {
    const response = await fetch(url, config);
    return {
      "status": response.status,
      "payload": await response.json()
    }
  }
  catch (error) {
    console.log(error);
    return {
      "status": null,
      "payload": error.message
    }
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  next();

});

app.get("/search", async (req, res, next) => {
  let final_obj=[];
  let q = req.query.q;
  let page = req.query.page;
  let pageSize = req.query.size;
  let url=url2+'?' +'q=' +q+'&page='+page+'&per_page='+pageSize;
  let data = await makeRequest(url);
  for(let i =0;i<data.payload.items.length;i++){
    let user= data.payload.items[i].login;
    let userData = await makeRequest(url1+user);
    console.log(userData);
    let my_obj={
      id:i,
      name:userData.payload.name,
      handler: userData.payload.login,
      repos:userData.payload.public_repos,
      followers:userData.payload.followers,
      bio:userData.payload.bio,
      following:userData.payload.following,
      profileUrl:userData.payload.avatar_url,
      company:userData.payload.company
    };
    final_obj.push(my_obj);
  }
  console.log(final_obj);
  res.setHeader("Content-Type",'application/json');
  res.type('json').status(200).json({
    message: 'success',
    object: final_obj
  });

});

app.get("/user/:id", async (req, res, next) => {
  let user = req.params.id;
  let data = await makeRequest(url1+user);

  let my_obj={
    name:data.payload.name,
    handler: data.payload.login,
    repos:data.payload.public_repos,
    followers:data.payload.followers,
    bio:data.payload.bio,
    following:data.payload.following,
    profileUrl:data.payload.avatar_url,
   company:data.payload.company

  };

  res.setHeader("Content-Type",'application/json');

  res.type('json').status(200).json({
      message: 'success',
      object:my_obj
    });

});

module.exports = app;
