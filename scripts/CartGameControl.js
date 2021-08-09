((window, document) => {
    "use-strict";
  
    class CartGameControl {
        #cartGameTotalP;
        #cartGameItemsDiv;
        #saveButton;
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

        setSaveButton(saveButton) {
            this.#saveButton = saveButton;
            return this;
        }

        setColorSaveButton(color) {
            this.#saveButton.style.color = `${color}`;
            this.#saveButton.childNodes[1].setAttribute('fill', color);
        }

        addItem(numbers, ruleCurrent) {
            this.#deleteEmptyCart();
            this.#totalValue += ruleCurrent.price;

            const itemDiv = document.createElement('div');
            itemDiv.classList.value = 'item';
            itemDiv.setAttribute('data-js', ruleCurrent.price);
            
            const imgGarbage = document.createElement('img');
            imgGarbage.src='assets/garbage.svg';

            const gameItemDiv = document.createElement('div');
            gameItemDiv.classList.value = `game-item`;

            const pNumbers = document.createElement('p');
            pNumbers.classList.value = 'game-numbers';
            pNumbers.innerHTML = numbers.join(', ');

            const spanType = document.createElement('span');
            spanType.classList.value = `type-game`;
            spanType.innerHTML = ruleCurrent.type;
            spanType.style.color = `${ruleCurrent.color}`;

            const spanPrice = document.createElement('span');
            spanPrice.classList.value = 'price-game';
            spanPrice.innerHTML = Util.toReal(ruleCurrent.price);

            gameItemDiv.appendChild(pNumbers);
            gameItemDiv.appendChild(spanType);
            gameItemDiv.appendChild(spanPrice);
            gameItemDiv.style.borderLeft = `2px solid ${ruleCurrent.color}`;

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
  