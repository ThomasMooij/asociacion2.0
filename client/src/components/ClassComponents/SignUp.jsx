import Select from "react-select";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import newRequest from "../../functions/newRequest";

const SignUp = ({ className,classId, days }) => {
  const [chosenDays, setChosenDays] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("")

  let finalDays = [];

  for (let i = 0; i < chosenDays.length; i++) {
    finalDays.push(chosenDays[i].value.day);
  }

  const d = new Date();
    let currentDay = d.getDay();

  const options = [];

  // als een trigger per dag voor een reset naar initial availibility ingesteld kan worden,
  // hoeft dag niet uit options gefilterd te worden aan de hand van de current day.
  // anders reset op zondag

  for (let index = 0; index < days?.length; index++) {
    if (days[index].availibility === 0 || days[index].label < currentDay) {} 
   
    else {
      options.push({ value: days[index], label: days[index].day });
    }
  }

  const mutation = useMutation({
    mutationFn: (attendee) => {
      return newRequest.post("attendees/create", attendee);
    },
  });
  
  const handleClick = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await mutation.mutateAsync({
        name: firstName + " " + lastName,
        phone: phone,
        email: email,
        class: classId,
        className: className,
        days: finalDays,
      });
  
      // Succesvolle respons verwerken
      console.log("Response:", response.data);
    } catch (error) {
        setError(error.response.data.errorMessage)
    }
  };


  return (
<aside className="h-full w-full flex flex-col items-center justify-center">
  {mutation.isSuccess ? (
    <div className="text-center">
      Gracias!
    </div>
  ) : (
    <form className="w-[80%] max-w-lg p-6 border border-solid border-lightgrey rounded-sm">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <h2 className="text-xl font-semibold mb-4">Inscribete</h2>
      <input
        value={firstName}
        name="firstName"
        type="text"
        placeholder="Nombre"
        className="w-full mb-4 p-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        value={lastName}
        name="lastName"
        type="text"
        placeholder="Apellido"
        className="w-full mb-4 p-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        value={email}
        name="email"
        type="text"
        placeholder="Correo electronico"
        className="w-full mb-4 p-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={phone}
        name="phone"
        type="text"
        placeholder="Numero de telefono"
        className="w-full mb-4 p-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setPhone(e.target.value)}
      />
      <label htmlFor="" className="block mb-2">Días disponibles esta semana:</label>
      <Select
        options={options}
        isMulti
        classNamePrefix="react-select"
        onChange={(choice) => setChosenDays(choice)}
      />
      <button onClick={handleClick} className="w-[40%] py-2 mt-4 bg-lightgreen bg-green-400 text-black rounded-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Darse de alta
      </button>
    </form>
  )}
</aside>
  )
};

export default SignUp;