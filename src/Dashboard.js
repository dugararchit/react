import React, { Component } from 'react';
import Header from './Header';
import firebase from "./firebase";
class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            usersList: [],
            dataValue: {}
        };
    }

    componentDidMount() {
        console.log(firebase
            .database());
        const ref = firebase
            .database()
            .ref('supertelecom/');
        ref.on('value', snapshot => {
            let dataValue = snapshot.val();
            let dataValueArray = {};
            console.log(dataValue);
            var objectKeysName = Object.keys(dataValue);
            //console.log(dataValueArray);
            for (let item in dataValue) {
                dataValueArray[item] = [];
                var obj = {};
                for (var tmp in dataValue[item]) {
                    obj = dataValue[item][tmp];
                    dataValueArray[item].push(obj);
                }
            }

            this.setState({
                usersList: objectKeysName,
                dataValue: dataValueArray
            });
        });
    }

    clickingUser(username) {
        console.log(username);
    }

    render() {
        return (
            <div>
                <Header heading="Dashboard"></Header>
                <div className="container">
                    <h3>List of Users</h3>
                    <ul className="list-group">
                        {
                            this.state.usersList.map((element, key) => {
                                return <li onClick={this.clickingUser(element)} key={key} className="list-group-item">{element}
                                    <ul className="list-group">
                                        {
                                            this.state.dataValue[element].map((ele, ind) => {
                                                return <li key={ind} className="list-group-item">
                                                    <span>Client Name: {ele.clientName}</span>
                                                    <br /><br />
                                                    <span>Products Images</span><br />
                                                    {
                                                        ele.productimageuri.map(pimage => {
                                                            return <img src={pimage} className="img img-responsive ml-2" alt="Product Img" height="150px" width="150px"></img>
                                                        })
                                                    }
                                                    <br /><br />
                                                    <span>Shop Image</span>
                                                    <img src={ele.shopimageuri} alt="Shop Img" height="150px" width="150px"></img>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Dashboard;