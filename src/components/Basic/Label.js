import React from 'react';
import { ControlLabel } from 'react-bootstrap';
import Info from './Info';
const Label = ({ text, required, info }) => {
    if (!text) return null;
    return (
        <ControlLabel>
            {text}
            &nbsp;
            {required && <span className="text-danger" aria-hidden="true">*</span>}
            &nbsp;
            {info && (<Info text={info} />)}
        </ControlLabel>
    );
};
Label.propTypes = {
    text: React.PropTypes.string,
    required: React.PropTypes.bool,
    info: React.PropTypes.string
};
export default Label;

