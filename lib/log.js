var _errors = [ ];
var _warnings = [ ];
var _debug = [ ];

function log (status) {
  arguments.shift();

  if (status === 'ERROR') {
    _errors.push(arguments);
  } else if (status === 'WARNING') {
    _warnings.push(arguments);
  } else if (status === 'DEBUG') {
    _debug.push(arguments);
  }
}

function error ( ) {
  log('ERROR', arguments);
}

function warning ( ) {
  log('WARNING', arguments);
}

function debug ( ) {
  log('DEBUG', arguments);
}

function getLog(status) {
  if (status === 'ERROR') {
    return _errors;
  } else if (status === 'WARNING') {
    return _warnings;
  } else if (status === 'DEBUG') {
    return _debug;
  }
}

exports.error = error;
exports.warning = warning;
exports.debug = debug;
exports.getLog = getLog;
