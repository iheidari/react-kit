import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import TextBox from '../components/Basic/TextBox';
import EmailBox from '../components/Enhanced/EmailBox';
import Checkbox from '../components/Basic/Checkbox';
import RadioButtons from '../components/Basic/RadioButtons';
import DropDown from '../components/Basic/DropDown';
import ListBox from '../components/Basic/ListBox';
import Validator from '../components/Enhanced/Validator';
import DatePicker from '../components/Enhanced/DatePicker';

class Flight extends React.Component {
    render() {
        return (
            <div>
                <form>
                    <Validator name="myForm">
                        <div className="row">
                            <div className="col-md-6">
                                <TextBox name="FullName" label="Name" required placeholder="Enter your full name" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <EmailBox name="Email" label="Email"  required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Checkbox name="chk1" label="check me" info="asdasd" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <DatePicker name="TicketDate" label="Ticket Date" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <RadioButtons name="radio1" label="Radio Box" items={
                                    [
                                        { text: "Item 1", value: "item1", info: "Description for item 1" },
                                        { text: "Item 2", value: "item2", info: "Description for item 2" },
                                        { text: "Item 3", value: "item3", info: "Description for item 3" }
                                    ]
                                } required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <ListBox name="options1" label="Radio Box" placeholder="select..." items={
                                    [
                                        { text: "Item 1", value: "item1" },
                                        { text: "Item 2", value: "item2" },
                                        { text: "Item 3", value: "item3" }
                                    ]
                                } required />
                            </div>
                        </div>
                        <Button onClick={this.props.onSubmit}>Default</Button>
                    </Validator>
                </form>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: () => dispatch({ type: "VALIDATE", validate: true })
    };
};
export default connect(null, mapDispatchToProps)(Flight);