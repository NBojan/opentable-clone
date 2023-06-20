import { Price } from "@prisma/client";

export const prices = [
    {
        text: "$",
        price: Price.CHEAP
    },
    {
        text: "$$",
        price: Price.REGULAR
    },
    {
        text: "$$$",
        price: Price.EXPENSIVE
    },
]

export const priceToDollar = (price:Price) => {
    if(price === Price.CHEAP){
        return <>
            <span>$</span>
            <span>$</span>
            <span className="col-999">$</span>
            <span className="col-999">$</span>
        </>
    }
    if(price === Price.REGULAR){
        return <>
            <span>$</span>
            <span>$</span>
            <span>$</span>
            <span className="col-999">$</span>
        </>
    }
    if(price === Price.EXPENSIVE){
        return <>
            <span>$</span>
            <span>$</span>
            <span>$</span>
            <span>$</span>
        </>
    }
};