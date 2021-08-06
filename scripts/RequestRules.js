((window, document) => {
  "use-strict";
  class RequestRules {
    #ajax;
    #URL = "http://localhost:3000/types";
    #types;
    #gamePanel;

    setAjax(ajax) {
      this.#ajax = ajax;
      return this;
    }

    setGamePanel(gamePanel) {
      this.#gamePanel = gamePanel;
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
        const event = new CustomEvent('requestFinish', { detail: { types: this.#types }});
        this.#gamePanel.dispatchEvent(event);
      }
    }

    #isRequestOk() {
      return this.#ajax.readyState === 4 && this.#ajax.status === 200;
    }
  }

  window.RequestRules = RequestRules;
})(window, document);
