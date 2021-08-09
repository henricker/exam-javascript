((window, document) => {
  "use-strict";

  class GamePanelControl {
    #completeGameButton;
    #clearGameButton;
    #cartGameButton;
    #numbersDiv;
    #textRule;
    #rulesGame;
    #ruleGameCurrent;
    #numbersGame;
    #cartGameControl;

    #cartGame(contextObject) {

      const ruleCurrent = contextObject.#ruleGameCurrent;

      if(contextObject.#numbersGame.length < ruleCurrent['max-number'])
        return;
    
      
      contextObject.#cartGameControl.addItem(contextObject.#numbersGame, contextObject.#ruleGameCurrent);
    }

    #completeGame(contextObject) {
      const ruleGameCurr = contextObject.#ruleGameCurrent;
   
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

    #activateRules() {
      this.#textRule.innerHTML = this.#ruleGameCurrent.description;
      this.#activateButtonsNumbers(Number.parseInt(this.#ruleGameCurrent.range));
      this.#numbersGame = [];
      this.#cartGameControl.setColorSaveButton(this.#ruleGameCurrent.color);
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
      const ruleGameCurr = this.#ruleGameCurrent;

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

    #activateControlButtons() {
      this.#cartGameButton.style.backgroundColor = `${this.#ruleGameCurrent.color}`;
      this.#cartGameButton.style.color = '#FFF';
      this.#cartGameButton.style.border = 'none';

      this.#clearGameButton.style.borderColor = `${this.#ruleGameCurrent.color}`;
      this.#clearGameButton.style.color = `${this.#ruleGameCurrent.color}`;
      this.#completeGameButton.style.borderColor = `${this.#ruleGameCurrent.color}`;
      this.#completeGameButton.style.color = `${this.#ruleGameCurrent.color}`;
    }

    #createbuttonByType(buttonProps) {
      const button = document.createElement('button');
      button.setAttribute('data-js', buttonProps.type);
      this.#addStyleOnButtonType(button, buttonProps);
      document.querySelector('div.mode').appendChild(button);
      button.addEventListener('click', this.#activeButtonHandler.bind(this, button, buttonProps));
    }

    #addStyleOnButtonType(button, buttonProps) {
      button.style.marginLeft = '1rem';
      button.style.border = `2px solid ${buttonProps.color}`;
      button.style.padding = '.3rem 1.5rem';
      button.style.borderRadius = '6.25rem';
      button.style.cursor = 'pointer';
      button.style.background = ' #FFFFFF 0% 0% no-repeat padding-box';
      button.innerHTML = buttonProps.type;
      button.style.color = `${buttonProps.color}`;
    }

    #activeButtonHandler(button, buttonProps) {
      button.style.color = '#FFF';
      button.style.border = 'none';
      button.style.backgroundColor = `${buttonProps.color}`;

      const rulesWillBeDesatived = this.#rulesGame.filter(rule => rule.type !== buttonProps.type);

      rulesWillBeDesatived.forEach(rule => {
        const buttonRule = document.querySelector(`button[data-js="${rule.type}"]`);
        this.#addStyleOnButtonType(buttonRule, rule);
      }); 

      this.#ruleGameCurrent = buttonProps;
      this.#activateControlButtons();
      this.#activateRules();
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

    initialize() {
      this.#numbersGame = [];
      this.#ruleGameCurrent = this.#rulesGame.find(rule => rule.type === 'Mega-Sena');
      this.#activateRules();
      this.#activateControlButtons();

      this.#rulesGame.forEach(this.#createbuttonByType.bind(this));
      const eventInitialize = new Event('click')
      document.querySelector(`button[data-js="${this.#ruleGameCurrent.type}"]`).dispatchEvent(eventInitialize);

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
  }

  window.GamePanelControl = GamePanelControl;
})(window, document);
