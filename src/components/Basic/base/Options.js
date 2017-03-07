import React from 'react';
import { connect } from 'react-redux';
import validator from '../../../lib/validator';
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import Label from '../Label';

class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || (props.multiple ? [] : undefined)
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
        let value;
        if (this.props.multiple) {
            let opts = [], opt;
            for (let i = 0; i < e.target.options.length; i++) {
                if (this.props.placeholder && i === 0)
                    continue;
                opt = e.target.options[i];
                if (opt.selected) {
                    opts.push(opt.value);
                }
            }
            value = opts.length ? opts : undefined;
        }
        else {
            value = e.target.value === "" ? undefined : e.target.value;

        }
        const error = validator.validate(this.props, value);
        this.setState({ value, error });
        if (value != this.props.value || error != this.props.error)
            this.props.dispatch({ type: "FORM", fieldName: this.props.name, value, error });
    }
    render() {
        const s = this.state;
        const { dispatch, error, info, items, ...p } = this.props;
        if (!items || items.lenght === 0) return null;
        let toRet = [];
        if (p.placeholder)
            toRet.push(<option value="" key="">{p.placeholder}</option>);
        for (let i = 0; i < items.length; i++) {
            toRet.push(
                <option key={items[i].value} value={items[i].value}>
                    {items[i].text}
                </option>);
        }
        return (
            <FormGroup controlId={p.id || p.name} validationState={error && "error"}>
                <Label text={p.label} required={p.required} info={info} />
                <FormControl componentClass="select" onChange={this.change} value={s.value} multiple={p.multiple} {...p}>
                    {toRet}
                </FormControl>
                {error && <HelpBlock>{error}</HelpBlock>}
            </FormGroup>
        );
    }
}
Options.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.array,
    error: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    info: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    items: React.PropTypes.array,
    multiple: React.PropTypes.bool,
};
const mapStateToProps = (state, props) => {
    return {
        value: state.form && state.form.value && state.form.value[props.name],
        error: state.form && state.form.error && state.form.error[props.name],
    };
};
export default connect(mapStateToProps)(Options);