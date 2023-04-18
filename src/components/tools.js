const Color = require("color");

export function createOptionsFromCars(cars,sim){
    let filtered = cars.filter(car=>car.simulator===sim)
    let result=[];
    filtered.forEach(car=>{
        result.push({value:car.id,label:car.name})
    })
    return result
}

export function makeListIdsFromOptions(options){
    let result=[];
    options.forEach(option=>{
        result.push(option.value)
    })
    return result
}

export function getColorBrightness( /* String */ scolor) {
    let color = Color(scolor);
    let result= Math.sqrt(color.red() * color.red() * 0.241 + color.green() * color.green() * 0.691 + color.blue() * color.blue() * 0.068);
    if(result<135){
        return "#FFF"
    }else{
        return "#495057"
    }
}