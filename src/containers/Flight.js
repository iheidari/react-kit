import React from 'react';
import { connect } from 'react-redux';
import Textbox from '../components/Basic/Textbox';
//import Checkbox from '../components/Basic/Checkbox';
import Validator from '../components/Validator';
//import { reduxForm, submit } from 'redux-form';
//import TextField from 'material-ui/TextField';


const required = value => value ? undefined : 'Required';
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength5 = maxLength(5);

class Flight extends React.Component {
    render() {
        return (
            <div>
                <Validator name="myForm">
                    <Textbox name="txt1" placeholder="Name" label="Label" required validator={(v) => { if (v.length > 5) return "Less than 5 char"; }} />
                    <Textbox name="txt2" placeholder="Name" label="Label" required />
                    {/*<Textbox name="text1" placeholder="TEST" text="Hello" validate={value => value ? undefined : 'Required'} required />
                    <Textbox name="text2" placeholder="TEST" text="Hello" validate={value => value ? undefined : 'Required'} />
                    <br />
                    <Checkbox name="checkbox1" text="click me" style={{ color: 'red' }} />*/}

                    <button type="button" onClick={() => this.props.dispatch({ type: "VALIDATE", validate: true })} >Submit</button>
                </Validator>
            </div>
        );
    }
}

export default connect()(Flight);