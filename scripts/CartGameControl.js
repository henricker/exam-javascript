((window, document) => {
    "use-strict";
  
    class CartGameControl {
        #cartGameTotalP;
        #cartGameItemsDiv;
        #totalValue = 0;

        setCartGameTotalP(cartGameTotalP) {
            this.#cartGameTotalP = cartGameTotalP;
            return this;
        }

        setCartGameItemsDiv(cartGameItemsDiv) {
            this.#cartGameItemsDiv = cartGameItemsDiv;
            this.#addEmptyCart();
            return this;
        }

        addItem(numbers, price, ruleCurrentName) {
            this.#deleteEmptyCart();
            this.#totalValue += price;

            const classRuleGame = ruleCurrentName.toLowerCase().replace('-', '').replace('á', 'a');

            const itemDiv = document.createElement('div');
            itemDiv.classList.value = 'item';
            itemDiv.setAttribute('data-js', price);
            
            const imgGarbage = document.createElement('img');
            imgGarbage.src='assets/garbage.svg';

            const gameItemDiv = document.createElement('div');
            gameItemDiv.classList.value = `game-item ${classRuleGame}`;

            const pNumbers = document.createElement('p');
            pNumbers.classList.value = 'game-numbers';
            pNumbers.innerHTML = numbers.join(', ');

            const spanType = document.createElement('span');
            spanType.classList.value = `type-game ${classRuleGame}`;
            spanType.innerHTML = ruleCurrentName;

            const spanPrice = document.createElement('span');
            spanPrice.classList.value = 'price-game';
            spanPrice.innerHTML = Util.toReal(price);

            gameItemDiv.appendChild(pNumbers);
            gameItemDiv.appendChild(spanType);
            gameItemDiv.appendChild(spanPrice);

            itemDiv.appendChild(imgGarbage);
            itemDiv.appendChild(gameItemDiv);

            this.#cartGameItemsDiv.appendChild(itemDiv);

            this.#cartGameTotalP.innerHTML = `Total: ${Util.toReal(this.#totalValue)}`;

            imgGarbage.addEventListener('click', this.#onDeleteHandler.bind(imgGarbage, this));
            Util.scrollToBottom(this.#cartGameItemsDiv);
        }

        #onDeleteHandler(contextObject) {
            const price = Number.parseFloat(this.parentNode.getAttribute('data-js'));
            contextObject.#totalValue -= price;
            contextObject.#cartGameTotalP.innerHTML = `Total: ${Util.toReal(contextObject.#totalValue)}`;
            this.parentNode.remove();

            if(contextObject.#cartGameItemsDiv.childNodes.length === 0)
                contextObject.#addEmptyCart();
        }

        #addEmptyCart() {
            this.#cartGameItemsDiv.style = 'justify-content: center';
            this.#cartGameItemsDiv.innerHTML = '<p data-js="empty-cart" class="empty-cart"]><img src="assets/empty-cart.png"> Carrinho vazio</p>';        
        }

        #deleteEmptyCart() {
            if(!document.querySelector('p[data-js="empty-cart"]'))
                return;

            this.#cartGameItemsDiv.style = 'justify-content: none';
            const emptyCart = document.querySelector('p[data-js="empty-cart"]');
            emptyCart.remove();
        }
    }

    window.CartGameControl = CartGameControl;
     
  })(window, document);
  