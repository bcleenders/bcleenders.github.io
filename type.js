var typer = (function(target) {
  var 
    host = '<span class="host">username@example.com</span>',
    instructions,
    type = function() {

      if(instructions.length == 0)
        return;

      var text = instructions[0].text;
          prepause = (typeof instructions[0].prepause != 'undefined') ? instructions[0].prepause : 200;

      if(instructions[0].skiptype == true) {
        setTimeout(function() {
          if(typeof text == 'object') // we have an array of lines!
            text = text.join('<br />');

          skiptype(text);
        }, prepause);
      }
      else {
        //~ past the host + folder we're in, before starting to type
        if(typeof instructions[0].folder != 'undefined')
          paste(host +' <span class="folder">' + instructions[0].folder + " </span>");

        //~ wait a short time, just to fake a user thinking of what to do next
        setTimeout(loopLine, prepause);
      }
    },
    loopLine = function() {
      var currentlyWriting = instructions[0].text.split('');
      (function loop() {
          if(currentlyWriting.length > 0) {
            setTimeout(function() {
                    target.append(currentlyWriting.splice(0,1));
                    loop();  
            }, Math.round(Math.random() * 200) + 50);
          }
          else {
            endLine();
          }
      }());
    },
    paste = function(text) {
      target.append(text);
    },
    skiptype = function(text) {
      paste(text);
      endLine();
    },
    endLine = function() {
      instructions.splice(0,1);
      target.append('<br />');
      type();
    }

  return {
    type: function(i, u, h) {
      host = '<span class="host">' + u + '@' + h + '</span>';
      instructions = i;
      type();
    }
  }
});