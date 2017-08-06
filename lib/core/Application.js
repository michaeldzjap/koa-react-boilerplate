import Koa from 'koa';

import config from 'config/app';
import Interface from 'lib/patterns/Interface';

class Application {

    constructor() {
        this._app = new Koa();

        this.register();
    }

    callback() {
        return this._app.callback();
    }

    /**
     * Register all base middleware with the application.
     *
     * @return void
     */
    async register() {
        const providerInterface = new Interface('ProviderInterface', ['register']);

        // Loop over all configured middleware providers
        for (const path of config.providers) {

            // import() needs at least one static path part...
            let Provider;
            if (path.includes('lib/')) {
                const providerPath = path.split('lib/')[1];
                Provider = await import(`lib/${providerPath}`);
            } else if (path.includes('app/server/providers/')) {
                const providerPath = path.split('app/server/providers/')[1];
                Provider = await import(`app/server/providers/${providerPath}`);
            }

            // Ensure all middleware providers implement the right contract
            const providerInstance = new Provider.default();
            Interface.ensureImplements(providerInstance, providerInterface);

            // Register the middleware with the app
            providerInstance.register(this._app);
        }
    }
}

export default Application;
