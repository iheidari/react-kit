import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import validator from '../../lib/validator';
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import Label from './Label';

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
        this.setState({ value: e.target.value });
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
        const { dispatch, error, info, ...p } = this.props;
        return (
            <div>
                <FormGroup controlId={p.id || p.name} validationState={error && "error"}>
                    <Label text={p.label} required={p.required} info={info} />
                    <FormControl id={p.id || p.name} name={p.name} onChange={this.change} onBlur={this.blur} {...p} value={s.value} />
                    {error && <HelpBlock>{error}</HelpBlock>}
                </FormGroup>
            </div>
        );
    }
}
Textbox.propTypes = {
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    info: PropTypes.string,
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

