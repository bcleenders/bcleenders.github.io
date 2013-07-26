var contents = [
  { skiptype: false, folder: '~ $',        text: 'whoami' },
  { skiptype: true,  prepause: 150,        text: 'Bram Leenders' },

  { skiptype: false, folder: '~ $',        text: 'cd ~/Documents/' },

  { skiptype: false, folder: '~ $',        text: 'ls -a' },
  { skiptype: true,  prepause: 150,        text: '.  ..  aboutme.txt  projects.txt'},

  { skiptype: false, folder: '~ $', text: 'cat aboutme.txt' },
  { skiptype: true,  prepause: 150,        text: [
    ' ____                        _                        _                       ',  
    '| __ ) _ __ __ _ _ __ ___   | |    ___  ___ _ __   __| | ___ _ __ ___         ',
    '|  _ \\| \'__/ _` | \'_ ` _ \\  | |   / _ \\/ _ \\ \'_ \\ / _` |/ _ \\ \'__/ __|',
    '| |_) | | | (_| | | | | | | | |__|  __/  __/ | | | (_| |  __/ |  \\__ \\      ',
    '|____/|_|  \\__,_|_| |_| |_| |_____\\___|\\___|_| |_|\\__,_|\\___|_|  |___/   ',
    '',
    'Hello, world!',
    'I\'m Bram, and this is a demo'
  ]},
];

var username = 'bram',
    host = 'bcleenders.github.io';

setTimeout(function() {
  typer($('#container')).type(contents, username, host);
}, 800);
