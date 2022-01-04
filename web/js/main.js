function include(file) {
  var script = document.createElement("script");
  script.src = file;

  script.defer = true;

  document.getElementsByTagName("body").item(0).appendChild(script);
}

include("./app.js");
include("./routes.js");
