const Tokenize = require('slim-bot');

const input = document.getElementById('command-input');

const myCommands = {
    'open': {
        params: ['path or url'],
        operation: function(path) {
            window.open(path);
        }
    },
    'backgroundColor': {
        params: ['hex code'],
        operation: function(color) {
            document.body.style.backgroundColor = color;
        }
    }
};

const bot = new Tokenize ({
    element: input,
    commands: myCommands,
    prefix: '/'
});

