"use client"
import { MdOutlineRecommend } from "react-icons/md";
import { MdMovie } from "react-icons/md";


import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Recomendation from "./components/Recomendado";

export default function Home() {
  const [user, setUser] = useState("");
  const [opcionesMenu, setOpcionesMenu] = useState(0);

  const handleChangeOption = (numero) => {
    setOpcionesMenu(numero);
  }

  useEffect(() => {
    let userId = ""
    if (typeof window !== 'undefined') {
      let cookies = document.cookie.split("; ");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let [name, value] = cookie.split('=');
        if (name === 'user') {
          let user = JSON.parse(value);
          userId = user.uid;
          console.log("User ID from cookie: ", userId); // Agregamos un console.log aquí
          setUser(userId);
        }
      }
    }
  }, []); 
  
  
  
  return (
    <div style={{ width: "100%", height: "100vh", height: "100vh" }}>
      <div style={{ height: "100%" }} className="flex">
        <div style={{ width: "7%" }}>
          <div className="SideBar">
            <Button onClick={() => handleChangeOption(0)} variant="solid"
              color={opcionesMenu === 0 ? "primary" : "transparent"}
            >
              <MdMovie size="2em" />
            </Button>

            <Button onClick={() => handleChangeOption(1)} variant="solid"
              color={opcionesMenu === 1 ? "primary" : "transparent"}
            >
              <MdOutlineRecommend size="2em" />
            </Button>
          </div>
        </div>
        <div style={{ width: "93%", height: "100%", display: opcionesMenu === 0 ? "block" : "none" }}>
          <iframe
            src="http://localhost:3000"
            width="100%"
            height="100%"
          />
        </div>
        <div style={{ width: "93%", height: "100%", display: opcionesMenu === 1 ? "block" : "none" }}>
          <div>
            <Recomendation id={user} />
          </div>
        </div>
      </div>
    </div>
  );

}
