export const increment = () => {
    return {
        type: 'INCREMENT'
    }
};
export const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}

export const senderMessage = (text) => {
    return {
        type : "SENDER",
        text: text
    }
}

export const receiverMessage = (text) => {
    return {
        type : "RECEIVER",
        text: text
    }
}

export const resetMessages = () => {
    return {
        type : "RESET"
    }
}