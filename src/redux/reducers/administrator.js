import { ADD_ADMINISTRATOR_INFO } from "../constant";

const initState = {};

export default (state = initState, action) => {
  const { type, data } = action;
  switch (type) {
    case ADD_ADMINISTRATOR_INFO:
      return { ...data };
    default:
      return state;
  }
};
