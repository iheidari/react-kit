import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import * as types from '../../../constants/actionTypes';
import TextField from 'material-ui/TextField';
import mask from '../../../library/mask';

class MaskInput extends Component {
    constructor(props) {
        super(props);
        if (props.value) //if store has value relative to this component, initialize the state value
            this.state = { value: mask.apply(props.mask, props.value), error: "" };
        else //in case the store does not have any value for this component, just clear it
            this.state = { value: "", error: "" };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.value && newProps.value !== this.state.value)//if store's value relative to this component change, update the state value
            this.setState({ value: mask.apply(newProps.mask,newProps.value) });
        else if (!newProps.value)//in case the store does not have any value for this component, just clear it
            this.setState({ value: "" });

        if (newProps.error && newProps.error !== this.state.error)
            this.setState({ error: newProps.error });
    }

    onChange = (event) => {
        let value = event.target.value;
        value = mask.apply(this.props.mask, value);
        this.setState({ value });
    }

    onBlur = (event) => {
        let value = event.target.value;
        const error = this.validate(value);
        this.setState({ value, error });
        if (this.props.useUnmaskedValue)
            value = mask.getValue(this.props.mask, this.state.value);
        this.updateStore(value);
    }

    updateStore(value) {
        const p = this.props;
        this.props.dispatch({ type: types.FORM_INPUT, value, name: p.name });
    }

    validate(value) {
        const p = this.props;
        let error = null;
        if (!value && p.required)
            error = p.errorMsg ? p.errorMsg : p.name + ' is required';
        if (value && p.pattern) {
            let patt = new RegExp(p.pattern);
            if (!patt.test(value))
                error = p.patternErrorMsg ? p.patternErrorMsg : p.name + ' is invalid';
        }
        return error;
    }

    render() {
        const p = this.props;
        const s = this.state || {};
        //const inputClass = (s.error ? "form-control errorField" : "form-control");

        return (<div className="form-group">
            <div className="field">
                <TextField type={p.type || "text"} id={p.id || p.name} name={p.name} hintText={p.mask} errorText={s.error}
                    placeholder={p.placeholder} value={this.state.value} onChange={this.onChange} onBlur={this.onBlur} />
            </div>
        </div>);
    }
}

MaskInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    mask: PropTypes.string.isRequired,
    value: PropTypes.string,
    error: PropTypes.string,
    errorMsg: PropTypes.string,
    patternErrorMsg: PropTypes.string,
    useUnmaskedValue: PropTypes.bool
};


const mapStateToProps = (state, props) => {
    return {
        value: state.forms[props.name],
        error: state.forms && state.forms.errors && state.forms.errors[props.name]
    };
};

export default connect(mapStateToProps)(MaskInput);