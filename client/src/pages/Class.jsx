import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../functions/newRequest";
import SignUp from "../components/ClassComponents/SignUp";
import NavBar from "../components/NavBar";
import ClassPhotos from "../components/PhotoComponents/ClassPhotos";

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

  return (
    <>
      <main className="w-full h-full flex flex-col justify-center items-center">
      <NavBar />
        <div class="w-full h-full flex mt-12">
          <div class="flex flex-col w-[50%] justify-center items-center space-y-9">
            <article class="shadow-lg p-6 rounded-full w-[350px] h-[350px] flex flex-col items-center justify-center">
              <h2 class="underline-offset-1">Description:</h2>
              <p>
                <b>{data.description}</b>
              </p>
            </article>
            <article class="shadow-lg p-6 rounded-full w-[350px] h-[350px] flex items-center justify-center">
              Informacion general:
              <ul>
                <li>{data.teacher}</li>
              </ul>
            </article>
          </div>

          <div class="flex flex-col w-[50%] justify-center">
            <SignUp className={data?.name} classId={id} days={data?.days}/>
          </div>
          
        </div>
      </main>
      <ClassPhotos collectionName={data.collectionName} classTitle={data.name}/>
    </>
  );
};

export default Class;
