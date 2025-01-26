import { Line } from "./line";

const newline = '\n';

function formatMoney(amount: any, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i: any = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e);
    }
}

export class Order {

    // pre-tax discounts!
    static promoCodes = {
        "bikes4uless": .9,
        "bikemania": .8,
        "outdoorpr0m1se": .7
    }

    private _taxRate: number = .0725;
    private _lines: Line[] = [];
    private _company: string;
    private _orderDiscount: number;

    constructor(company: string, promoCode='') {
        this._company = company;
        this._orderDiscount = Order.promoCodes[promoCode] || 1;
    }

    public get Company(): string {
        return this._company;
    }

    public AddLine(line: Line): void {
        this._lines.push(line);
    }

    public Receipt(): string {
        var totalAmount = 0;
        var result = 'Order Receipt for ' + this._company + newline;

        for (var i = 0; i < this._lines.length; i++) {
            var thisAmount = 0;

            thisAmount += this._lines[i].itemize();
            result += '\t' + this._lines[i].quantity + ' x ' + this._lines[i].bike.brand + ' ' + this._lines[i].bike.model + ' = $' + formatMoney(thisAmount) + newline;
            totalAmount += thisAmount;
        }

        totalAmount *= this._orderDiscount;

        result += 'Sub-Total: $' + formatMoney(totalAmount) + newline;
        var tax = totalAmount * this._taxRate;
        result += 'Tax: $' + formatMoney(tax) + newline;
        result += 'Total: $' + formatMoney(totalAmount + tax);

        return result;
    }

    public HtmlReceipt() {
        var totalAmount = 0;
        var result = '<html><body><h1>Order Receipt for ' + this._company + '</h1>';

        result += '<ul>';
        for (var i = 0; i < this._lines.length; i++) {
            var thisAmount = 0;

            thisAmount += this._lines[i].itemize();
            result += '<li>' + this._lines[i].quantity + ' x ' + this._lines[i].bike.brand + ' ' + this._lines[i].bike.model + ' = $' + formatMoney(thisAmount) + '</li>';
            totalAmount += thisAmount;
        }

        totalAmount *= this._orderDiscount;

        result += '</ul>';

        result += '<h3>Sub-Total: $' + formatMoney(totalAmount) + '</h3>';
        var tax = totalAmount * this._taxRate;
        result += '<h3>Tax: $' + formatMoney(tax) + '</h3>';
        result += '<h2>Total: $' + formatMoney(totalAmount + tax) + '</h2>';
        result += '</body></html>';
        return result;
    }
}