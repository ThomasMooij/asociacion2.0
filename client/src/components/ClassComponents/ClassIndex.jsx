import { lazy, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../functions/newRequest";
import ClassList from "./ClassList";
import Banner from "../Banner";

const ClassIndex = () => {
  const [search, setSearch] = useState("");
  const [notProvided, setNotProvided] = useState(false)

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["classes"],
    staleTime: Infinity, 
    cacheTime: 5 * 60 * 1000,
    queryFn: () =>
      newRequest.get(`/class?search=${search}`).then((res) => {
        return res.data;
      }),
  });
  
  const handleKey = (event) => {
    if (event.key === 'Enter') {
      refetch();
      setSearch('')
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    setNotProvided(false)
  }

  useEffect(() => {
    refetch()
  }, [search])

  const LazyEvent = lazy(() => import("./ClassCard"));

  return (
    <main className="w-full h-full flex flex-col gap-7">
      
        <section className="flex justify-center flex-col items-center gap-4 ">
        <Banner title={'las clases que ofrecemos en la asociacion'} />
          <article className="eventSearch">
            <input
              value={search}
              type="text"
              placeholder="Buscar .."
              onKeyDown={handleKey}
              onChange={
                handleChange
              }
            />    
          </article>
          {notProvided ? <p>Por favor ponga algo</p> : null}
     
        </section>
        <section className=" flex justify-center items-center ">
             <ClassList search={search}/>
        </section>
     
           
    </main>
  );
};

export default ClassIndex;
