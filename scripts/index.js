((window, document) => {

    const buttonLotoFacil = document.querySelector('button[data-js="lotofacil-option"]');
    const buttonMegaSena = document.querySelector('button[data-js="megasena-option"]');
    const buttonLotoMania = document.querySelector('button[data-js="lotomania-option"');
    const completeGameButton = document.querySelector('button[data-js="complete-game-button"]');
    const clearGameButton = document.querySelector('button[data-js="clear-game-button"]');
    const cartGameButton = document.querySelector('button[data-js="cart-game-button"]');
    const textRule = document.querySelector('p[data-js="text-rule"]');
    const numbersDiv = document.querySelector('div[data-js="numbers"]');
    const cartGameTotalP = document.querySelector('p[data-js="cart-total"]');
    const cartGameItemsDiv = document.querySelector('div[data-js="cart-items"]');
    const gamePanel = document.querySelector('div[data-js="game-panel"]');

    function afterRequestHandler(e) {
        
        const typesRules = e.detail['types'];

        const cartGameControl = new CartGameControl();
        cartGameControl
            .setCartGameTotalP(cartGameTotalP)
            .setCartGameItemsDiv(cartGameItemsDiv)
            

        //Builder pattern
        const gamePanelControl = new GamePanelControl();
        gamePanelControl
            .setButtonLotoFacil(buttonLotoFacil)
            .setButtonMegaSena(buttonMegaSena)
            .setButtonLotoMania(buttonLotoMania)
            .setCompleteGameButton(completeGameButton)
            .setClearGameButton(clearGameButton)
            .setCartGameButton(cartGameButton)
            .setTextRule(textRule)
            .setRulesGame(typesRules)
            .setNumbersDiv(numbersDiv)   
            .setCartGameControl(cartGameControl)        
            .onClick();
    }

    
    gamePanel.addEventListener('requestFinish', afterRequestHandler);
 

    const requestRules = new RequestRules();
    requestRules
        .setAjax(new XMLHttpRequest())
        .setGamePanel(gamePanel)
        .request();


})(window, document);