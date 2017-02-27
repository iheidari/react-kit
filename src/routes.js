import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Flight from './containers/Flight';
export default (
    <div>
        <Route path="/" component={App}>
            <IndexRoute component={Flight} />
            <Route path="/test" component={Flight} />
        </Route>
    </div>
);