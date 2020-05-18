export const detectIntent = (message) => fetch(`https://gpmuk.com/chatbot/apicore/?query=${message}`)
    .then(response => response.json())

// export const detectIntent1 = (message) => fetch(`http://localhost/chatbot/apicore/?query=${message}`)
//     .then(response => response.json())
