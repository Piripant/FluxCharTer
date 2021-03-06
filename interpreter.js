// Generated by CoffeeScript 1.10.0
(function() {
  var InterpreteBox, ResumeInterpreter, StopInterpreter, eraseVars, init, interfaceResponse, lastNextBox, running, stop, vars_dict;

  vars_dict = {};

  running = false;

  stop = false;

  lastNextBox = null;

  this.onmessage = function(event) {
    switch (event.data[0]) {
      case 'init':
        return init();
      case 'eraseVars':
        return eraseVars();
      case 'interprete':
        return InterpreteBox(event.data[1]);
      case 'resume':
        return ResumeInterpreter();
      case 'interResponse':
        return interfaceResponse(event.data[1]);
      case 'stop':
        return StopInterpreter();
    }
  };

  init = function() {
    return importScripts('crossWorkerData.js');
  };

  eraseVars = function() {
    return vars_dict = {};
  };

  interfaceResponse = function(vars) {
    vars_dict = vars;
    return ResumeInterpreter();
  };

  ResumeInterpreter = function() {
    if (lastNextBox && running) {
      return InterpreteBox(lastNextBox);
    }
  };

  StopInterpreter = function() {
    if (running) {
      return stop = true;
    }
  };

  InterpreteBox = function(startBox) {
    var error, ex;
    running = true;
    if (!startBox) {
      postMessage(['interface', "intprtAlert('Please select a starting box!')", vars_dict]);
      running = false;
    }
    if (!stop) {
      try {
        if (startBox.type === cmdName) {
          eval(startBox.compText);
          if (startBox.yesBox) {
            return InterpreteBox(startBox.yesBox);
          }
        } else if (startBox.type === interName) {
          postMessage(['interface', startBox.compText, vars_dict]);
          if (startBox.yesBox) {
            lastNextBox = startBox.yesBox;
          } else {
            lastNextBox = null;
          }
        } else if (startBox.type === evalName) {
          if (eval(startBox.compText)) {
            if (startBox.yesBox) {
              return InterpreteBox(startBox.yesBox);
            }
          } else {
            if (startBox.noBox) {
              return InterpreteBox(startBox.noBox);
            }
          }
        } else {
          if (startBox.yesBox) {
            return InterpreteBox(startBox.yesBox);
          }
        }
      } catch (error) {
        ex = error;
        postMessage(['interface', "intprtAlert('An execution error was raised! See console for details')", vars_dict]);
        console.log(ex);
        return running = false;
      }
    } else {
      postMessage(['interface', "intprtAlert('Diagram has been stopped')", vars_dict]);
      stop = false;
      return running = false;
    }
  };

}).call(this);
