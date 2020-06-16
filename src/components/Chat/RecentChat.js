// Import React
import React from 'react';

const RecentChat = ({ users, socket, individualClick, notificationsfromusers }) => {
  function navigatetoindividual(event, userid, index) {

    const currentClass = document.getElementsByClassName("chat_list");
    for (let i = 0; i < currentClass.length; i++) {

      if (index === i)
        currentClass[i].classList.add("active");
      else
        currentClass[i].classList.remove("active");

    }
    individualClick(userid);
  }

  return (
    <div className="inbox_people">
      <div className="headind_srch">
        <div className="recent_heading">
          <h4>Others</h4>
        </div>
      </div>
      <div className="inbox_chat">
        {
          users.map((user, i) => {

            var total = 0;
            if (notificationsfromusers.notification) {
              if(notificationsfromusers.notification[user.id] && notificationsfromusers.notification[user.id].length !== 0){
                total = notificationsfromusers.notification[user.id].length;
              }
            }
            return (<div key={i} className="chat_list" onClick={(event) => navigatetoindividual(event, user.id, i)} >
              <div className="chat_people">
                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png"
                  alt="otheruser" /> </div>
                <div className="chat_ib" >
                  <div className="notification"><h5>{user.name} </h5>
                    <span className="badge">
                      {
                        (total > 0)
                          ? total
                          : null
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>)
          })}

      </div>
    </div >
  );
}

export default RecentChat;
