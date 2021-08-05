((window, document) => {

    
    const buttonLotoFacil = document.querySelector('button[data-js="lotofacil-option"]');
    const buttonMegaSena = document.querySelector('button[data-js="megasena-option"]');
    const buttonLotoMania = document.querySelector('button[data-js="lotomania-option"');
    const completeGameButton = document.querySelector('button[data-js="complete-game-button"]');
    const clearGameButton = document.querySelector('button[data-js="clear-game-button"]');
    const cartGameButton = document.querySelector('button[data-js="cart-game-button"]');
    const textRule = document.querySelector('p[data-js="text-rule"]');
    const numbersDiv = document.querySelector('div[data-js="numbers"]');
    

    const requestRules = new RequestRules();
    requestRules
        .setAjax(new XMLHttpRequest())
        .request();

    //Veja que uma requisição demanda tempo, dessa forma só vamos executar tudo de fato quando passar ao menos 100ms
    setTimeout(afterRequestHandler, 100);
      
    function afterRequestHandler() {
        const types = requestRules.getTypes();

        //Builder pattern
        const modeGameButtonActive = new ModeGameButtonActive();
        modeGameButtonActive
            .setButtonLotoFacil(buttonLotoFacil)
            .setButtonMegaSena(buttonMegaSena)
            .setButtonLotoMania(buttonLotoMania)
            .setCompleteGameButton(completeGameButton)
            .setClearGameButton(clearGameButton)
            .setCartGameButton(cartGameButton)
            .setTextRule(textRule)
            .setRulesGame(types)
            .setNumbersDiv(numbersDiv)            
            .onClick();
    }

})(window, document);