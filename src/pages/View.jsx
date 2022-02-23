import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { userViewFunction } from "../redux/action";

function View() {

  // selector
  const userView = useSelector(state => state.user.userViewData);

  // Dispatch
  const dispatch = useDispatch();

  // URL Parameter
  const {id} = useParams();

  // function
  const viewFunction = async() =>{

    await fetch(
      `https://memberscurdopt-default-rtdb.firebaseio.com/curdOpt/${id}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((post) => {
        dispatch(userViewFunction(post));
      });
  

  }

  // Destructuring Data
  const {name, email, address, contact} = userView; 

  // useEffect
  useEffect(()=>{
    viewFunction();
  },[id])



  return (
    <>
      <div className="container m-5">
        <div className="row">
          <div className="col-md-6 offset-md-5">
            <div className="card" style={{width: "25rem"}}>
              <div className="card-body">
                <h5 className="card-title pb-2">Members Id : {name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">E-mail : {email}</h6>
                <h6 className="card-text">
                <p className="card-subtitle mb-2 text-muted">Address :</p>
                  {address}
                </h6>
                <h6 className="card-subtitle mb-2 text-muted">Contact : {contact}</h6>
                <Link to={'/'}>
                <div className="btn btn-primary mt-2">
                    Go Back
                </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default View;
