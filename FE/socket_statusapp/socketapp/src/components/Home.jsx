import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
 import CreatableSelect from "react-select/creatable";

import makeAnimated from "react-select/animated";
import { data } from "autoprefixer";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateGroupsData } from "../slices.js/groupsData";
import img from "../vadivel.jpeg";
const animatedComponents = makeAnimated();
const Home = () => {
  debugger;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const groupsData = useSelector((state) => state.groupsData);
  const { state } = useLocation();
  console.log(state, "STATE IN HOME");

  const [groupName, setGroupName] = useState("");
  const [isError, setIsError] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [addusers, setAddusers] = useState([]);

  const [isNewGroup, setIsNewGroup] = useState(false);
  const getGroups = async () => {
    debugger;
    try {
      const config = {
        url: "http://localhost:8080/getGroups",
        method: "post",
        data: {
          userId: state?.userid,
        },
      };
      const { data } = await axios(config);
      console.log("data feom GETGROUP api", data);

      if (data) {
        dispatch(updateGroupsData(data));
      }
    } catch (e) {
      console.log("error ", e);
    }
  };
  useEffect(() => {
    console.log("Component mounted or updated");

    getGroups();
  }, []);

  function handleCreateCancel() {
    setIsNewGroup(false);
    setGroupName("");
    setAddusers([])
  }
  console.log("addusers in frop down", addusers);

  async function handleCreateGroup() {
    try {
      debugger;
      if (!groupName || addusers.length==0) {
        setIsError("please fill all required details");
        return;
      } else setIsError("");

      let userVal = addusers.map((val) => val.value);
      userVal.push(state.emailid);
      let apiData = {
        name: groupName,
        users: userVal,
      };
      console.log("users data o api", apiData);

      console.log("apiData", apiData);
      let config = {
        url: "http://localhost:8080/createGroup",
        method: "post",
        data: apiData,
      };
      const data = await axios(config);
      console.log("data from create api", data);
      // debugger
      await getGroups();

      setIsNewGroup(false);
      setAddusers([]);
      setGroupName("");
    } catch (e) {
      console.log("error", e);
    }
  }
  async function handleOpenGroup(id) {
    debugger;
    navigate("/chat", { state: { ...state, groupid: id } });
  }
  function validateAddUser(value) {
    debugger
    if (emailRegex.test(value[value.length-1].value)) {
      setAddusers(value);
      setIsError("")

    }
    else{
        setIsError("please enter valid emailId")
        return
    }
  }
  return (
    <div className="mx-10">
      <div className="justify-center text-center  bg-gray-200 rounded-lg w-full  	">
        <h1 className="text-left p-5 text-2xl font-bold">Groups</h1>
      </div>
      {state?.role == 1 ? (
        <div className="justify-right text-right   ">
          <button
            onClick={() => setIsNewGroup(true)}
            className="px-10 rounded-lg m-10 border-solid-100 bg-green-500 py-3"
          >
            Create New +
          </button>
        </div>
      ) : null}
      {!groupsData.length ? (
        <>
          <div className="bg-cover  bg-center justify-center flex h-72  w-full">
            <img
              className="block object-cover  h-full "
              alt="empty image"
              src={img}
              style={{
                textAlign: "center",
                justifyContent: "center",
                borderRadius: 400,
                height: "15rem",
              }}
            ></img>
          </div>
          <div className="justify-center flex">
            {" "}
            <h1 className="text-red-500 font-bold ">
              {" "}
              You are not included in any group to chat!!
            </h1>
          </div>{" "}
        </>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {groupsData.map((val) => (
          <div
            key={val.groupid}
            onClick={() => {
              console.log("val.groupid", val.groupid);
              handleOpenGroup(val.groupid);
            }}
            className=" transition duration-300 hover:bg-blue-200 p-2 pt-4 h-16 border-solid-300 border max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"
          >
            <h2>{val.name}</h2>
          </div>
        ))}
      </div>

      {isNewGroup ? (
        <div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50   ">
          <div
            className={`bg-white rounded-lg shadow-lg lg:h-84 p-6 w-96 transform transition-all duration-300 ease-in-out translate-y-[-100%] animate-slide-down`}
          >
            <h2 className="text-2xl font-bold mb-4">Create Group</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Name of Group</label>
                <input
                  type="text"
                  className={`border rounded w-full p-2 ${isError?'border-red-500':""}`}
                  onChange={(e) => setGroupName(e.target.value)}
                  value={groupName}
                  placeholder="Enter Group Name"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Add Users</label>

                <CreatableSelect
                  isMulti
                  components={animatedComponents}
                  onChange={(value) => validateAddUser(value)}
                  options={addusers}
                  value={addusers}
                  placeholder="Enter email and select a user"
                  formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                  className={`border border-solid  rounded ${isError?'border-red-500':""}`}
                />
              </div>
              {isError?<div className='py-2'><span className='text-red-500 '>{isError} </span></div>:null}

              <div className="flex justify-end ">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded mr-2"
                  onClick={() => handleCreateCancel()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleCreateGroup()}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
