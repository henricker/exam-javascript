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
    #typeGameCurrent = "Mega-Sena"; //Inicialmente assim quando iniciamos o site consideremos que o padrão é Mega-Sena;

    //Para não ter muito código duplicado para a lógica de animação, resolvi aplicar um bind na função handlerButtonActivate, assim consigo generalizar e
    //manter os padrões que queremos com pouco código, lembre-se que ainda passo o contexto do objeto (this) como contextObject.
    onClick() {
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
      contextObject.#activateControlButtons(classControlActive);

      contextObject.#activateRules(this.innerHTML);
      contextObject.#typeGameCurrent = this.innerHTML;
    }

    #activateRules(ruleGame) {
      const ruleGameCurrent = this.#rulesGame.find(
        (rule) => rule.type === ruleGame
      );
      console.log(ruleGameCurrent);
      this.#textRule.innerHTML = ruleGameCurrent.description;
      this.#activateButtonsNumbers(Number.parseInt(ruleGameCurrent.range));
    }

    #activateButtonsNumbers(range) {
        this.#numbersDiv.innerHTML = '';
        
        for(let i = 1; i <= range; i++) {
            const button = document.createElement('button');
            button.setAttribute('data-js', this.#typeGameCurrent);
            button.value = (i < 10) ? `0${i}` : `${i}`;
            button.innerHTML = (i < 10) ? `0${i}` : `${i}`;
            console.log(button);
            this.#numbersDiv.appendChild(button);
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
  }

  window.ModeGameButtonActive = ModeGameButtonActive;
})(window, document);
