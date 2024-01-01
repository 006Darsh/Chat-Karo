import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState();
  const toast = useToast();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShow(!show);
  };

  // -------------------------------------------------------------
  //image handler
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "darsh-cloud");
      fetch("https://api.cloudinary.com/v1_1/darsh-cloud/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  // ---------------------------------------------------------------
  //after submit task handler

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
          name,
          email,
          password,
          pic,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        navigate("/chats", { replace: true });
      } else {
        throw new Error("Error occurred during registration");
      }
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  // ---------------------------------------------------------------
  // rendered to ui
  return (
    <VStack spacing={"5px"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder={"Enter User Name"}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      {/* ---------------------------------------------------------- */}
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type={"email"}
          placeholder={"Enter Email (e.g, abc@abc.com)"}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      {/* --------------------------------------------------------- */}
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder={"Enter Password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement w={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={handleShowPassword}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* --------------------------------------------------------- */}
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder={"Enter Password Again"}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement w={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={handleShowPassword}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* --------------------------------------------------------- */}
      <FormControl id="pic" isRequired>
        <FormLabel>Profile Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="purple"
        w={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default SignUp;































// import React, { useState } from 'react';
// import axios from 'axios';
// import { Box, Button, Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

// const CompanySignup = () => {
//   const [cin, setCIN] = useState('');
//   const [companyName, setCompanyName] = useState('');
//   const [email, setEmail] = useState('');
//   const [otp, setOTP] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSignup = async () => {
//     try {
//       const response = await axios.post('/api/signup', {
//         cin,
//         company_name: companyName,
//         email,
//       });

//       if (response.data.success) {
//         // OTP sent successfully
//         // Update your UI or perform any necessary actions
//       } else {
//         setErrorMessage(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       setErrorMessage('Error creating company.');
//     }
//   };

//   const handleVerify = async () => {
//     try {
//       const response = await axios.post('/api/verify', {
//         cin,
//         company_name: companyName,
//         email,
//         otp,
//       });

//       if (response.data.success) {
//         // Company verified and saved successfully
//         // Update your UI or perform any necessary actions
//       } else {
//         setErrorMessage(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       setErrorMessage('Error verifying company.');
//     }
//   };

//   return (
//     <Box maxWidth="500px" margin="0 auto">
//       <h1>Company Signup</h1>
//       {errorMessage && <p>Error: {errorMessage}</p>}
//       <FormControl isInvalid={errorMessage}>
//         <FormLabel>CIN</FormLabel>
//         <Input
//           type="text"
//           placeholder="CIN"
//           value={cin}
//           onChange={(e) => setCIN(e.target.value)}
//         />
//         <FormLabel>Company Name</FormLabel>
//         <Input
//           type="text"
//           placeholder="Company Name"
//           value={companyName}
//           onChange={(e) => setCompanyName(e.target.value)}
//         />
//         <FormLabel>Email</FormLabel>
//         <Input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <Button onClick={handleSignup}>Signup</Button>
//       </FormControl>

//       <h2>Verify Company</h2>
//       <FormControl isInvalid={errorMessage}>
//         <FormLabel>OTP</FormLabel>
//         <Input
//           type="text"
//           placeholder="OTP"
//           value={otp}
//           onChange={(e) => setOTP(e.target.value)}
//         />
//         <Button onClick={handleVerify}>Verify</Button>
//         <FormErrorMessage>{errorMessage}</FormErrorMessage>
//       </FormControl>
//     </Box>
//   );
// };

// export default CompanySignup;