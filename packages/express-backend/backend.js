// backend.js
import express from "express"; // importing the express module
import cors from "cors"; // import the express library cors

const app = express(); // create an instance of express
const port = 8000; // port number to listen to HTTP requests

app.use(cors()); // enable all cors requests
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

// const findUserByName = (name) => {
//     return users["users_list"].filter(
//       (user) => user["name"] === name
//     );
//   };
  
//   app.get("/users", (req, res) => {
//     const name = req.query.name; // access query arg
//     if (name != undefined) {
//       let result = findUserByName(name);
//       result = { users_list: result };
//       res.send(result);
//     } else {
//       res.send(users);
//     }
// });

const generateID = () => {
  const IDchars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += IDchars.charAt(Math.floor(Math.random() * IDchars.length));
  }
  return id;
};

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
  const newUser = {...user, id: generateID()};
  users.users_list.push(newUser);
  return newUser;
};
  
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const newUser = addUser(userToAdd);
  const newUserResp = {
    id: newUser.id,
    ...newUser
  };
  res.status(201).json(newUserResp);
});

// app.delete("/users", (req, res) => {
//   const { id } = req.body;
//   const userToDelete = findUserById(id);
//   if (userToDelete === undefined) {
//     res.status(404).send("Resource not found.");
//   } else {
//     const index = users.users_list.findIndex(user => user.id === id); // Corrected findIndex usage
//     users.users_list.splice(index, 1);
//     res.status(201).send(users);
//   }
// });

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const userToDelete = findUserById(id);
  if (!userToDelete) {
    res.status(404).send("Resource not found.");
  } else {
    const index = users.users_list.findIndex(user => user.id === id);
    users.users_list.splice(index, 1);
    res.status(204).send(); // Respond with 204 No Content for successful deletion
  }
});


const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
      (user) => user["name"] === name && user["job"] === job
  );
};

app.get("/users", (req, res) => {
  const { name, job } = req.query; // access query args
  if (name && job) {
      let result = findUserByNameAndJob(name, job);
      result = { users_list: result };
      res.send(result);
  } else if (name) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
  } else {
      res.send(users);
  }
});

app.get("/", (req, res) => { // set up first API endpoint (URL Pattern) (request, response)
  res.send("Hello World!");
});

// app.get("/users", (req, res) => {
//     res.send(users);
// });

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});