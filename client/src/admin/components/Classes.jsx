import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import newRequest from "../../functions/newRequest";
import SingleClass from "./SingleClass";


const Classes = () => {
    const [search, setSearch] = useState("");

    const { data, isLoading, error, refetch } = useQuery({
      queryKey: ["classes"],
      staleTime: Infinity,
      cacheTime: 5 * 60 * 1000,
      queryFn: () =>
        newRequest.get(`/class?search=${search}`).then((res) => {
          return res.data;
        }),
    });
  
    useEffect(() => {
      refetch();
    }, [search]);
  
    const handleKey = (event) => {
      if (event.key === "Enter") {
        refetch();
        setSearch("");
      }
    };
  
    const handleChange = (e) => {
      setSearch(e.target.value);
    };
  
    return (
      <main className="adminClassesMain">
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
          data?.map((item) => <SingleClass key={item._id} item={item} />)
        ) : data?.length === 0 ? (
          <p>No se encontro una clase con ese nombre, intentalo de nuevo</p>
        ) : null}
      </main>
    );
}

export default Classes
