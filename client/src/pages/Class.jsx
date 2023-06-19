import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../functions/newRequest";
import Photos from "../components/Photos";

const Class = () => {
  const { id } = useParams();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [id],
    queryFn: () =>
      newRequest.get(`/class/${id}`).then((res) => {
        return res.data;
      }),
  });

  const days = data?.days?.length;
  const secondLastDay = data?.days?.length - 1;
  let renderDays = [];

  for (let i = 0; i < days; i++) {
    if (i !== secondLastDay) {
      renderDays.push(data.days[i].day + " ");
    } else {
      renderDays.push(data.days[i].day);
      renderDays.splice(secondLastDay, 0, "y ");
    }
  }

  if (!data) {
    return <p>Un momento de su precioso tiempo por favor ..</p>;
  }

  console.log(data);
  return (
    <>
      <main className="w-screen h-screen flex flex-col">
        <div className="w-screen h-[95px] bg-black text-white flex justify-center items-center">
          AVV BARRIO DE LA CRUZ
        </div>
        <Link
          className="self-center bg-black text-white rounded-3xl p-2 m-2 hover:text-blue-500"
          to="/"
        >
          {" "}
          Volver al inicio
        </Link>
        <header className="w-[40%] h-8 bg-gray-500 text-white mx-auto flex items-center justify-center rounded-3xl text-3xl p-6">
          Clase de {data.name}
        </header>

        <div class="w-full h-full flex mt-12 justify-center gap-9">
          <div className="flex flex-col h-full">

          <section className="p-5 border-0 border-neutral-800 rounded-full w-[50%] h-[50%]flex items-center justify-center shadow-lg" >{data.description}</section>
        
            <section className="p-5 border-0 border-neutral-800 rounded-full w-[50%]  h-[50%] flex items-center justify-center shadow-lg">
              <h2>informacion importante:</h2>
            </section>
          </div>


            <section className="p-5 border-0 border-neutral-800 rounded-full w-[20%] h-full flex items-center justify-center shadow-lg">3</section>
     
        </div>

      </main>
      <Photos />
    </>
  );
};

export default Class;
