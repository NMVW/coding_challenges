import { Bike } from "./bike";

export class Line {

    static discounts = {
        'low': (quantity: number) => quantity >= 20 ? .9 : 1,
        'mid': (quantity: number) => quantity >= 10 ? .8 : 1,
        'high': (quantity: number) => quantity >= 5 ? .8 : 1,
    }

    static getTier(bike: Bike) {
        if (bike.price < 1000) return;
        if (bike.price >= 1000 && bike.price < 2000) return 'low';
        if (bike.price >= 2000 && bike.price < 5000) return 'mid';
        if (bike.price >= 5000) return 'high';
    }

    constructor(bike: Bike, quantity: number) {
        this.bike = bike;
        this.quantity = quantity;
        this.discount = Line.discounts[Line.getTier(bike)] || (q => 1);
    }

    public bike: Bike;
    public quantity: number;
    private discount: Function;

    public itemize() {
        return this.quantity * this.bike.price * this.discount(this.quantity);
    }
}