import "./main.css";
import { useState } from "react";
import { JwtContext } from "./shared/contexts/JwtContext";
import AppRoutes from "./app-routes/AppRoutes";

function App() {
  const [jwt, setJwt] = useState(localStorage.getItem("token"));

  return (
    <JwtContext.Provider value={{ jwt, setJwt }}>
      <AppRoutes jwt={jwt} />
    </JwtContext.Provider>
  );
}

export default App;
