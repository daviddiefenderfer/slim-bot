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
        params: ['Enter a hex code'],
        operation: function(color) {
            document.body.style.backgroundColor = color;
        }
    },
    'big': {
        params: [],
        operation: function() {
          input.blur();
          input.classList.add('big');
          setTimeout(function() {
            input.classList.remove('big');
            input.focus();
          }, 1000);
        }
    },
    'light': {
        params: [],
        operation: function() {
            document.body.style.backgroundColor = 'white';
            input.style.color = '#222';
            var commandList = document.getElementById('command-list');
            commandList.style.color = 'initial';
        }
    },
    'dark': {
        params: [],
        operation: function() {
            document.body.style.backgroundColor = '#333';
            input.style.color = 'white';
            var commandList = document.getElementById('command-list');
            commandList.style.color = 'white';
        }
    }
};

const keys = Object.keys(myCommands)
const list = document.getElementById('availableCommands');

keys.forEach(function(key){
    const li = document.createElement('li');
    li.innerText = '/' + key;
    list.appendChild(li);
})

const bot = new Tokenize ({
    element: input,
    commands: myCommands,
    prefix: '/'
});
