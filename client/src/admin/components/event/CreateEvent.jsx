import { useState } from "react";
import { days, months, years } from "../../times"
import { useNavigate } from "react-router-dom";
import newRequest from "../../../functions/newRequest";
import { TextField } from "@mui/material";

const CreateEvent = ({setIsCreating}) => {
  const [event, setEvent] = useState({
    name: "",
    day: 0,
    month: 0,
    year: 2023,
    description: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = async (e) => {
    setEvent((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const createEvent = async(e) => {
    try{
        await newRequest.post("events/create", {
          ...event
        })
      navigate('/admin')
      alert("event added!")
    }catch(error){
      alert(error)
    }
  }

  return (
    <main className="flex flex-col items-center  min-h-screen bg-gray-100">
    <button
        className="bg-blue-500 text-white rounded-lg py-2 px-4 mb-4"
        onClick={() => setIsCreating(false)}
      >Ver todos los eventos</button>
      <div className="max-w-md px-4 py-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Crear Evento</h1>
        <div className="mb-4">
          <label className="block mb-2">Nombre:</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            className="w-full rounded-md py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Descripción:</label>
          <TextField
            name="description"
            type="text"
            onChange={handleChange}
            className="w-full rounded-md py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Ubicación:</label>
          <input
            name="location"
            type="text"
            onChange={handleChange}
            className="w-full rounded-md py-2 px-3"
          />
        </div>

        <div className="flex mb-4">
          <div className="mr-4">
            <label className="block mb-2">Día:</label>
            <input
              name="day"
              type="text"
              onChange={handleChange}
              className="w-20 rounded-md py-2 px-3"
            />
          </div>

          <div className="mr-4">
            <label className="block mb-2">Mes:</label>
            <select
              name="month"
              onChange={handleChange}
              className="w-40 rounded-md py-2 px-3"
            >
              {months.map((month) => (
                <option key={month.value}>{month.value}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Año:</label>
            <select
              name="year"
              onChange={handleChange}
              className="w-32 rounded-md py-2 px-3"
            >
              {years.map((year) => (
                <option key={year.value}>{year.value}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={createEvent}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Crear Evento
        </button>
      </div>
    </main>
  );
};

export default CreateEvent;
