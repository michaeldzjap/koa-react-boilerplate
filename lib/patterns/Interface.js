class Interface {

    /**
     * The Interface constructor.
     *
     * @param String name
     * @param Array methods
     * @return void
     * @throws Error
     */
    constructor(name, methods) {
        if (arguments.length !== 2) {
            throw new Error(`Interface constructor called with ${arguments.length} arguments, but expected exactly 2.`);
        }

        this.name = name;
        this.methods = [];

        for (const method of methods) {
            if (typeof method !== 'string') {
                throw new Error('Interface constructor expects method names to be passes in as a string.');
            }

            this.methods.push(method);
        }
    }

    /**
     * Ensure a given object instance implements a certain number of given Interface
     * instances.
     *
     * @param Object object
     * @param Interface interface
     * @return void
     * @throws Error
     */
    static ensureImplements(object,...interfaces) {
        if (!object || !interfaces || interfaces.length < 1) {
            throw new Error(`Function Interface.ensureImplements called with ${arguments.length} arguments, but expected at least 2.`);
        }

        for (const interfaceInstance of interfaces) {
            if (interfaceInstance.constructor !== Interface) {
                throw new Error('Function Interface.ensureImplements expects arguments two and above to be instances of Interface.');
            }

            for (const method of interfaceInstance.methods) {
                if (!object[method] || typeof object[method] !== 'function') {
                    throw new Error(`Function Interface.ensureImplements: object does not implement the ${interfaceInstance.name} interface. Method ${method} was not found.`);
                }
            }
        }
    }

}

export default Interface;
