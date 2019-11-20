const fs = require("fs");

function getKeysFromOptions(options){
    const {settings, _locals,...objectKeys} = options
    return Object.keys(objectKeys)
}


function getRenderedContet(content, object) {
  const keys = getKeysFromOptions(object);
  let contentString = content.toString();

  for (const key of keys) {
    contentString = contentString.replace(
      new RegExp(`\{${key}\}`, "gi"),
      object[key]
    );
  }
  return contentString
}

function expressJsx(filepath, options, callback) {
  fs.readFile(filepath, (err, content) => {
    if (err) {
      return callback(err);
    }
    const rendered = getRenderedContet(content, options);

    return callback(null, rendered);
  });
}

module.exports = expressJsx;
