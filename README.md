##Slim-bot

Module for adding command features to an input field

Attaches an event listener to the provided input element. When prefix is entered,
input gets `.console-mode` class and starts listening for commands

##Installation

`npm install slim-bot`

##Usage

HTML
```html
<-- Element to listen to -->
<input type="text" id="input-element" />
```

CSS
```css
/* Class that gets applied when input enters console-mode */
.console-mode {
    background-color: lightred;
}
```

JS
```js
// Import Tokenize from slim-bot
const Tokenize = require('slim-bot');

// Define HTMLInputElement
const inputElement = document.getElementById('input-element');

// Define commands
const myCommands = {
    'open': {
        params: ['path or url'],
        operation: function(path) {
            window.open(path);
        }
    },
    'alert': {
        params: ['message to alert'],
        operation: function(text) {
            alert(text);
        }
    }
};

// Instantiate Tokenize
const slimBot = new Tokenize({
    commands: myCommands,
    element: inputElement,
    prefix: '/'
});

```

##Demo
Play around with the demo
`git clone git@github.com:daviddiefenderfer/slim-bot.git && cd slim-bot/demo && npm start`

App served at localhost:8080
