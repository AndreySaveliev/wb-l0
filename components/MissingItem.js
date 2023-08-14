import { ItemGenerator } from "./Item";

export class MissingItem extends ItemGenerator {
  constructor(item, template) {
    super(item, template);
  }

  genereteItem() {

    this._element = super._getTemplate();
    this.name = this._element.querySelector('.item__name');
    this.name.textContent = this._name;
    
    this.img = this._element.querySelector('.item__img');
    this.img.src = this._img;

    this.spec = this._element.querySelectorAll('.item__spec');
    if (this._specs) {
      this.spec.forEach((node, index) => {
        node.textContent = this._specs[index];
      });
    }

    this._createDeleteButton()
    return this._element;
  }

  _createDeleteButton() {
    this.deleteButton = this._element.querySelector('.item__button_delete');
    this.deleteButton.addEventListener('click', () => {
      this._element.remove();
    });
  }
}