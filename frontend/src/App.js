import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import "./App.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function App() {
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      const { token } = userInfo;
      const decodedPayload = jwtDecode(token);
      let exp = decodedPayload.exp;
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (exp && currentTimestamp > exp) {
        localStorage.removeItem("userInfo");
        toast({
          title: "logout Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        navigate("/", { replace: true });
      }
    }
  }, [navigate, toast]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
