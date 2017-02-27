import React from 'react';
import TextField from 'material-ui/TextField';
import { Field, reduxForm } from 'redux-form';

class Textbox extends React.Component {
    textbox = (p) => {
        return (
            <TextField
                hintText={p.placeholder}
                floatingLabelText={p.text}
                errorText={p.meta && p.meta.touched && p.meta.error}
                type={p.password ? "password" : "text"}
                multiLine={p.rows > 1}
                rows={p.rows}
                rowsMax={p.rows}
                disabled={p.disabled}
                {...p.input}
            />);
    }
    render() {
        const p = this.props;
        return (<Field name={p.name} component={this.textbox} {...p} />);
    }
}
export default reduxForm({
    form: 'myfield',
})(Textbox);
