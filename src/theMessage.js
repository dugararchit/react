import React, { Component } from 'react';

class FormMessage extends Component {
  render() {
    const { message, formSuccess } = this.props;
    var classDecider = (formSuccess) ? "col-12 alert px-3 alert-success" : "col-12 alert px-3 alert-danger";

    return (
      <div>
        {
          (message) ?
            <div className={classDecider} >
              {message}
            </div >
            : ""
        }
      </div>
    );
  }
}

export default FormMessage;