((window, document) => {
  "use-strict";
  class RequestRules {
    #ajax;
    #URL = "http://localhost:3000/types";
    #types;

    setAjax(ajax) {
      this.#ajax = ajax;
      return this;
    }

    request() {
      this.#ajax.open("GET", this.#URL);
      this.#ajax.send();

      this.#ajax.addEventListener(
        "readystatechange",
        this.#handlerStateChange.bind(this)
      );
      return this;
    }

    #handlerStateChange() {
      if (this.#isRequestOk()) {
        this.#types = JSON.parse(this.#ajax.response);
        console.log("Finalizou a request");
      }
    }

    #isRequestOk() {
      return this.#ajax.readyState === 4 && this.#ajax.status === 200;
    }

    getTypes() {
      return this.#types;
    }
  }

  window.RequestRules = RequestRules;
})(window, document);
