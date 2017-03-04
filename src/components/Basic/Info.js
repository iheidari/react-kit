import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Info = ({ text, position }) =>
    (
        <OverlayTrigger placement={position || "right"} overlay={<Tooltip id="tooltip">{text}</Tooltip>}>
            <span className="glyphicon glyphicon-info-sign" />
        </OverlayTrigger>
    );
Info.propTypes = {
    text: React.PropTypes.string,
    position: React.PropTypes.string
}
export default Info;
