import React from 'react';
import { connect } from 'react-redux';
import Datepicker from './Datepicker/Datepicker';
import { FormGroup, HelpBlock } from 'react-bootstrap';
import Label from '../Basic/Label';
import validator from '../../lib/validator';

class DatePicker extends React.Component {
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
    change = (isoValue) => {
        const error = validator.validate(this.props, isoValue);
        this.setState({ value: isoValue, error });
        if (isoValue != this.props.value || error != this.props.error)
            this.props.dispatch({ type: "FORM", fieldName: this.props.name, value: isoValue, error });
    }
    render() {
        const { error, dispatch, info, ...p } = this.props;
        const s = this.state;
        return (
            <FormGroup controlId={p.id || p.name} validationState={error && "error"}>
                <Label text={p.label} required={p.required} info={info} />
                <Datepicker onChange={this.change} value={s.value} {...p} />                
                {error && <HelpBlock>{error}</HelpBlock>}
            </FormGroup>
        );
    }
}
DatePicker.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    error: React.PropTypes.string,
    info: React.PropTypes.string,
    dispatch: React.PropTypes.func,    
};
const mapStateToProps = (state, props) => {
    return {
        value: state.form && state.form.value && state.form.value[props.name],
        error: state.form && state.form.error && state.form.error[props.name],
    };
};
export default connect(mapStateToProps)(DatePicker);