((window, document) => {
  "use-strict";

  class ModeGameButtonActive {
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
    }

    #handlerButtonActivate(buttonsToRemoveActive, contextObject) {
      this.classList.add("active");
      buttonsToRemoveActive.forEach((button) =>
        button.classList.remove("active")
      );

      const classControlActive = this.classList.value.replace(" ", "-");
      contextObject.#numbersGame = [];
      contextObject.#activateControlButtons(classControlActive);

      contextObject.#activateRules(this.innerHTML);
      contextObject.#ruleGameCurrent = this.innerHTML;
    }

    #activateRules(ruleGame) {
      const ruleGameCurr = this.#rulesGame.find(
        (rule) => rule.type === ruleGame
      );

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
        button.addEventListener('click', this.#buttonNumberActiveHandler.bind(this, button));
        this.#numbersDiv.appendChild(button);
      }
    }

    #buttonNumberActiveHandler(buttonContext) {
      const ruleGameCurr = this.#rulesGame.find(
        (rule) => rule.type === this.#ruleGameCurrent
      );

      if(this.#numbersGame.length < Number.parseInt(ruleGameCurr['max-number'])) {
        buttonContext.classList.add('active');
        this.#numbersGame.push(buttonContext.value);
      }
    }

    #activateControlButtons(activetedClass) {
      this.#cartGameButton.classList.value = `cart-button ${activetedClass}`;
      this.#clearGameButton.classList.value = `${activetedClass}`;
      this.#completeGameButton.classList.value = `${activetedClass}`;
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

    #initialize() {
      this.#numbersGame = [];
      this.#ruleGameCurrent = "Mega-Sena";
      this.#activateRules("Mega-Sena");
      this.#activateControlButtons("megasena-active");
    }
  }

  window.ModeGameButtonActive = ModeGameButtonActive;
})(window, document);
