import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import validator from '../../lib/validator';

class Textbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || ""
        };
    }
    componentWillReceiveProps(newProps) {
        if (this.state.value != newProps.value) {
            this.setState({ ...newProps.value });
        }
        if (this.state.error != newProps.error) {
            this.setState({ error: newProps.error });
        }
    }
    change = (e) => {
        this.setState({
            value: e.target.value
        });
        this.setState({ error: validator.validate(this.props, e.target.value) });
    }
    blur = (e) => {
        const error = validator.validate(this.props, e.target.value);
        this.setState({ error });
        if (e.target.value != this.props.value || error != this.props.error)
            this.props.dispatch({ type: "FORM", fieldName: this.props.name, value: e.target.value, error });
    }
    render() {
        const s = this.state;
        const p = this.props;
        return (<TextField
            value={s.value}
            hintText={p.placeholder}
            floatingLabelText={p.label}
            errorText={s.error}
            type={p.password ? "password" : "text"}
            multiLine={p.rows > 1}
            rows={p.rows}
            rowsMax={p.rows}
            disabled={p.disabled}
            onBlur={this.blur}
            onChange={this.change}
        />);
    }
}
Textbox.propTypes = {
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    validator: PropTypes.func,
    dispatch: PropTypes.func,
};
const mapStateToProps = (state, props) => {
    return {
        value: state.form && state.form.value && state.form.value[props.name],
        error: state.form && state.form.error && state.form.error[props.name],
    };
};
export default connect(mapStateToProps)(Textbox);