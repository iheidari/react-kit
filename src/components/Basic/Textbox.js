import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { Field, reduxForm } from 'redux-form';

const textbox = (p) => {
    console.log(p);
    return (<TextField
        hintText={p.placeholder}
        floatingLabelText={p.text}
        errorText={p.meta.touched && p.meta.error}
        type={p.password ? "password" : "email"}
        multiLine={p.rows > 1}
        rows={p.rows}
        rowsMax={p.rows}
        disabled={p.disabled}
        {...p.input}
    />);
};
class Textbox extends React.Component {
    render() {
        const p = this.props;
        return (<Field name={p.name} component={textbox} {...p} />);
    }
}
export default reduxForm({ form: 'textbox' })(Textbox);
