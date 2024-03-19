let res3 = data.map(i => {
    const {id,rating, ...rest} = i
    return rest
})

result= res3 .map(i => {
    let stocks = Math.ceil(Math.random() * 100)
   i.stock_count = stocks
   if(i.category.includes("electronics")){
    i.brand = "electronic item"
   }else if(i.category.includes("clothing")){
    i.brand = "clothing item"
   }else{
    i.brand = "jewelery item"
   }
   return i
})