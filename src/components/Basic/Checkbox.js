import React from 'react';
import { connect } from 'react-redux';
import validator from '../../lib/validator';
import { Checkbox as BsCheckbox } from 'react-bootstrap';
import Info from './Info';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || false
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
    change = () => {
        const value = !(this.state.value);
        const error = validator.validate(this.props, value);
        this.setState({ value, error });

        if (value != this.props.value || error != this.props.error)
            this.props.dispatch({ type: "FORM", fieldName: this.props.name, value, error });
    }
    render() {
        const s = this.state;
        const { dispatch, error, info, ...p } = this.props;
        return (
            <BsCheckbox checked={s.value} onChange={this.change} {...p}>
                {error && <span className="text-danger">{error} </span>}
                {p.label}
                &nbsp;
                <Info text={info} />
            </BsCheckbox>
        );
    }
}
Checkbox.propTypes = {
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
export default connect(mapStateToProps)(Checkbox);
