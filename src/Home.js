import React from 'react';
import MeetingsList from './MeetingsList';
class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            meetingName: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        try {
            this.props.addMeeting(this.state.meetingName);
            this.setState({
                meetingName: '',
            });
        } catch (error) {
            console.log(error);

        }
    }

    handleChange(e) {
        const itemName = e.target.name;
        const itemValue = e.target.value;
        this.setState({ [itemName]: itemValue });
    }
    render() {
        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h1 className="font-weight-light">Add a Meeting</h1>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <form
                                    className="formgroup"
                                    onSubmit={this.handleSubmit}
                                >
                                    <div className="input-group input-group-lg">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="meetingName"
                                            required
                                            placeholder="Meeting name"
                                            aria-describedby="buttonAdd"
                                            value={this.state.meetingName}
                                            onChange={this.handleChange}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                type="submit"
                                                className="btn btn-sm btn-info"
                                                id="buttonAdd"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-11 col-md-6 text-center">
                        <div className="card border-top-0 rounded-0">
                            {this.props.meetings && this.props.meetings.length ? (
                                <div className="card-body py-2">
                                    <h4 className="card-title font-weight-light m-0">
                                        Your Meetings
                                    </h4>
                                </div>
                            ) : null}

                            {this.props.meetings && (
                                <div className="list-group list-group-flush">
                                    <MeetingsList
                                        userId={this.props.userId}
                                        meetings={this.props.meetings}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;