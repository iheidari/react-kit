import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import FormControl from '../components/Basic/FormControl';
import Checkbox from '../components/Basic/Checkbox';
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
                                <FormControl name="FullName" label="Name" type="text" required placeholder="Enter your full name" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <FormControl name="Email" label="Email" type="email" required />
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
    }
};
export default connect(null, mapDispatchToProps)(Flight);