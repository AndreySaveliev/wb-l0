export class FormValidation {
  constructor(inputContiner, type) {
    this._inputContiner = inputContiner;
    this._input = inputContiner.querySelector('.recipient__input');
    this._span = inputContiner.querySelector('.input__span');
    this._error = inputContiner.querySelector('.input__error');
    this._type = type;
    this._errorMessagesNull = {
      name: 'Укажите имя',
      sername: 'Укажите Фамилию',
      email: 'Укажите электронную почту',
      phone: 'Укажите номер телефона',
      inn: 'Укажите  ИНН',
    };
    this._errorMessages = {
      email: 'Проверьте адрес электронной почты',
      phone: 'Формат: +9 999 999 99 99',
      inn: 'Проверьте ИНН',
    };
    this._count = 0;
  }

  _isValid() {
    if (!this._input.validity.valid && this._input.value.length === 0) {
      this._error.textContent = this._errorMessagesNull[this._type];
      this._error.classList.add('input__error_active')
      this._span.classList.remove('input__span_visible')
    } else if (!this._input.validity.valid) {
      this._error.textContent = this._errorMessages[this._type]
        ? this._errorMessages[this._type]
        : this._input.validationMessage;
        this._error.classList.add('input__error_active')
        this._span.classList.add('input__span_visible')
      } else {
        this._error.textContent = '';
        this._error.classList.remove('input__error_active')
        this._span.classList.add('input__span_visible')
    }
  }

  _addListener() {
    if (this._count === 0) {
      this._input.addEventListener('focusout', () => {
        this._checkValidity();
      });
      this._input.removeEventListener('focusout', () => {
        this._checkValidity();
      });
      this._count += 1;
    } else {
      this._input.addEventListener('input', (e) => {
        this._checkValidity(e);
      });
    }
  }

  _checkValidity(e) {
    this._isValid();
  }

  enableValidation() {
    this._input.addEventListener('focus', () => {
      this._addListener();
    });
  }
}
