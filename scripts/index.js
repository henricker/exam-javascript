(() => {
    'use-strict';

    class ModeGameButtonActive {
        #buttonLotofacil;
        #buttonMegaSena;
        #buttonLotoMania;
        #completeGameButton;
        #clearGameButton
        #cartGameButton;

        constructor(buttonLotoFacil, buttonMegaSena, buttonLotoMania, completeGameButton, clearGameButton, cartGameButton) {
            this.#buttonLotofacil = buttonLotoFacil;
            this.#buttonLotoMania = buttonLotoMania;
            this.#buttonMegaSena = buttonMegaSena;
            this.#completeGameButton = completeGameButton;
            this.#clearGameButton = clearGameButton;
            this.#cartGameButton = cartGameButton;
        }

        onClick() {
            this.#buttonLotoMania.addEventListener('click', () => {
               this.#buttonLotoMania.classList.add('active');
               this.#buttonLotofacil.classList.remove('active');
               this.#buttonMegaSena.classList.remove('active');

               this.#cartGameButton.classList.value = 'cart-button lotomania-active';
               this.#clearGameButton.classList.value = 'lotomania-active';
               this.#completeGameButton.classList.value = 'lotomania-active';
            });

            this.#buttonLotofacil.addEventListener('click', () => {
                this.#buttonLotofacil.classList.add('active');
                this.#buttonLotoMania.classList.remove('active');
                this.#buttonMegaSena.classList.remove('active');

                this.#cartGameButton.classList.value = 'cart-button lotofacil-active';
                this.#clearGameButton.classList.value = 'lotofacil-active';
                this.#completeGameButton.classList.value = 'lotofacil-active';
            });

            this.#buttonMegaSena.addEventListener('click', () => {
                this.#buttonMegaSena.classList.add('active');
                this.#buttonLotoMania.classList.remove('active');
                this.#buttonLotofacil.classList.remove('active');

                this.#cartGameButton.classList.value = 'cart-button megasena-active';
                this.#clearGameButton.classList.value = 'megasena-active';
                this.#completeGameButton.classList.value = 'megasena-active';
            });
        }
    }

    const buttonLotoFacil = document.querySelector('button[data-js="lotofacil-option"]');
    const buttonMegaSena = document.querySelector('button[data-js="megasena-option"]');
    const buttonLotoMania = document.querySelector('button[data-js="lotomania-option"');
    const completeGameButton = document.querySelector('button[data-js="complete-game-button"]');
    const clearGameButton = document.querySelector('button[data-js="clear-game-button"]');
    const cartGameButton = document.querySelector('button[data-js="cart-game-button"]');
    
    
    

    const modeGameButtonActive = new ModeGameButtonActive(buttonLotoFacil, buttonMegaSena, buttonLotoMania, completeGameButton, clearGameButton, cartGameButton);
    modeGameButtonActive.onClick();

})();