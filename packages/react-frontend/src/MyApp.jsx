// src/MyApp.jsx
import React, { useState } from "react";
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
    // const [characters, setCharacters] = useState([
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
    // ]);

    function removeOneCharacter(index){
        const updated = characters.filter((character, i) => {
            return i !== index;
        });
        setCharacters(updated);
    }

  return (
    <div className="container">
      <Table 
        characterData={characters} 
        removeCharacter={removeOneCharacter}
      /> 
      <Form />
    </div>
  );
}
export default MyApp; // Makes the component available to be imported into other components or files