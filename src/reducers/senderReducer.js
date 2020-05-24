const senderReducer = (state = ["Hi I am Bot!!! What can I do for you today..."], action) => {
    switch (action.type) {
        case 'SENDER':
            return [...state, action.text];
        case 'RESET':
            console.log("RESET reducer");
            return ["Hi I am Bot!!! What can I do for you today..."];
        default:
            return state;
    }
}

export default senderReducer;