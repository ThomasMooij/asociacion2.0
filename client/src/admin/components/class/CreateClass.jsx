import { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../../functions/newRequest";

const CreateClass = ({ setIsCreating }) => {
  const [chosenDays, setChosenDays] = useState([]);
  const [chosenCollection, setChosenCollection] = useState([]);
  const [array, setArray] = useState([
    {
      day: "",
      availability: 0,
      initialAvailability: 0,
    },
  ]);
  const [classInfo, setClassInfo] = useState({
    name: "",
    days: array,
    price: 0,
    location: "",
    teacher: "",
    description: "",
    collectionName: [],
  });

  const handleChange = (e) => {
    setClassInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const setDays = (num, day, avail, event) => {
    array.push({
      day: day,
      availability: avail,
      initialAvailability: avail,
      label: num,
    });
    event.currentTarget.disabled = true;
  };

  const options = [
    { num: 1, value: "lunes", label: "Lunes" },
    { num: 2, value: "martes", label: "Martes" },
    { num: 3, value: "miercoles", label: "Miércoles" },
    { num: 4, value: "jueves", label: "Jueves" },
    { num: 5, value: "viernes", label: "Viernes" },
    { num: 6, value: "sabado", label: "Sábado" },
    { num: 7, value: "domingo", label: "Domingo" },
  ];

  const navigate = useNavigate();

  const createClass = async (e) => {
    e.preventDefault();
    try {
      await newRequest.post("class/create", {
        ...classInfo,
      });
      navigate("/admin");
      alert("Class added!");
    } catch (error) {
      alert(error);
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    staleTime: Infinity,
    cacheTime: 5 * 60 * 1000,
    queryFn: () =>
      newRequest.get(`/pics`).then((res) => {
        return res.data;
      }),
  });

  let currentCollections = [];
  if (data?.collections) {
    data.collections.map((item) => {
      currentCollections.push({ value: item.title, label: item.title });
    });
  }

  const handleCollection = (choice) => {
    const chosenCollectionValues = choice.map((item) => item.value);
    setChosenCollection(chosenCollectionValues);
  };

  useEffect(() => {
    setClassInfo((prevState) => ({
      ...prevState,
      collectionName: chosenCollection,
    }));
  }, [chosenCollection]);

  return (
    <main className="flex flex-col items-center">
      <button
        className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-4"
        onClick={createClass}
      >
        Crear Clase
      </button>
      <button
        className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-4"
        onClick={() => setIsCreating(false)}
      >
        Ver todas las clases
      </button>
      <section className="mt-8 w-full sm:w-96">
        <label className="text-lg mb-2" htmlFor="name">
          Nombre de la clase
        </label>
        <input
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
          name="name"
          type="text"
          onChange={handleChange}
        />
        <label className="text-lg mb-2" htmlFor="price">
          Precio
        </label>
        <input
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
          placeholder="Siempre en euro"
          name="price"
          type="text"
          onChange={handleChange}
        />
        <label className="text-lg mb-2" htmlFor="location">
          Ubicación
        </label>
        <input
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
          name="location"
          type="text"
          onChange={handleChange}
        />
        <label className="text-lg mb-2" htmlFor="teacher">
          Profesor/a
        </label>
        <input
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
          name="teacher"
          type="text"
          onChange={handleChange}
        />
        <label className="text-lg mb-2" htmlFor="description">
          Descripción
        </label>
        <textarea
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
          name="description"
          type="textarea"
          rows="4"
          cols="50"
          onChange={handleChange}
        />

        <label htmlFor="collection">Colecciones de fotos</label>
        <Select
          options={currentCollections}
          isMulti
          onChange={handleCollection}
          className="mb-4"
        />

        <label htmlFor="days">Días</label>
        <Select
          options={options}
          isMulti
          onChange={setChosenDays}
          className="mb-4"
        />
      </section>
      <section className="w-full sm:w-96">
        {chosenDays.map((day) => (
          <article key={day.num} className="flex items-center mb-4">
            <label htmlFor="availability" className="text-lg">
              Disponibilidad {day.value}:
            </label>
            <input
              min="0"
              type="number"
              name="availability"
              className="border border-gray-300 rounded-lg p-2 ml-4"
              onChange={(e) => {
                day.availability = e.target.value;
              }}
            />
            <button
              className="bg-blue-500 text-white rounded-lg py-2 px-4 ml-4 disabled:opacity-50"
              onClick={(event) => {
                setDays(day.num, day.value, day.availability, event);
              }}
              disabled={day.availability === 0}
            >
              Subir
            </button>
          </article>
        ))}
      </section>
    </main>
  );
};

export default CreateClass;
