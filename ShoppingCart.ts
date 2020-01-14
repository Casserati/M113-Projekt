export class ShoppingCart {
    total = 0.00;
    products = [];

    constructor(){
        this.products = new Array();
    }

    getTotal(){
        return this.total;
    }

    addToTotal(price: number){
        this.total += price;
    }

    addToCart(product: any){
        this.addToTotal(product.specialOffer);
        product.amount = 1;

        if (this.products.find(p => p.id === product.id) != undefined){
            this.incrementProductAmount(product);
        }else{
            this.products.push(product);
        }
        
    }

    getCart(){
        return this;
    }

    removeFromCart(product: any){
        this.products.splice(product);
    }

    incrementProductAmount(product: any){
        const productToIncrement = this.products.find(p => product.id == product.id);
        productToIncrement.amount++;
    }

    decrementProductAmount(product: any){
        const productToIncrement = this.products.find(p => product.id == product.id);
        this.total -= product.specialOffer;
        
        if (productToIncrement.amount-- == 0){
            this.removeFromCart(product);
        }
    }
}