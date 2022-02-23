import React from "react";
import Header from "./components/Header";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import View from "./pages/View";
import {Routes,Route,Link} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer position="top-center"/>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/add" element={<AddEdit/>}/>
      <Route path="/update/:id" element={<AddEdit/>}/>
      <Route path="/view" element={<View/>}/>
      <Route path="/view/:id" element={<View/>}/>
    </Routes>

    </>
  );
}

export default App;
