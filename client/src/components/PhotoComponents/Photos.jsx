import Banner from "../Banner";
import { lazy, useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import newRequest from "../../functions/newRequest";
import { useQuery } from "@tanstack/react-query";


const Photos = () => {

  const LazyClass = lazy(() => import("./PhotoCard"));
  const [collections, setCollections] = useState([]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [collections],
    staleTime: Infinity,
    queryFn: () =>
      newRequest.get(`/pics`).then((response) => {
        setCollections(response.data.collections);
      })
  })

  return (
    <section id="Photos" className="flex flex-col justify-center items-center max-w-full">
      <Banner title="Colecciones de fotos" />
    <main className="grid grid-cols-1 gap-8 p-10 md:grid-cols-2">
    {
      isLoading ? <p>Un momento</p> :
      <Pagination itemsPerPage={4} items={collections} LazyCard={LazyClass} />
    }
      {collections?.length === 0 ? (
        <p>No hay fotos de momento</p>
      ) : null}
    </main>
      </section>
  );
};

export default Photos;
