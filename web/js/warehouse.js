app.factory("API", [
  "$http",
  "$rootScope",
  "$state",
  "Translate",
  "Helpers",

  function ($http, $rootScope, $state, Translate, Helpers) {
    _url = "https://erpapi.code-iss.com:444/";
    // _url = "https://localhost:44393/";
    $rootScope.lang = localStorage.lang;
    $rootScope.Translate = Translate;
    return {
      name: "API",
      url: _url,
      execute: function (_req) {
        Helpers.ShowLoader();
        let headers;
        if (_req.url == "Account/login")
          headers = {
            "Content-Type": "application/json",
          };
        else
          headers = {
            authorization: "Bearer " + localStorage.token,
            "Content-Type": "application/json",
          };

        _req.url = _url + "api/" + _req.url;
        _req.headers = headers;
        let result = $http(_req);
        result.catch(function (_err) {
          var userObj = JSON.parse(localStorage.userObj);
          var expDate = new Date($rootScope.userObj.exp * 1000);
          var today = new Date();
          if (expDate < today) {
            var userObj = JSON.parse(localStorage.userObj);
            $http
              .post(`${_url}api/Account/UpdteLoggedIn/${userObj.userId}`)
              .then(function () {
                delete localStorage.menu;
                delete localStorage.token;
                delete localStorage.userObj;
                Helpers.showErrorMessage(
                  Translate[$rootScope.lang].TEXT_LOGIN_AGAIN
                );
                $state.go("login");
              });
          }
        });
        return result;
      },
    };
  },
]);

function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(b64DecodeUnicode(base64));
}
