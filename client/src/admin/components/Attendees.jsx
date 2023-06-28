import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import newRequest from '../../functions/newRequest';
import SingleAttendee from './SingleAttendee';

const Attendees = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["attendees"],
    staleTime: Infinity,
    cacheTime: 5 * 60 * 1000,
    queryFn: () =>
      newRequest.get(`/attendees?search=${search}`).then((res) => {
        return res.data;
      }),
  });

  const handleKey = (event) => {
    if (event.key === "Enter") {
      refetch();
    }
  };

  const handleChange = (e) => {
    refetch()
    setSearch(e.target.value);
  };

  return (
    <main className="p-8">
      <input
        value={search}
        type="text"
        placeholder="Buscar ..."
        onKeyDown={handleKey}
        onChange={handleChange}
        className="mb-4 p-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading ? (
        <p>Loading ... </p>
      ) : error ? (
        <p>Something went wrong</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data?.map((item) => (
            <SingleAttendee key={item.id} item={item} />
          ))}
        </div>
      )}

      {data?.length === 0 && (
        <p>No se encontró ningún asistente con ese nombre, inténtalo de nuevo.</p>
      )}
    </main>
  );
};

export default Attendees;