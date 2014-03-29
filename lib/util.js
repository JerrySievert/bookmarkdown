function renderJSON (key, value, indent) {
  var text = '', i;

  indent = indent || 0;

  if (Array.isArray(value)) {
    for (i = 0; i < indent; i++) {
      text += " ";
    }

    if (key !== null) {
      text += "\"" + key + "\": ";
    }

    text += "[\n";

    for (var i = 0; i < value.length; i++) {
      text += renderJSON(null, value[i], indent + 2);
      if (i < value.length - 1) {
        text += ",";
      }
      text += "\n";
    }

    for (i = 0; i < indent; i++) {
      text += " ";
    }
    text += "]";
  } else if (value !== null && typeof value === 'object' && value.toString() === '[object Object]') {
    for (i = 0; i < indent; i++) {
      text += " ";
    }

    if (key !== null) {
      text += "\"" + key + "\": ";
    }

    text += "{\n";

    var keys = Object.keys(value);
    for (var i = 0; i < keys.length; i++) {
      text += renderJSON(keys[i], value[keys[i]], indent + 2);
      if (i < keys.length - 1) {
        text += ",";
      }
      text += "\n";
    }

    for (i = 0; i < indent; i++) {
      text += " ";
    }
    text += "}";
  } else if (typeof value === 'number') {
    for (i = 0; i < indent; i++) {
      text += " ";
    }
    if (key !== null) {
      text += "\"" + key + "\": ";
    }

    text += Number(value);
    text += "";
  } else {
    for (i = 0; i < indent; i++) {
      text += " ";
    }
    if (key !== null) {
      text += "\"" + key + "\": ";
    }

    if (value === null) {
      text += "null";
    } else {
      text += '"' + value + '"';
    }

    text += "";
  }

  return text;
}

exports.renderJSON = renderJSON;
