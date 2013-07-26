var contents = [
  { skiptype: false, folder: '~ $',        text: 'whoami' },
  { skiptype: true,  prepause: 150,        text: 'Bram Leenders' },

  { skiptype: false, folder: '~ $',        text: 'cd ~/Documents/' },

  { skiptype: false, folder: '~/Documents/ $',        text: 'ls -a' },
  { skiptype: true,  prepause: 150,        text: '.  ..  aboutme.txt  projects.txt'},

  { skiptype: false, folder: '~/Documents/ $', text: 'cat aboutme.txt' },
  { skiptype: true,  prepause: 150,        text: [
    ' ____                        _                        _                       ',  
    '| __ ) _ __ __ _ _ __ ___   | |    ___  ___ _ __   __| | ___ _ __ ___         ',
    '|  _ \\| \'__/ _` | \'_ ` _ \\  | |   / _ \\/ _ \\ \'_ \\ / _` |/ _ \\ \'__/ __|',
    '| |_) | | | (_| | | | | | | | |__|  __/  __/ | | | (_| |  __/ |  \\__ \\      ',
    '|____/|_|  \\__,_|_| |_| |_| |_____\\___|\\___|_| |_|\\__,_|\\___|_|  |___/   ',
    '',
    'Hello, world!',
    'I\'m Bram, and this is a demo' ]},
  { skiptype: false, folder: '~/Documents/ $',        text: 'cat projects.txt' },
  { skiptype: true,                        text: [
    'Some of my code:',
    '  <a href="http://sciencechallenges.nl/" target="_blank">ScienceChallenges</a> website <i>(<a href="https://github.com/boersmamarcel/challengesplatform" target="_blank">view on GitHub</a>)</i>',
    '    A platform to support the ScienceChallenges project, a way to enhance higher education.',
    '  <a href="http://bcleenders.github.io/AI-tic-tac-toe-browser/" target="_blank">AI tic-tac-toe bot</a>',
    '    Originally written for an assignment in Node.js, but I rewrote some parts of it to make it run in a browser as well',
    '  <a href="https://github.com/bcleenders/norvig-award" target="_blank">Norvig Web Data Science Award participation</a> <i>(<a href="https://github.com/norvigaward/naward09/wiki" target="_blank">view documentation</a>)</i>',
    '    A big data challenge, organized by SURFsara and Common Crawl.',
    '    I participated, and had to autodedact myself on the whole Hadoop/big data subject.',
    '  <a href="http://corz.org/serv/security/pajamas.php" target="_blank">MyPajamas</a> login system (~ 2010)',
    '    A PHP/MySQL authentication script, which only sends encrypted credentials (even over http), inspired by the pajamas script.',
    '    (I\'m DamnYankee/DY)',
    ]},
];

var username = 'bram',
    host = 'bcleenders.github.io';

setTimeout(function() {
  typer($('#container')).type(contents, username, host);
}, 800);
