// backend.js
import express from "express"; // importing the express module

const app = express(); // create an instance of express
const port = 8000; // port number to listen to HTTP requests

app.use(express.json()); // set up express app to process incoming data in JSON format

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "StuntMan"
      }
    ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };
  
  app.get("/users", (req, res) => {
    const name = req.query.name; // access query arg
    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
});

const findUserById = (id) =>
users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};
  
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.delete("/users", (req, res) => {
  const id = req.body;
  let userToDelete= findUserById(id);
  if(userToDelete === undefined){
    res.status(404).send("Resource not found.");
  }else{
    const index = users.users_list.findIndex(user => user.id);
    users.users_list.splice(index, 1);
    res.send(result);
  }
});

app.get("/", (req, res) => { // set up first API endpoint (URL Pattern) (request, response)
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
    res.send(users);
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});