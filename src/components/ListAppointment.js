import React, { Component } from 'react';
import { IoMdClose } from "react-icons/io";

class ListAppointment extends Component {
    render() {
        return (
            this.props.appointments.map((item, index) => {
                return (<div className="appointment-list item-list mb-3" key={index}>
                    <div className="pet-item col media py-3">
                        <div className="mr-3">
                            <button onClick={() => this.props.deleteList(index)} className="pet-delete btn btn-sm btn-danger"><IoMdClose></IoMdClose></button>
                        </div>

                        <div className="pet-info media-body">
                            <div className="pet-head d-flex">
                                <span className="pet-name" >{item.petName}</span>
                                <span className="apt-date ml-auto">{item.aptDate}</span>
                            </div>

                            <div className="owner-name">
                                <span className="label-item">Owner: </span>
                                <span >{item.ownerName}</span>
                            </div>
                            <div className="apt-notes" >{item.aptNotes}</div>
                        </div>
                    </div>
                </div>
                )
            })
        );
    }
}

export default ListAppointment;
