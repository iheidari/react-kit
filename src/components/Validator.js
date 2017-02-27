import React from 'react';
import { connect } from 'react-redux';
import validator from '../lib/validator';

class Textbox extends React.Component {
    componentWillReceiveProps(newProps) {
        if (newProps.validate) {
            newProps.children.forEach(p => {
                if (p && p.props && p.props.name) {//the component has props and name(to store control value in store, it need atleast a name)
                    const name = p.props.name;
                    const error = validator.validate(p.props,newProps.values && newProps.values[name]);
                    newProps.dispatch({ type: "FORM_ERROR", fieldName: name, error });
                }
            });
            //validation is finished, so no need to run it again
            this.props.dispatch({ type: "VALIDATE", validate: false });
        }
    }    
    render() {
        const p = this.props;
        //console.log(p.children);
        return (<div>{p.children}</div>);
    }
}
const mapStatetoProps = (state) => {
    return ({
        //validate: state.validator && state.validator[props.name] && state.validator[props.name].validate,
        validate: state.form.validator,
        values: state.form.value
        //result: state.validator && state.validator[props.name] && state.validator[props.name].result
    });
}
export default connect(mapStatetoProps)(Textbox);
