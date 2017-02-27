import React from 'react';
import MUiCheckbox from 'material-ui/Checkbox';
import { Field, reduxForm } from 'redux-form';

class Checkbox extends React.Component {
    checkbox = (p) => {
        return (
            <div>
                <MUiCheckbox
                    label={p.text}
                    disabled={p.disabled}
                    onCheck={p.input.onChange}
                    labelStyle={{ color: 'red' }}
                    inputStyle={{ color: 'red' }}
                />
                {p.meta && p.meta.touched && p.meta.error && <span>{p.meta.error}</span>}
            </div>
        );
    }
    render() {
        const p = this.props;
        return (<Field name={p.name} component={this.checkbox} {...p} />);
    }
}
export default reduxForm({
    form: 'myfield',
})(Checkbox);
