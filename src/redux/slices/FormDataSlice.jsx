import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const formDataSlice = createSlice({
  name: "form-data",
  initialState,
  reducers: {
    // sets initial state
    setInitalState(state, action) {
      Object.assign(state, action.payload);
    },

    // ===overview page actions=====
    setSelectedTime(state, action) {
      state.selectedTime = action.payload;
    },
    setVoteType(state, action) {
      state.voteType = action.payload;
    },
    setBallotAcces(state, action) {
      state.ballotAccess = action.payload;
    },
    setAdminResultAccess(state, action) {
      state.adminResultAccess = action.payload;
    },
    setVoterResultAccess(state, action) {
      state.voterResultAccess = action.payload;
    },
    addFirstPage(state, action) {
      const pl = action.payload;
      state.title = pl.title;
      state.autoDate = Math.floor(pl.autoDate);
      state.startDate = pl.startDate;
      state.endDate = pl.endDate;
      state.voteType = pl.voteType;
      state.ballotAccess = pl.ballotAccess;
      state.adminResultAccess = pl.adminResultAccess;
      state.voterResultAccess = pl.voterResultAccess;
      state.adminEmail = pl.adminEmail;
      state.organization = pl.organization;
      state.email = pl.email;
      state.timeZone = pl.timeZone;
      state.timeArea = pl.timeArea;

      if (pl.ballotAccess !== "high") {
        state.voterEmails = state.voterEmails.map((voter) => {
          return {
            ...voter,
            accessKey: "",
            password: "",
          };
        });
      } else {
        const accessCharacters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        state.voterEmails = state.voterEmails.map((voter) => {
          let accessKey = "";
          for (let i = 0; i < 25; i++) {
            accessKey += accessCharacters.charAt(
              Math.floor(Math.random() * accessCharacters.length)
            );
          }
          const password =
            state.ballotAccess === "high"
              ? Math.floor(Math.random() * 900000) + 100000
              : "";
          return {
            ...voter,
            accessKey,
            password,
          };
        });
      }
    },

    // ======ballot page Actions=========
    addQuestion(state) {
      state.questions.push({
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
      });
    },

    removeQuestion(state, action) {
      const id = action.payload;
      state.questions = state.questions.filter((q) => q.id !== id);
    },

    addOption(state, action) {
      const question = state.questions.find((q) => q.id === action.payload.id);
      state.questions
        .find((q) => q.id === action.payload.id)
        .options.push({
          id: `xyz${Math.floor(100000 + Math.random() * 900000)}`,
          option: `option/candidate ${question.options.length + 1}`,
          votes: 0,
        });
    },
    updateOption(state, action) {
      const id = action.payload.id;
      const option = action.payload.option;
      const optionId = action.payload.optionId;

      state.questions
        .find((q) => q.id === id)
        .options.find((o) => o.id === optionId).option = option;
    },
    deleteOption(state, action) {
      state.questions.find((q) => q.id === action.payload.id).options =
        state.questions
          .find((q) => q.id === action.payload.id)
          .options.filter((op) => op.id !== action.payload.optionId);
    },
    addQuestionTitle(state, action) {
      state.questions.find((q) => q.id === action.payload.id).questionTitle =
        action.payload.questionTitle;
    },
    addVacancy(state, action) {
      state.questions.find((q) => q.id === action.payload.id).vacancy =
        action.payload.vacancy;
    },
    addVoterChoose(state, action) {
      state.questions.find((q) => q.id === action.payload.id).voterChoose =
        action.payload.voterChoose;
    },
    addChoosedOptions(state, action) {
      if (
        action.payload.choosedOptions <=
          state.questions.find((q) => q.id === action.payload.id).options
            .length &&
        action.payload.choosedOptions > 0
      ) {
        state.questions.find((q) => q.id === action.payload.id).choosedOptions =
          action.payload.choosedOptions;
      } else if (
        action.payload.choosedOptions >=
        state.questions.find((q) => q.id === action.payload.id).options.length
      ) {
        state.questions.find((q) => q.id === action.payload.id).choosedOptions =
          state.questions.find(
            (q) => q.id === action.payload.id
          ).options.length;
      }
    },

    // ========notice page actions============
    setEmailNotice(state) {
      state.notice.emailNotice = !state.notice.emailNotice;
    },
    setUseName(state) {
      state.notice.useName = !state.notice.useName;
    },
    setEmailSubject(state, action) {
      state.emailSubject = action.payload;
    },
    setEmailInfo(state, action) {
      state.emailInfo = action.payload;
    },

    // =======voters page actions==========
    updateVoterEmail(state, action) {
      state.voterEmails.find((email) => email.id === action.payload.id).email =
        action.payload.email;
    },
    addVoterRow(state, action) {
      let voterId = "";
      let email = action?.payload || "";
      let accessKey = "";
      let password =
        state.ballotAccess === "high"
          ? Math.floor(Math.random() * 900000) + 100000
          : "";

      const exist = state.voterEmails.find((voter) => voter.email === email);

      if (!exist) {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+#@%$^&";
        const accessCharacters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 20; i++) {
          voterId += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }

        if (state.ballotAccess === "high") {
          for (let i = 0; i < 25; i++) {
            accessKey += accessCharacters.charAt(
              Math.floor(Math.random() * accessCharacters.length)
            );
          }
        } else if (state.ballotAccess === "medium") {
          accessKey = state.voterEmails[0].accessKey;
          password = state.voterEmails[0].password;
        }
        state.voterEmails.push({ id: voterId, email, accessKey, password });
      }
    },

    updateAccessKey(state, action) {
      const accessKey = action.payload;
      state.voterEmails = state.voterEmails.map((voter) => {
        return { ...voter, accessKey: accessKey };
      });
    },
    updateVotePassword(state, action) {
      const password = action.payload;
      state.voterEmails = state.voterEmails.map((voter) => {
        return { ...voter, password: Math.floor(password) };
      });
    },
    removeVoterEmail(state, action) {
      const idToRemove = action.payload;
      state.voterEmails = state.voterEmails.filter(
        (email) => email.id !== idToRemove
      );
    },
    setEmailValid(state, action) {
      state.emailsValid = action.payload;
    },

    next(state) {
      state.page++;
    },
    previous(state) {
      state.page--;
    },
  },
});

export const {
  setInitalState,
  addFirstPage,

  addQuestion,
  removeQuestion,
  addOption,
  updateOption,
  deleteOption,
  addQuestionTitle,
  addChoosedOptions,
  addVacancy,
  addVoterChoose,
  setEmailNotice,
  setUseName,
  setEmailSubject,
  setEmailInfo,
  updateVoterEmail,
  addVoterRow,
  removeVoterEmail,
  setEmailValid,
  next,
  previous,
  setSelectedTime,
  setVoteType,
  setBallotAcces,
  setAdminResultAccess,
  setVoterResultAccess,
  updateAccessKey,
  updateVotePassword,
} = formDataSlice.actions;

export const formDataReducer = formDataSlice.reducer;
