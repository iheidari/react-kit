import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

class _Textbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || "",
            error: ""
        };        
    }
    changed = e => {
        const error = (this.props.required && !e.target.value) ? "Required" : "";
        this.setState({ value: e.target.value, error });
    }
    blur = e => {
        this.props.valueChanged({ name: this.props.name, value: e.target.value });
        if (this.props.required && !e.target.value)
            this.setState({ error: "Required" });
    }    
    render() {
        const p = this.props;
        const s = this.state;
        return (
            <div>
                <TextField id={p.name} name={p.name} value={s.value} hintText={p.placeholder}
                    floatingLabelText={p.text} errorText={s.error} type={p.password ? "password" :"email"}
                    multiLine={p.rows>1} rows={p.rows} rowsMax={p.rows}
                    onChange={this.changed} onBlur={this.blur} disabled={p.disabled} />
            </div>
        );
    }
}
_Textbox.propTypes = () => {
    return { value: PropTypes.string };
};
const mapStateToProps = (state, props) => {
    return {
        value: state.form && state.form[props.name]
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        valueChanged: (value) => dispatch({ type: 'form', payload: value })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(_Textbox);