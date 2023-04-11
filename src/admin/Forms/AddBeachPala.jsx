import React, { useEffect, useState } from "react";

const AddBeachPala = () => {
  const [person, setPerson] = useState({
    name: "Lance",
    age: "36",
    address: {
      street: "100 Some street",
      city: "Edmond",
      stateZip: { state: "Oklahoma", zip: "73034" },
    },
    contact: [
      { email: "abc@learnbestcoding.com" },
      { email: "aab@learnbestcoding.com" },
    ],
  });

  useEffect(() => {
    console.log("person", person);
  }, [person]);

  // interface person {
  //   name: string,
  //   age: string,
  //   address:{
  //     street: string,
  //     city: string,
  //     stateZip:{
  //       state: string,
  //       zip: string
  //     }
  //   },
  //   contact: {email: string}[]
  // }

  // let initialState: person = {
  //   name: "Lance",
  //   age: "36",
  //   address: {street: "100 Some street", city: "Edmond", stateZip:{state: "Oklahoma", zip: "73034"}},
  //   contact: [{email: "abc@learnbestcoding.com"}, {email: "aab@learnbestcoding.com"}]
  // }

  const inputStyle = {
    border: "1px solid black",
    height: 75,
    padding: 10,
    "text-align": "center",
  };
  const displayStyle = { border: "1px solid black", height: 250, padding: 10 };
  // const [person, setPerson] = useState<person>(initialState)

  const updatePerson = (event) => {
    const { name, value } = event;
    if (name === "name" || name === "age") {
      setPerson((prevPerson) => {
        return { ...prevPerson, [name]: value };
      });
    }
    if (name === "street" || name === "city") {
      setPerson((prevPerson) => {
        const newPerson = { ...prevPerson };
        newPerson.address[name] = value;
        return newPerson;
      });
    }
    if (name === "state" || name === "zip") {
      setPerson((prevPerson) => {
        const newPerson = { ...prevPerson };
        newPerson.address.stateZip[name] = value;
        return newPerson;
      });
    }
  };
  const addEmail = () => {
    setPerson((prev) => {
      return {
        ...prev,
        contact: [
          ...prev.contact,
          { email: Math.random() + "@learnbestcoding.com" },
        ],
      };
    });
  };

  return (
    <>
      <table>
        <tr>
          <td>
            <table style={inputStyle}>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={person.name}
                      onChange={(e) => updatePerson(e.target)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Age:</td>
                  <td>
                    <input
                      type="number"
                      name="age"
                      value={person.age}
                      onChange={(e) => updatePerson(e.target)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Street:</td>
                  <td>
                    <input
                      type="text"
                      name="street"
                      value={person.address.street}
                      onChange={(e) => updatePerson(e.target)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>City:</td>
                  <td>
                    <input
                      type="text"
                      name="city"
                      value={person.address.city}
                      onChange={(e) => updatePerson(e.target)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>State:</td>
                  <td>
                    <input
                      type="text"
                      name="state"
                      value={person.address.stateZip.state}
                      onChange={(e) => updatePerson(e.target)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Zip:</td>
                  <td>
                    <input
                      type="number"
                      name="zip"
                      value={person.address.stateZip.zip}
                      onChange={(e) => updatePerson(e.target)}
                    />
                  </td>
                </tr>
                {person.contact.map((email, index) => {
                  return (
                    <tr key={index}>
                      <td>Email:</td>
                      <td>
                        <input
                          type="text"
                          name="email"
                          value={email.email}
                          disabled
                        />
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={2}>
                    <button onClick={addEmail}>Add email</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <table style={displayStyle}>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{person.name}</td>
                </tr>
                <tr>
                  <td>Age:</td>
                  <td>{person.age}</td>
                </tr>
                <tr>
                  <td>Street:</td>
                  <td>{person.address.street}</td>
                </tr>
                <tr>
                  <td>City:</td>
                  <td>{person.address.city}</td>
                </tr>
                <tr>
                  <td>State:</td>
                  <td>{person.address.stateZip.state}</td>
                </tr>
                <tr>
                  <td>Zip:</td>
                  <td>{person.address.stateZip.zip}</td>
                </tr>
                {person.contact.map((email, index) => {
                  return (
                    <tr key={index}>
                      <td>Email:</td>
                      <td>{email.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </td>
        </tr>
      </table>
    </>
  );
};

export default AddBeachPala;
