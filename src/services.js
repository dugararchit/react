export const detectIntent = (message, randomuserid) => fetch(`https://gpmuk.com/chatbot/allyapicore/?query=${message}&userid=${randomuserid}`)
    .then(response => response.json())

// export const detectIntent = (message, randomuserid) => fetch(`http://localhost/chatbot/apicore/?query=${message}&userid=${randomuserid}`)
//     .then(response => response.json())


https://gpmuk.com/chatbot/allyapicore/