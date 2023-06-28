import { useState } from "react";
import Banner from "../Banner";
import EventList from "./EventList";

const EventIndex = () => {
  const months = [
    {
      label: "Enero",
      value: 1,
    },
    {
      label: "Febrero",
      value: 2,
    },
    {
      label: "Marzo",
      value: 3,
    },
    {
      label: "Abril",
      value: 4,
    },
    {
      label: "Mayo",
      value: 5,
    },
    {
      label: "Junio",
      value: 6,
    },
    {
      label: "Julio",
      value: 7,
    },
    {
      label: "Agosto",
      value: 8,
    },
    {
      label: "Septiempre",
      value: 9,
    },
    {
      label: "Octubre",
      value: 10,
    },
    {
      label: "Noviembre",
      value: 11,
    },
    {
      label: "Deciembre",
      value: 12,
    },
  ];

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()}`;
  const currentDate = date.split("/")[1];
  const [gezelligeVar, setGezelligeVar] = useState({
    search: "",
    selectedMonth: months[currentDate].label,
    selectedValue: months[currentDate].value,
  });

  const handleKey = (e) => {
    if (e.key === "Enter") {
      setGezelligeVar((prev) => ({ ...prev, search: e.target.value }));
    }
  };

  const handleChange = (e) => {
    setGezelligeVar((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleState = (e, month) => {
    e.preventDefault();
    setGezelligeVar((prev) => ({
      ...prev,
      selectedValue: month.value,
      selectedMonth: month.label,
    }));
  };

  return (
    <main className="w-screen h-full content mt-6 flex flex-col items-center max-w-full">
      <Banner title={`los eventos que organizamos en ${gezelligeVar.selectedMonth}`} />
      {/* Aside section */}
      <div className="flex w-full h-full gap-8">
      <section className=" hidden md:block shadow-lg w-[350px]">
        <aside>
         
            <input
            className="p-4 w-full" 
              value={gezelligeVar.search}
              type="text"
              placeholder="Buscar .."
              onKeyDown={handleKey}
              onChange={handleChange}
            />
        
          <div className=" flex flex-col p-2 gap-3">
            {months.map((month, i) => (
              <article
                className={`text-2xl cursor-pointer font-light hover:bg-slate-300 border rounded-md ${ gezelligeVar.selectedMonth === month.label ? 'bg-[#D3D3D3]' : '' }`}

                id={`${month.label}`}
                onClick={(e) => {
                  handleState(e, month);
                }}
              >
                {month.label}
              </article>
            ))}
          </div>
        </aside>
      </section>
      {/* Eventlist section */}
      <section className="w-full ">
        <EventList event={gezelligeVar}/>
      </section>
      </div>
    </main>
  );
};

export default EventIndex;
