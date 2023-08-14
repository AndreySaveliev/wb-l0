export class ItemGenerator {
  constructor(item, template, reciept, linkedItems, ship) {
    (this._name = item.name), (this._tempalte = template);
    this._seller = item.seller;
    this._org = item.org;
    this._img = item.img;
    this._maxQuantity = item.maxQuantity;
    this._priveWithOutSale = item.priveWithOutSale;
    this._currentPrice = item.currentPrice;
    this._currency = item.currency;
    this._specs = item.specs;
    this._currentQuantity = item.currentQuantity;
    this._reciept = reciept 
    this._linkedItems = linkedItems
    this._ship = ship
  }

  _getTemplate() {
    const newCard = this._tempalte.cloneNode(true);
    return newCard;
  }

  _checkButtons(upButton, downButton) {
    if (this._currentQuantity === this._maxQuantity) {
      upButton.classList.add('item__button_quantity_unactive');
    } else {
      upButton.classList.remove('item__button_quantity_unactive');
    }
    if (this._currentQuantity > 1) {
      downButton.classList.remove('item__button_quantity_unactive');
    } else {
      downButton.classList.add('item__button_quantity_unactive');
    }
  }

  _createPrice() {
    this.currentPrice = this._element.querySelector('.item__price_current');
    this.price = this._currentPrice * this._currentQuantity;
    if (String(this.price).length >= 6) {
      this.currentPrice.classList.add('item__price_current-smal');
    }
    this.currentPrice.textContent = this.price + ' ' + this._currency;
    this.previosPrice = this._element.querySelector('.item__price_prev');
    this.previosPrice.textContent = this._priveWithOutSale*this._currentQuantity + ' ' + this._currency;
  }

  
  _createIncreaseButton() {
    this.increaseButton = this._element.querySelector('.item__button_increase');
    this.increaseButton.addEventListener('click', () => {
      if (this._currentQuantity === this._maxQuantity) {
        return;
      } else {
        this._currentQuantity = this._currentQuantity + 1;
        this.quantite.textContent = this._currentQuantity;
        this._checkButtons(this.increaseButton, this.decreaseButton);
        this.currentPrice.textContent = this.getPosPrice() + ' ' + this._currency;
        this._reciept.addItemToReceipt(this._currentPrice, this._currency, this._priveWithOutSale)
        this.previosPrice.textContent = this._priveWithOutSale*this._currentQuantity + ' ' + this._currency;
        this._ship._addItem()
      }
    });
  }
  
  _createDecreaseButton() {
    this.decreaseButton = this._element.querySelector('.item__button_decrease');
    this.decreaseButton.addEventListener('click', () => {
      if (this._currentQuantity === 1) {
        return;
      } else {
        this._currentQuantity = this._currentQuantity - 1;
        this.quantite.textContent = this._currentQuantity;
        this._checkButtons(this.increaseButton, this.decreaseButton);
        this.currentPrice.textContent = this.getPosPrice() + ' ' + this._currency;
        this._reciept.removeItemToReceipt(this._currentPrice, this._currency, this._priveWithOutSale)
        this.previosPrice.textContent = this._priveWithOutSale*this._currentQuantity + ' ' + this._currency;
        this._ship._removeItem()
      }
    });
  }
  
  _initStartButtonState() {
    if ((this._currentQuantity < this._maxQuantity || this._maxQuantity === null) && this._currentQuantity > 1 ) {
      this.increaseButton.classList.remove('item__button_quantity_unactive');
      this.decreaseButton.classList.remove('item__button_quantity_unactive');
    } else if (this._currentQuantity === this._maxQuantity) {
      this.increaseButton.classList.add('item__button_quantity_unactive');
      this.decreaseButton.classList.remove('item__button_quantity_unactive');
    } else {
      this.increaseButton.classList.remove('item__button_quantity_unactive');
      this.decreaseButton.classList.add('item__button_quantity_unactive');
    }
  }
  
  _createDeleteButton() {
    this.deleteButton = this._element.querySelector('.item__button_delete');
    this.deleteButton.addEventListener('click', () => {
      this._reciept.deleteFullItemFromReceipt(this)
      this._element.remove();
      this._linkedItems.forEach((item) => item.remove())
    });
  }
  
  genereteItem() {
    this._element = this._getTemplate();
    
    this.name = this._element.querySelector('.item__name');
    this.name.textContent = this._name;
    
    this.seller = this._element.querySelector('.seller__name');
    this.seller.textContent = this._seller;
    
    this.company = this._element.querySelector('.seller__company');
    this.company.textContent = this._org;
    
    this.img = this._element.querySelector('.item__img');
    
    this.img.src = this._img;
    this.last = this._element.querySelector('.item__quantity-last');
    
    if (this._maxQuantity) {
      this.last.textContent = 'Осталось ' + this._maxQuantity + ' шт.';
    }
    
    this.spec = this._element.querySelectorAll('.item__spec');
    if (this._specs) {
      this.spec.forEach((node, index) => {
        node.textContent = this._specs[index];
      });
    }
    
    this.quantite = this._element.querySelector('.item__quantity');
    this.quantite.textContent = this._currentQuantity;
    
    this._createPrice();
    this._createIncreaseButton();
    this._createDecreaseButton();
    this._initStartButtonState();
    this._createDeleteButton();
    
    return this._element;
  }
  
  getPosPrice() {
    return this._currentQuantity * this._currentPrice;
  }
}
