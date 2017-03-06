import React from 'react';
import { connect } from 'react-redux';
import validator from '../../lib/validator';
import { FormGroup, FormControl, Radio, HelpBlock } from 'react-bootstrap';
import Label from './Label';
import Info from './Info';

class Options extends React.Component {
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
    change = (e) => {
        console.log(e)
        const value = e.target.value;
        const error = validator.validate(this.props, value);
        this.setState({ value, error });
        if (value != this.props.value || error != this.props.error)
            this.props.dispatch({ type: "FORM", fieldName: this.props.name, value, error });
    }
    render() {
        const s = this.state;
        const { dispatch, error, info, ...p } = this.props;
        if (!p.items || p.items.lenght === 0) return null;
        let toRet = [];
        if (p.placeholder)
            toRet.push(<option value="" key="">{p.placeholder}</option>);
        for (let i = 0; i < p.items.length; i++) {
            toRet.push(
                <option key={p.items[i].value} value={p.items[i].value}>
                    {p.items[i].text}
                </option>);
        }
        return (
            <FormGroup controlId={p.id || p.name} validationState={error && "error"}>
                <Label text={p.label} required={p.required} info={info} />
                <FormControl componentClass="select" onChange={this.change} multiple>
                    {toRet}
                </FormControl>
                {error && <HelpBlock>{error}</HelpBlock>}
            </FormGroup>
        );
    }
}
Options.propTypes = {
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
export default connect(mapStateToProps)(Options);
{/*
        <FormGroup controlId="formControlsSelect">
      <ControlLabel>Select</ControlLabel>
      <FormControl componentClass="select" placeholder="select">
        <option value="select">select</option>
        <option value="other">...</option>
      </FormControl>
    </FormGroup>
    <FormGroup controlId="formControlsSelectMultiple">
      <ControlLabel>Multiple select</ControlLabel>
      <FormControl componentClass="select" multiple>
        <option value="select">select (multiple)</option>
        <option value="other">...</option>
      </FormControl>
    </FormGroup>
*/}