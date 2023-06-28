import { lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../functions/newRequest";
import Pagination from "../Pagination/Pagination";

const ClassList = ({ search }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["classes"],
    staleTime: Infinity,
    cacheTime: 5 * 60 * 1000,
    queryFn: () =>
      newRequest.get(`/class?search=${search}`).then((res) => {
        return res.data;
      }),
  });

  const LazyClass = lazy(() => import("./ClassCard"));

  function isMobileScreen() {
    return window.innerWidth < 768; 
  }

  const numOfClasses = isMobileScreen ? 2 : 4

  return (
    <section className="grid grid-cols-1  gap-4 mx-auto max-w-5xl mt-8 md:grid-cols-2 ">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Something went wrong</p>
      ) : (
        <Pagination itemsPerPage={numOfClasses} items={data} LazyCard={LazyClass} />
      )}
      {data?.length === 0 ? (
        <p>No se encontró una clase con ese nombre, inténtalo de nuevo</p>
      ) : null}
    </section>
  );
};

export default ClassList;
