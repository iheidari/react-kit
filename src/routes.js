import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Flight from './containers/Flight';
export default (
    <div>
        <Route path="/" component={App}>
            <Route path="/test" component={Flight} />
        </Route>
    </div>
);