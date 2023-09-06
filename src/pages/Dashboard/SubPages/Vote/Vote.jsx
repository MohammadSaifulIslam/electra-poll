import React, { useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ButtonPrimary from "../../../../components/ButtonPrimary/ButtonPrimary";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Vote = ({ election, email }) => {
  const emailToFind = email
  const params = useParams();
  const [questionsArray, setQuestionsArray] = useState(election.questions);
  const navigate = useNavigate();
  const [checkedOptions, setCheckedOptions] = useState({});


  const handleOptionChange = (questionIndex, optionId) => {
    const updatedCheckedOptions = { ...checkedOptions };
    const question = questionsArray[questionIndex]; // Fetch the question using the passed index

    if (updatedCheckedOptions[questionIndex] === undefined) {
      updatedCheckedOptions[questionIndex] = [];
    }

    const currentlyCheckedOptions = updatedCheckedOptions[questionIndex];

    // If the option is already checked, uncheck it
    if (currentlyCheckedOptions.includes(optionId)) {
      updatedCheckedOptions[questionIndex] = currentlyCheckedOptions.filter(
        (id) => id !== optionId
      );
    } else {
      // If the maximum number of selections is reached, uncheck the first one
      if (currentlyCheckedOptions.length >= question.choosedOptions) {
        currentlyCheckedOptions.shift(); // Remove the first/earliest option
      }

      // Add the new option
      currentlyCheckedOptions.push(optionId);
    }

    setCheckedOptions(updatedCheckedOptions);
  };


  console.log(election);

  const { voterEmails } = election
  console.log(voterEmails);
  // on submit form function //////////////////////////////////////////////////////////////
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {

    const updatedQuestionsArray = [...questionsArray];
    updatedQuestionsArray.forEach((question, questionIndex) => {
      question.options.forEach((option, optionIndex) => {
        if (data[option.id]) {
          const originalOption = questionsArray[questionIndex].options.find(
            (originalOption) => originalOption.id === option.id
          );
          if (originalOption) {
            originalOption.votes += 1;
          }
        }
      });
    });
    console.log(updatedQuestionsArray);
    console.log(election);
    const foundVoter = voterEmails.find((voter) => voter.email === emailToFind);

    if (foundVoter) {
      foundVoter.voted = true;
      console.log('Updated voterEmails array:', voterEmails);
    } else {
      console.log('Email not found in the array.');
    }

    axios
      .put(`http://localhost:5000/election-vote-update/${election._id}`, {
        value: updatedQuestionsArray,
        voterEmails,

      })
      .then((res) => {
        console.log(res.data);
        // Update the state with modified data
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You successfully submit your vote",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(`/dashboard/election-correction`);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You already submit your vote. Don't try again",
          });
          navigate(`/dashboard/election-correction`);
        }
      });
  };

  if (!election) return <LoadingSpinner />;

  return (
    <div className="mb-5 w-screen">
      <div className="mx-auto px-4 border-t-[3px] rounded-md border-t-green-400 border w-4/6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {questionsArray?.map((question, questionIndex) => (
            <div key={question.id} className="my-5">
              <h3 className="font-bold">
                Q{questionIndex + 1} {question.questionTitle}{" "}
              </h3>
              <p className="my-1">Choose {question.choosedOptions} </p>

              {question.options.map((option, optionIndex) => (
                <div key={option.id}>
                  <label>
                    <Controller
                      name={option.id}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <input
                          onInput={() =>
                            handleOptionChange(questionIndex, option.id)
                          }
                          checked={
                            checkedOptions[questionIndex]?.includes(
                              option.id
                            ) || false
                          }
                          type="checkbox"
                          {...field}
                        />
                      )}
                    />
                    {option.option}
                  </label>
                </div>
              ))}
            </div>
          ))}

          <button type="submit">
            {" "}
            <ButtonPrimary> Submit</ButtonPrimary>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Vote;