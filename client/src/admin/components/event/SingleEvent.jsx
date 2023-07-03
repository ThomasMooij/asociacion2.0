import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Delete, Check, Close, Edit } from "@mui/icons-material";
import newRequest from "../../../functions/newRequest.js";
import { months, years } from "../../times.js";

const SingleEvent = ({ key, item, index, onDelete }) => {
  const [eventInfo, setEventInfo] = useState(item);
  const [editing, setEditing] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEventInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const updateEvent = async () => {
    try {
      await newRequest.put(`/events/update/${item._id}`, { ...eventInfo });

      setEditing(false)
    } catch (error) {
      alert(error.message);
    }
  };

  console.log(eventInfo)

  return (
    <main className="p-4">
      <button 
      onClick={() => setEditing(!editing)}
      className="bg-white rounded-md p-4 shadow-md flex gap-2">
        <p>{index + 1} Cambiar datos del evento '{eventInfo.name}'</p>
        <Edit />
      </button>
    {editing &&
    <>
      <div className="mb-4">
        <label className="block mb-2">Nombre</label>
        <div className="flex items-center">
          <input
            name="name"
            type="text"
            placeholder=""
            value={eventInfo.name}
            onChange={handleChange}
            className="w-full rounded-md py-2 px-3"
            />
     
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Dia:</label>
        <div className="flex items-center">
          <input
            name="day"
            type="text"
            placeholder=""
            value={eventInfo.day}
            onChange={handleChange}
            className="w-full rounded-md py-2 px-3"
          />
      
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Mes:</label>
        <div className="flex items-center">
          <select
            name="month"
            value={eventInfo.month}
            onChange={handleChange}
            className="w-full rounded-md py-2 px-3"
          >
            {months.map((month, i) => (
                <option key={i} selected={month.value === eventInfo.month}>
                {month.value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Año:</label>
        <div className="flex items-center">
          <select
            name="year"
            value={eventInfo.year}
            onChange={handleChange}
            className="w-full rounded-md py-2 px-3"
            >
            {years.map((year, i) => (
              <option key={i}>{year.value}</option>
              ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Descripción</label>
        <div className="flex items-center">
          <input
            name="description"
            type="text"
            value={eventInfo.description}
            onChange={handleChange}
            className="w-full rounded-md py-2 px-3"
            />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Ubicación</label>
        <div className="flex items-center">
          <input
            name="location"
            type="text"
            value={eventInfo.location}
            onChange={handleChange}
            className="w-full rounded-md py-2 px-3"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Check onClick={updateEvent} className="cursor-pointer" />
        <Close onClick={() => setEditing(false)} className="cursor-pointer" />
        <Delete onClick={() => onDelete(item._id)} className="cursor-pointer" />
      </div>
    </>
      
      }
    </main>
  );
};

export default SingleEvent;
