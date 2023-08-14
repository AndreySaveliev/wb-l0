import { ItemGenerator } from './components/Item';
import { MissingItem } from './components/MissingItem';
import { Receipt } from './components/Receipt';
import { ShipItem } from './components/ShipItems';
import { itemsData } from './utils/ItemsData';
import { FormValidation } from './utils/formValidation';

export const main = document.querySelector('.main');

const inputName = main.querySelector('.input-container_name');
const inputSername = main.querySelector('.input-container_sername');
const inputEmail = main.querySelector('.input-container_email');
const inputPhone = main.querySelector('.input-container_phone');
const inputInn = main.querySelector('.input-container_inn');

const validNameInput = new FormValidation(inputName, 'name');
const validSernameInput = new FormValidation(inputSername, 'sername');
const validEmailInput = new FormValidation(inputEmail, 'email');
const validPhoneInput = new FormValidation(inputPhone, 'phone');
const validInnInput = new FormValidation(inputInn, 'inn');
validNameInput.enableValidation();
validSernameInput.enableValidation();
validEmailInput.enableValidation();
validPhoneInput.enableValidation();
validInnInput.enableValidation();

const itemMarkup = main.querySelector('#item').content;
const itemTemplate = itemMarkup.querySelector('.bin__item');

const recieptMarkdown = main.querySelector('.receipt');
const reciept = new Receipt(recieptMarkdown);

const shipmnetMarkdown = main.querySelector('#missign-item').content
const shipmentTamplate = shipmnetMarkdown.querySelector('.shipmnet__item')

const renderBin = () => {
  itemsData.forEach((item) => {
    let binItem
    let shipItem
    let linkedItems = []
    let ship
    for (let i =0; i<item.available_shipping.length; i++) {
      ship = new ShipItem(item, shipmentTamplate, i)
      shipItem = ship.generateItem()
      linkedItems.push(shipItem)
      if (i==item.available_shipping.length-1 && item.available_shipping.length > 1) {
        main.querySelector('.sipmnet__items-date_second').prepend(shipItem)
      } else {
        main.querySelector('.sipmnet__items-date_frist').prepend(shipItem)
      }
    }
    binItem = new ItemGenerator(item, itemTemplate, reciept, linkedItems, ship);
    const content = binItem.genereteItem();
    reciept.initReceipt(binItem);
    main.querySelector('.bin__items').append(content);
  });
};

reciept.generateReceipt();

renderBin();

const missingMarkdown = main.querySelector('#missing').content;
const missingTemplate = missingMarkdown.querySelector('.bin__item');



const renderMissingItems = () => {
  itemsData.forEach((item) => {
    const itemInBin = new MissingItem(item, missingTemplate);
    const missingItem = itemInBin.genereteItem();
    main.querySelector('.missing-items-container').append(missingItem);

    
  });
};

renderMissingItems();


const binSwitcher = main.querySelector('.button__hide-all');
const bin = main.querySelector('.bin__items');
binSwitcher.addEventListener('click', () => {
  bin.classList.toggle('close-animation');
});

const missingSwitcher = main.querySelector('.button__hide-all-missing');
const missingBin = main.querySelector('.missing-items-container');
missingSwitcher.addEventListener('click', () => {
  missingBin.classList.toggle('close-animation');
});

const selectAllCheckBox = main.querySelector('.button__select-all');
const allSelectOneCheckBoxes = main.querySelectorAll('.button__select-one');

allSelectOneCheckBoxes.forEach((checkbox) => {
  checkbox.addEventListener('click', () => {
    if (!checkbox.checked) {
      selectAllCheckBox.checked = false
    }
  })
})

selectAllCheckBox.addEventListener('click', () => {
  allSelectOneCheckBoxes.forEach((checkBox) => {
    checkBox.checked = selectAllCheckBox.checked;
  });
});
