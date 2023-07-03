import {  lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import newRequest from "../../functions/newRequest";
import Pagination from "../Pagination/Pagination";

const EventList = ({ event }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["events"],
    staleTime: Infinity,
    cacheTime: 5 * 60 * 1000,
    queryFn: () =>
      newRequest
        .get(
          `/events?month=${event.selectedValue}&search=${event.search}&year=`
        )
        .then((res) => {
          return res.data;
        }),
  });

  const LazyEvent = lazy(() => import("./EventCard"));

  useEffect(() => {
    if(event.search) {
      event.selectedValue = ""
    }
    refetch();
    event.search =""
  }, [event]);

  return (
    <div className="flex justify-center items-center flex-col gap-2">
      {
        data?.length === 0 ? <p>"No hay eventos para estas fechas" </p> :
        <Pagination itemsPerPage={3} items={data} LazyCard={LazyEvent} />
      }
    </div>
  );
};

export default EventList;
