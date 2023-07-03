import { useContext } from "react";
import NavBar from "../components/NavBar";
import Attendees from "./components/attendee/Attendees";
import Classes from "./components/class/Classes";
import Events from "./components/event/Events";
import { SelectedComponentContext } from "./context/AdminContext";

const Index = () => {
  const { selectedComponent, updateSelectedComponent } = useContext(
    SelectedComponentContext
  );

  const handleComponentSelect = (component) => {
    updateSelectedComponent(component);
  };

  const renderSelectedComponent = () => {
    if (selectedComponent === "attendees") {
      return <Attendees />;
    }
    if (selectedComponent === "classes") {
      return <Classes />;
    }
    if (selectedComponent === "events") {
      return <Events />;
    }
    if (selectedComponent === "events") {
      return <Events />;
    } else {
      return <div>Bienvenido mi presidente!</div>;
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex h-screen">
        {/* Vertical Navbar */}
        <div className="bg-gray-200 w-1/4 py-4 px-8">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleComponentSelect("attendees")}
              className="bg-green-500 text-white rounded-md py-2 px-4"
            >
              Participantes
            </button>
            <button
              onClick={() => handleComponentSelect("classes")}
              className="bg-green-500 text-white rounded-md py-2 px-4"
            >
              Clases
            </button>
            <button
              onClick={() => handleComponentSelect("events")}
              className="bg-green-500 text-white rounded-md py-2 px-4"
            >
              Eventos
            </button>
            <button
              onClick={() => handleComponentSelect("photos")}
              className="bg-green-500 text-white rounded-md py-2 px-4"
            >
              Fotos
            </button>
            <button
              onClick={() => handleComponentSelect("photos")}
              className="bg-green-500 text-white rounded-md py-2 px-4"
            >
              Anuncio
            </button>
          </div>
        </div>
        {/* Selected Component */}
        <div className="bg-gray-100 flex-grow p-8">
          <div>{renderSelectedComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
