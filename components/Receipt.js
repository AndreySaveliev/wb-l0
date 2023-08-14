export class Receipt {
  constructor(markdown) {
    this._total = 0
    this._count = 0
    this._totalWIthoutSale = 0
    this._sale = 0
    this.shipment = 'Бесплатно'
    this._markdown = markdown
    this._item = item
  }

  addItemToReceipt(price, currency, prevPrice) {
    this.total = this._markdown.querySelector('.receipt__price')
    this._total += price
    this.total.textContent = this._total + ' ' + currency
    this.totalWIthoutSale = this._markdown.querySelector('.receipt__total_sale') 
    this._totalWIthoutSale += prevPrice
    this.totalWIthoutSale.textContent = this._totalWIthoutSale + ' ' + currency
    this.count = this._markdown.querySelector('.receipt__count')
    this._count += 1
    this.count.textContent = this._count
    this.sale = this._markdown.querySelector('.receipt__sale')
    this._sale += (prevPrice-price)
    this.sale.textContent = '-' + ' ' + this._sale + ' ' + currency
  }
  removeItemToReceipt(price, currency, prevPrice) {
    this.total = this._markdown.querySelector('.receipt__price')
    this._total -= price
    this.total.textContent = this._total + ' ' + currency
    this.totalWIthoutSale = this._markdown.querySelector('.receipt__total_sale') 
    this._totalWIthoutSale -= prevPrice
    this.totalWIthoutSale.textContent = this._totalWIthoutSale + ' ' + currency
    this.count = this._markdown.querySelector('.receipt__count')
    this._count -= 1
    this.count.textContent = this._count
    this.sale = this._markdown.querySelector('.receipt__sale')
    this._sale -= (prevPrice-price)
    this.sale.textContent = '-' + ' ' + this._sale + ' ' + currency
  }

  deleteFullItemFromReceipt(item) {
    console.log(item)
    this.total = this._markdown.querySelector('.receipt__price')
    this._total -= item._currentQuantity*item._currentPrice
    this.total.textContent = this._total + ' ' + item._currency
    this.totalWIthoutSale = this._markdown.querySelector('.receipt__total_sale') 
    this._totalWIthoutSale -=  item._priveWithOutSale*item._currentQuantity
    this.totalWIthoutSale.textContent = this._totalWIthoutSale + ' ' + item._currency
    this.count = this._markdown.querySelector('.receipt__count')
    this._count -= item._currentQuantity
    this.count.textContent = this._count
    this.sale = this._markdown.querySelector('.receipt__sale')
    this._sale -= (item._priveWithOutSale-item._currentPrice)*item._currentQuantity
    this.sale.textContent = '-' + ' ' + this._sale + ' ' + item._currency
  }

  initReceipt(item) {
    this.total = this._markdown.querySelector('.receipt__price')
    this._total += item._currentPrice * item._currentQuantity
    this.total.textContent = this._total + ' ' + item._currency;
    this.totalWIthoutSale = this._markdown.querySelector('.receipt__total_sale') 
    this._totalWIthoutSale +=  item._priveWithOutSale*item._currentQuantity
    this.totalWIthoutSale.textContent = this._totalWIthoutSale + ' ' + item._currency
    this.count = this._markdown.querySelector('.receipt__count')
    this._count += item._currentQuantity
    this.count.textContent = this._count
    this.sale = this._markdown.querySelector('.receipt__sale')
    this._sale += (item._priveWithOutSale-item._currentPrice)*item._currentQuantity
    this.sale.textContent = '-' + ' ' + this._sale + ' ' + item._currency
  }

  generateReceipt() {
    this.total = this._markdown.querySelector('.receipt__price')
    this.total.textContent = this._total;
  }

}