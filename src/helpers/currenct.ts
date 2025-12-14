export const formatPrice = (price : number )=>{
    return new Intl.NumberFormat('es-us',{
        style : "currency",
        currency : "USD",
    }).format(price)
}