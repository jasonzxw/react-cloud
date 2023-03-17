const tostr = Object.prototype.toString ;

export function getType(arg){
    return tostr.call(arg).slice(8,-1)
}

export function isNumber(arg){
    return getType(arg) === 'Number'
}

export function isString(arg){
    return getType(arg) === 'String'
}

export function isBoolean(arg){
    return getType(arg) === 'Boolean'
}

export function isFunction(arg){
    return getType(arg) === 'Function'
}

export function isArray(arg){
    return getType(arg) === 'Array'
}