const ls = window.localStorage ;

export function setItem(key,data){
    ls.setItem(key,JSON.stringify(data))
}

export function getItem(key) {
    const data = ls.getItem(key) ;
    return data ? JSON.parse(data) : data ;
}

export function removeItem(key) {
    ls.removeItem(key)
}

export function clear() {
    ls.clear()
}

export const globalKey = {
    todoList: 'todoList'
}