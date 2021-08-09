((window, document) => {
  "use-strict";

  class GamePanelControl {
    #buttonLotofacil;
    #buttonMegaSena;
    #buttonLotoMania;
    #completeGameButton;
    #clearGameButton;
    #cartGameButton;
    #numbersDiv;
    #textRule;
    #rulesGame;
    #ruleGameCurrent;
    #numbersGame;
    #cartGameControl;

    onClick() {
      this.#initialize();

      this.#buttonLotoMania.addEventListener(
        "click",
        this.#handlerButtonActivate.bind(
          this.#buttonLotoMania,
          [this.#buttonLotofacil, this.#buttonMegaSena],
          this
        )
      );
      this.#buttonLotofacil.addEventListener(
        "click",
        this.#handlerButtonActivate.bind(
          this.#buttonLotofacil,
          [this.#buttonLotoMania, this.#buttonMegaSena],
          this
        )
      );
      this.#buttonMegaSena.addEventListener(
        "click",
        this.#handlerButtonActivate.bind(
          this.#buttonMegaSena,
          [this.#buttonLotofacil, this.#buttonLotoMania],
          this
        )
      );
      this.#completeGameButton.addEventListener(
        "click",
        this.#completeGame.bind(this.#completeGameButton, this)
      );
      this.#clearGameButton.addEventListener(
        "click",
        this.#clearGame.bind(this.#clearGameButton, this)
      );
      this.#cartGameButton.addEventListener(
        "click",
        this.#cartGame.bind(this.#cartGameButton, this)
      );
    }
    
    #cartGame(contextObject) {

      const ruleCurrent = contextObject.#getRuleCurrent(contextObject.#ruleGameCurrent);

      if(contextObject.#numbersGame.length < ruleCurrent['max-number'])
        return;
     
      const ruleCurrentName = ruleCurrent.type;
      const ruleCurrentPrice = ruleCurrent.price;
      
      contextObject.#cartGameControl.addItem(contextObject.#numbersGame, ruleCurrentPrice, ruleCurrentName);
    }

    #completeGame(contextObject) {
      const ruleGameCurr = contextObject.#getRuleCurrent(
        contextObject.#ruleGameCurrent
      );

      if (
        contextObject.#numbersGame.length ===
        Number.parseInt(ruleGameCurr["max-number"])
      )
        contextObject.#clearGame.bind(contextObject.#clearGameButton, contextObject)();

      while (
        contextObject.#numbersGame.length <
        Number.parseInt(ruleGameCurr["max-number"])
      ) {
        let newNumber = Util.getRandomNumber(
          1,
          Number.parseInt(ruleGameCurr.range)
        );
        newNumber = newNumber < 10 ? `0${newNumber}` : `${newNumber}`;
        !contextObject.#numbersGame.some((number) => number === newNumber)
          ? contextObject.#numbersGame.push(newNumber)
          : "";
      }

      let buttonsSelecteds = [];
      contextObject.#numbersDiv.childNodes.forEach((button) => {
        contextObject.#numbersGame.some((value) => button.value === value)
          ? buttonsSelecteds.push(button)
          : "";
      });

      buttonsSelecteds.forEach((button) => {
        !button.classList.contains("active")
          ? button.classList.add("active")
          : "";
      });
    }

    #clearGame(contextObject) {
      let buttonsSelecteds = [];
      contextObject.#numbersDiv.childNodes.forEach((button) => {
        contextObject.#numbersGame.some((value) => button.value === value)
          ? buttonsSelecteds.push(button)
          : "";
      });

      buttonsSelecteds.forEach((button) => {
        button.classList.remove("active");
      });

      contextObject.#numbersGame = [];
    }

    #handlerButtonActivate(buttonsToRemoveActive, contextObject) {
      this.classList.add("active");
      buttonsToRemoveActive.forEach((button) =>
        button.classList.remove("active")
      );

      const classControlActive = this.classList.value.replace(" ", "-");
      contextObject.#numbersGame = [];
      contextObject.#activateControlButtons(classControlActive);

      contextObject.#ruleGameCurrent = this.innerHTML;
      contextObject.#activateRules();
    }

    #activateRules() {
      const ruleGameCurr = this.#getRuleCurrent(this.#ruleGameCurrent);

      this.#textRule.innerHTML = ruleGameCurr.description;
      this.#activateButtonsNumbers(Number.parseInt(ruleGameCurr.range));
    }

    #activateButtonsNumbers(range) {
      this.#numbersDiv.innerHTML = "";

      for (let i = 1; i <= range; i++) {
        const button = document.createElement("button");
        button.setAttribute("data-js", this.#ruleGameCurrent);
        button.value = i < 10 ? `0${i}` : `${i}`;
        button.innerHTML = i < 10 ? `0${i}` : `${i}`;
        button.addEventListener(
          "click",
          this.#buttonNumberActiveHandler.bind(this, button)
        );
        this.#numbersDiv.appendChild(button);
      }
    }

    #buttonNumberActiveHandler(buttonContext) {
      const ruleGameCurr = this.#getRuleCurrent(this.#ruleGameCurrent);

      if (buttonContext.classList.contains("active")) {
        buttonContext.classList.remove("active");
        this.#numbersGame = this.#numbersGame.filter(
          (number) => number !== buttonContext.value
        );
        return;
      }

      if (
        this.#numbersGame.length < Number.parseInt(ruleGameCurr["max-number"])
      ) {
        buttonContext.classList.add("active");
        this.#numbersGame.push(buttonContext.value);
      }
    }

    #activateControlButtons(activetedClass) {
      this.#cartGameButton.classList.value = `cart-button ${activetedClass}`;
      this.#clearGameButton.classList.value = `${activetedClass}`;
      this.#completeGameButton.classList.value = `${activetedClass}`;
    }

    #getRuleCurrent(ruleGame) {
      return this.#rulesGame.find((rule) => rule.type === ruleGame);
    }

    setButtonLotoFacil(buttonLotoFacil) {
      this.#buttonLotofacil = buttonLotoFacil;
      return this;
    }

    setButtonMegaSena(buttonMegaSena) {
      this.#buttonMegaSena = buttonMegaSena;
      return this;
    }

    setButtonLotoMania(buttonLotoMania) {
      this.#buttonLotoMania = buttonLotoMania;
      return this;
    }

    setCompleteGameButton(completeGameButton) {
      this.#completeGameButton = completeGameButton;
      return this;
    }

    setClearGameButton(clearGameButton) {
      this.#clearGameButton = clearGameButton;
      return this;
    }

    setCartGameButton(cartGameButton) {
      this.#cartGameButton = cartGameButton;
      return this;
    }

    setTextRule(textRule) {
      this.#textRule = textRule;
      return this;
    }

    setRulesGame(rulesGame) {
      this.#rulesGame = rulesGame;
      return this;
    }

    setNumbersDiv(numbersDiv) {
      this.#numbersDiv = numbersDiv;
      return this;
    }

    setCartGameControl(cartGameControl) {
      this.#cartGameControl = cartGameControl;
      return this;
    }

    #initialize() {
      this.#numbersGame = [];
      this.#ruleGameCurrent = "Mega-Sena";
      this.#activateRules("Mega-Sena");
      this.#activateControlButtons("megasena-active");
    }
  }

  window.GamePanelControl = GamePanelControl;
})(window, document);
