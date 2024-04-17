// src/MyApp.jsx
import React, { useState, useEffect } from "react"; // Add in useEffect
import Table from "./Table"; // Load Table in
import Form from "./Form"; //Load in Form

// //Props /*The data was contained as a constant*/
// const characters = [ 
//     {
//         name: "Charlie",
//         job: "Janitor"
//     },
//     {
//         name: "Mac",
//         job: "Bouncer"
//     },
//     {
//         name: "Dee",
//         job: "Aspiring actress"
//     },
//     {
//         name: "Dennis",
//         job: "Bartender"
//     }
// ];

function MyApp() { // React Component // Pass the data to the "Table" child component
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index){
        const updated = characters.filter((character, i) => {
            return i !== index;
        });
        setCharacters(updated);
    }

    function updateList(person){
        setCharacters([...characters, person]);
    }

    function fetchUsers(){
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    useEffect(() => {
      fetchUsers()
            .then((res) => res.json()) // json format
            .then((json) => setCharacters(json["users_list"])) // call setCharacters
            .catch((error) => {console.log(error);}); // error resolving
    }, []);

  return (
    <div className="container">
      <Table 
        characterData={characters} 
        removeCharacter={removeOneCharacter}
      /> 
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp; // Makes the component available to be imported into other components or files