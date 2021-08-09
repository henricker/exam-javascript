((window, document) => {

    const completeGameButton = document.querySelector('button[data-js="complete-game-button"]');
    const clearGameButton = document.querySelector('button[data-js="clear-game-button"]');
    const cartGameButton = document.querySelector('button[data-js="cart-game-button"]');
    const textRule = document.querySelector('p[data-js="text-rule"]');
    const numbersDiv = document.querySelector('div[data-js="numbers"]');
    const cartGameTotalP = document.querySelector('p[data-js="cart-total"]');
    const cartGameItemsDiv = document.querySelector('div[data-js="cart-items"]');
    const gamePanel = document.querySelector('div[data-js="game-panel"]');
    const saveGameButton = document.querySelector('.cart-game button');
    
    function afterRequestHandler(e) {
        
        const typesRules = e.detail['types'];

        const cartGameControl = new CartGameControl();
        cartGameControl
            .setCartGameTotalP(cartGameTotalP)
            .setCartGameItemsDiv(cartGameItemsDiv)
            .setSaveButton(saveGameButton);
            

        //Builder pattern
        const gamePanelControl = new GamePanelControl();
        gamePanelControl
            .setCompleteGameButton(completeGameButton)
            .setClearGameButton(clearGameButton)
            .setCartGameButton(cartGameButton)
            .setTextRule(textRule)
            .setRulesGame(typesRules)
            .setNumbersDiv(numbersDiv)   
            .setCartGameControl(cartGameControl)
            .initialize();
    }

    
    gamePanel.addEventListener('requestFinish', afterRequestHandler);
 

    const requestRules = new RequestRules();
    requestRules
        .setAjax(new XMLHttpRequest())
        .setGamePanel(gamePanel)
        .request();


})(window, document);