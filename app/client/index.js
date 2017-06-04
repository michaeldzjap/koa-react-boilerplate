import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from '../shared/components/root';

const rootElm = document.getElementById('root');

if (process.env.NODE_ENV === 'development') {
    render(
        <AppContainer>
            <Root />
        </AppContainer>, rootElm
    );

    // Hot reloading on the client
    if (module.hot) {
        module.hot.accept('../shared/components/root', () => {
            const NextRoot = require('../shared/components/root').default;
            render(
                <AppContainer>
                    <NextRoot />
                </AppContainer>, rootElm
            );
        });
    }
} else {
    render(<Root />, rootElm);
}
