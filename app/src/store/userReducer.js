export default (
  state = {
    user: {},
  },
  action
) => {
  switch (action.type) {
    case 'GET_POST_DATA':
      // console.log(state);

      return { ...state, user: action.payload };
    default:
      return state;
  }
}