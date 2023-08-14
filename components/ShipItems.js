import { ItemGenerator } from "./Item";

export class ShipItem extends ItemGenerator{
  constructor(item, template, i) {
    super(item, template)
    this._available_shipping = item.available_shipping
    this._available_shipping_quantity = item.available_shipping_quantity
    this._index = i
  }

  _addItem() {
    this.currentQuantity = this._element.querySelector('.shipment__item-quantite');
    this.currentQuantity.textContent = Number(this.currentQuantity.textContent) + 1
    if (Number(this.currentQuantity.textContent) > 1) {
      this.currentQuantity.classList.remove('shipment__item-quantite_hidden')
    }
  }
  
  _removeItem() {
    this.currentQuantity = this._element.querySelector('.shipment__item-quantite');
    this.currentQuantity.textContent = Number(this.currentQuantity.textContent) - 1
    if (Number(this.currentQuantity.textContent) === 1) {
      this.currentQuantity.classList.add('shipment__item-quantite_hidden')
    }
  }

  generateItem() {
    this._element = super._getTemplate();

    this.img = this._element.querySelector('.shipment__item-img');
    this.img.src = this._img;
    
    this.currentQuantity = this._element.querySelector('.shipment__item-quantite');
    
    if(this._currentQuantity > 1) {
      this.currentQuantity.textContent = this._available_shipping_quantity[this._index] ? this._available_shipping_quantity[this._index] :this._currentQuantity
    } 

    return this._element;
  }

}