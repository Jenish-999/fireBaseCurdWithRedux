import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUserFunction, setUpdateData, user_register_action } from "../redux/action";

function AddEdit() {


  // Update Data
  const updateDataUser = useSelector(state => state.user.userUpdateData);

  // Dispatch declare
  const dispatch = useDispatch();

  // Navigate hook
  const navigate = useNavigate();

  // get id from URL Parameter
  const {id} = useParams(); 

  // initialState
  const initialState = {
    name: "",
    email: "",
    address: "",
    contact: ""
  }

  // Defining State 
  const [state, setState] = useState(initialState);

  // Data Updating State
  const [update, setUpdate] = useState({});

  // Destructing state values
  const {name,email,address,contact} = state; 

  // handle fields on change
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setState({...state , [name]:value})
  }


  // useEffect only run on when id is fetched
  useEffect(()=>{
    fetch(
      `https://memberscurdopt-default-rtdb.firebaseio.com/curdOpt/${id}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ) .then((data) => {
      return data.json();
    })
    .then((post) => {
      dispatch(setUpdateData(post));
    });
  },[id]);

  // useEffect will run only when id && data is fetched
  useEffect(()=>{

    if(id){
      setState({...updateDataUser})
    }else{
      setState({...initialState});
    }

  },[id,updateDataUser])


  // handle form on submit
  const handleSubmit = (e) =>{
    e.preventDefault();

    if(name === "" ||email === "" ||address === "" ||contact === "" ){
        toast.error("Please, check all fields!!");
    }else{

      dispatch(registerUserFunction(name,email,address,contact,id));
        setState(initialState)
        navigate("/");

    }

}

  return (
    <>
      <div className="container m-5">
        <div className="rows">
          <div className="col-md-6 offset-md-4 border rounded p-4 text-left">
            <h6 className="text-secondary text-uppercase p-1 border mb-5 w-25 text-center">
              MemberShip
            </h6>
            <form className="w-75">
              <div className="mb-3">
                <label  className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  name="name"
                  value={state.name || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label  className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  autoComplete="off" 
                  name="email"
                  value={state.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    autoComplete="off"
                    name="address"
                    value={state.address || ""}
                    onChange={handleChange}
                    style={{resize: 'none', height: '120px'}}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">Address</label>
                </div>
              </div>
              <div className="mb-3">
                <label  className="form-label">
                  Contact
                </label>
                <input
                  type="number"
                  className="form-control"
                  autoComplete="off"
                  name="contact"
                  value={state.contact || ""}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEdit;
