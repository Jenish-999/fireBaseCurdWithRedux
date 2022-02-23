import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { displayUserFunction } from "../redux/action";

function Home() {
  // set useSelector
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  // function
  const userDataFun = async () => {
    await fetch(
      "https://memberscurdopt-default-rtdb.firebaseio.com/curdOpt.json",
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
        dispatch(displayUserFunction(post));
      });
  };

  // useEffect to get Data
  useEffect(() => {
    userDataFun();
  }, []);

  // handleDelete
  const handleDelete = (id) => {
    const delResp = fetch(
      `https://memberscurdopt-default-rtdb.firebaseio.com/curdOpt/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }

      
      );

    if (delResp) {
      toast.success("Data is deleted !");
    } else {
      toast.error("Sorry, try again later!!");
    }
    userDataFun();
  };

  // console.log(userData);

  return (
    <>
      <div className="container m-2 d-flex justify-content-center">
        <div className="rows mt-5">
          <div className="col-md-12">
            <div className="container-fluid">
              <table className="table border table-bordered rounded table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">NAME</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">ADDRESS</th>
                    <th scope="col">CONTACT</th>
                    <th scope="col" colSpan={3}>
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(userData).map((id, index) => {
                    return (
                      <tr key={id}>
                        <th scope="row">{index + 1}</th>
                        <td>{id}</td>
                        <td>{userData[id].name}</td>
                        <td>{userData[id].email}</td>
                        <td>{userData[id].address}</td>
                        <td>{userData[id].contact}</td>
                        <td>
                            <Link to={`/update/${id}`}>
                          <div className="btn btn-primary">
                            Edit
                          </div>
                            </Link>
                        </td>
                        <td>
                          <div
                            className="btn btn-danger"
                            onClick={() => handleDelete(id)}
                          >
                            Del
                          </div>
                        </td>
                        <td>
                          <Link to={`/view/${id}`}>
                          <div className="btn btn-warning">View</div>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
