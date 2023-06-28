import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import newRequest from "../functions/newRequest";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const Login = () => {
  const [login, setLogin] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { loading, err, dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await newRequest.post("auth/login", { ...login });
      if (res.data.details.presidente) {
        localStorage.setItem("currentUser", JSON.stringify(res.data.details));
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        const presi = true
        navigate("/admin", {state: presi});
      } else {
        console.log("failed");
        navigate("/");
      }
    } catch (err) {
        console.log("login error" , err)
      alert("Es usted el presidente?");
    }
  };

  const handleState = (e) => {
    console.log(e);
    e.preventDefault();
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
    <NavBar />
    <main className="bg-beige h-screen flex justify-center items-center">     
      <form className="bg-gray-200 p-8 rounded shadow-md">
        {error && <span>{error}</span>}
        <header className="text-2xl font-semibold mb-4">Login</header>
        <label className="block mb-2">Usuario</label>
        <input
          name="name"
          type="text"
          placeholder="Gertje"
          className="w-full rounded-md py-2 px-3 mb-4"
          onChange={(e) => {
            handleState(e);
        }}
        />
        <label className="block mb-2">Contraseña</label>
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          className="w-full rounded-md py-2 px-3 mb-4"
          onChange={(e) => {
            handleState(e);
          }}
          />
        <button
          onClick={(e) => handleSubmit(e)}
          className="bg-gray-800 text-white rounded-md py-2 px-4"
          >
          Entrar
        </button>
      </form>
    </main>
</>
  );
};

export default Login;