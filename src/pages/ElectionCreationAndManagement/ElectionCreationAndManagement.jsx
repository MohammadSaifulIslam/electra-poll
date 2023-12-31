import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { BsPlusSquare } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import UserName from "../../components/Deshboard/UserName/UserName";
import LoadingSpinner from "../shared/LoadingSpinner";
import CustomTabs from "./CustomTabs";
import ElectionCard from "./ElectionCard";

const ElectionCreationAndManagement = () => {
  const [activeStatus, setActiveStatus] = useState("pending");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const dispatch = useDispatch();

  const {
    data: elections = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["elections", user, activeStatus],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/elections/?email=${user?.email}&status=${activeStatus}`
      );
      return res.data;
    },
  });


  const handleAddElection = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+#@%$^&";
    let voterId = "";
    for (let i = 0; i < 20; i++) {
      voterId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    const electionData = {
      title: "",
      email: user?.email,
      autoDate: "",
      startDate: "",
      page: 0,
      endDate: "",
      questions: [
        {
          id: `xyz${Math.floor(10000 + Math.random() * 90000)}`,
          voterChoose: "candidate",
          vacancy: 1,
          options: [
            {
              id: `xyz${Math.floor(100000 + Math.random() * 900000)}`,
              option: `option/candidate 1`,
              votes: 0,
            },
          ],
          choosedOptions: 1,
        },
      ],
      emailsValid: false,
      notice: {
        emailNotice: true,
        useName: true,
      },
      emailSubject: "Vote Now:",
      emailInfo: "",
      voterEmails: [{ id: voterId, email: "", accessKey: "", password: "" }],
      status: "pending",
      selectedTime: "option2",
      voteType: "test",
      ballotAccess: "high",
      adminResultAccess: "after",
      voterResultAccess: "after",
      timeZone: "",
    };
    if (user) {
      axios
        .post(`${import.meta.env.VITE_URL}/add-election`, electionData)
        .then((res) => {
          const id = res.data.insertedId;
          axios.get(`${import.meta.env.VITE_URL}/election/${id}`).then((res) => {
            navigate(`/election/${id}`);
          });
        });
    }
  };

  const handleTabClick = (status) => {
    setActiveStatus(status);
    // You can perform additional actions here when a tab is clicked
  };


  return (
    <>
      <UserName></UserName>
      <div className="create-bg3">
        <div className="bg-slate-600 bg-opacity-60 text-center h-[90vh] md:h-[50vh] flex flex-col items-center justify-center p-10 md:p-24 ">
          <h2 className="text-slate-100  uppercase font-bold text-2xl  sm:text-2xl md:text-5xl mb-4">
            {" "}
            Create Your Election
          </h2>
          <p className=" text-slate-200 md:text-xl mb-4">
            {" "}
            Empower Your Voice Online! Shape the Future with Our User-Friendly{" "}
            <br /> Voting Platform. Make Your Vote Count.We are always ready to
            give a pure election
          </p>
          <button onClick={handleAddElection}>
            <BsPlusSquare className="text-6xl  md:text-7xl text-white" />
          </button>
        </div>
      </div>
      <div className="my-container mt-10 mb-10 min-h-[60vh]">
        <CustomTabs
          handleTabClick={handleTabClick}
          activeStatus={activeStatus}
        />

        {isLoading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : elections.length === 0 ? (
          <p className="text-2xl text-center py-10 text-gray-400">
            You have no election.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
            {elections?.map((election) => (
              <ElectionCard
                key={election._id}
                refetch={refetch}
                election={election}
              ></ElectionCard>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ElectionCreationAndManagement;
