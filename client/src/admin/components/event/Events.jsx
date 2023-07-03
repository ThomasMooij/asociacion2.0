import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import newRequest from "../../../functions/newRequest";
import CreateEvent from "./CreateEvent";
import SingleEvent from "./SingleEvent";


const Events = () => {
  const [search, setSearch] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["events"],
    staleTime: Infinity,
    cacheTime: 5 * 60 * 1000,
    queryFn: () =>
      newRequest.get(`/events?search=${search}`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 5000);
  }, [search]);

  useEffect(() => {

      refetch();

  }, [isCreating]);

  const handleKey = (event) => {
    if (event.key === "Enter") {
      refetch();
      setSearch("");
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = async (id) => {

    try{
      await newRequest.delete(`/events/delete/${id}`);
    }catch(error){
      alert(error.message)
    }   
    refetch(); // Trigger a re-fetch of data from the server
  };

  if (!isCreating) {
    return (
      <main>
      <button className="bg-blue-500 text-white rounded-lg py-2 px-4 mb-4" onClick={() => setIsCreating(true)}>Crear evento nuevo</button>
        <input
          value={search}
          type="text"
          placeholder="Buscar .."
          onKeyDown={handleKey}
          onChange={handleChange}
          className="w-full rounded-md py-2 px-3 mb-4"
        />

        {isLoading ? (
          <p>Loading ... </p>
        ) : error ? (
          <p>Something went wrong</p>
        ) : Array.isArray(data) && data.length > 0 ? (
          data?.map((item, index) => (
            <SingleEvent
              key={item.id}
              item={item}
              index={index}
              onDelete={handleDelete}
            />
          ))
        ) : data?.length === 0 ? (
          <p>De momento no hay eventos</p>
        ) : null}

      </main>
    );
  }

  if (isCreating) {
    return <CreateEvent setIsCreating={setIsCreating}/>
  }
};

export default Events;
