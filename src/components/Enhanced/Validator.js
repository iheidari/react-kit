import React from 'react';
import { connect } from 'react-redux';
import validator from '../../lib/validator';

class Validator extends React.Component {
    componentWillReceiveProps(newProps) {
        if (newProps.validate) {
            let focusComponent = null;
            focusComponent = this.explorChilds(newProps.children, newProps);
            if (focusComponent) {
                const element = document.getElementsByName(focusComponent);
                if (element.length > 0)
                    window.setTimeout(function () {
                        element[0].focus();
                    }, 0);
            }
            //validation is finished, so no need to run it again
            this.props.dispatch({ type: "VALIDATE", validate: false });
        }
    }
    explorChilds = (component, props, focusComponent = null) => {
        if (component && Array.isArray(component)) {
            component.forEach(p => {
                if (p.props && p.props.children)
                    focusComponent = this.explorChilds(p.props.children, props, focusComponent);//Recursive function tocheck all the children components also            
            });
        }
        else {
            let childProps = null;
            //in case of component connect to store(controlled components), it wraped with connect, so we should go one level inside to reach props and name            
            if (component.props && component.props.children && component.props.children.props) {
                childProps = component.props.children.props;
            }//if the component is not wraped with connect(this case is for uncontroled components)
            else if (component.props) {
                childProps = component.props;
            }
            //to store control value in store, it need atleast a name
            if (childProps && childProps.name) {
                const name = childProps.name;
                const error = validator.validate(childProps, props.values && props.values[name]);
                if (error && !focusComponent)
                    focusComponent = name;
                props.dispatch({ type: "FORM_ERROR", fieldName: name, error });
            }

        }
        return focusComponent;
    }
    render() {
        const p = this.props;
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
};
export default connect(mapStatetoProps)(Validator);
