const Rx = require('rxjs/Rx');

class Tokenize {

    constructor(options) {
        this.change = Rx.Observable.fromEvent(options.element, 'keyup');
        this.commandKeys = Object.keys(options.commands);
        this.commands = options.commands;
        this.element = options.element;
        this.paramIndex = 0;
        this.prefix = options.prefix;
        this.queue = [];

        this.watchElement();
    }

    reset() {
        this.queue = [];
        this.paramIndex = 0;
        this.element.value = '';
        this.element.placeholder = 'Enter command here';
        this.element.classList.remove('console-mode');
    }

    isCommand(value) {
        let commands = this.prefix ?
            this.commandKeys.map(key => this.prefix + key) : this.commandKeys;

        return commands.find(command => value === command);
    }

    pushToQueue(value, command) {
        // Add command to the queue
        this.queue.push(value);
        this.element.value = '';

        if(this.paramIndex <= command.params.length) {
            console.log(this.paramIndex, command.params.length);
            this.element.placeholder = 'expecting: ' + command.params[this.paramIndex];
            this.paramIndex++;
        } else {
            this.element.placeholder = 'Enter command here'
        }
    }

    invokeCommand(command, params) {
        if (params) {
            params.shift();
            command(...params);
        } else {
            command();
        }

        // Reset
        this.reset();
    }

    assertValue(value, keyCode) {
        let command = this.commands[value.substr(1, value.length)];

        // Check if value is the command
        if(this.isCommand(value) && (!this.queue || !this.queue[0])) {
            !command.params.length ?
                this.invokeCommand(command.operation) :
                this.pushToQueue(value, command);

        } else if(this.queue && this.queue[0]) {
            command = this.commands[this.queue[0].substr(1, this.queue[0].length)];

            if(keyCode === 13) {
                this.pushToQueue(value, command);

                if(!(this.paramIndex <= command.params.length)) {
                    this.invokeCommand(command.operation, this.queue);
                }
            }
        }
    }

    watchElement() {
        this.change.subscribe(event => {
            let value = event.target.value;

            if(event.target.value[0] === this.prefix || (this.queue && this.queue[0])) {
                this.element.classList.add('console-mode');
                this.assertValue(value, event.keyCode);
                if(event.keyCode === 27)
                    this.reset();
            } else {
                this.element.classList.remove('console-mode');
                this.queue = [];
            }
        });
    }

}

module.exports = Tokenize;
