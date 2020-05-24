const receiverReducer = (state = [""], action) => {
    switch (action.type) {
        case 'RECEIVER':
            return [...state, action.text];
        case 'RESET':
            console.log("RESET reducer receiver");
            return [""];
        default:
            return state;
    }
}

export default receiverReducer;