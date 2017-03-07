import React from 'react';
import Options from './base/Options';
const ListBox = (p) => {
    return <Options {...p} multiple={true} />;
};
export default ListBox;