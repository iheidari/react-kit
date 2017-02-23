import React from 'react';
import Textbox from '../components/Basic/Textbox';

const Flight = () => {
    let date = new Date();

    // request a weekday along with a long date
    let options = { weekday: 'long' };
    console.log(date.toLocaleDateString('en-US', options));

    return (
        <div>
            <Textbox name="tet1" placeholder="TEST" required text="Hello" />
            <br />
            <Textbox name="test2" rows={3} disabled />
        </div>
    );
};

export default Flight;