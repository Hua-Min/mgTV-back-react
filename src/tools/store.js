import  store from 'store'

export const saveObj = (key,value)=>{
    store.set(key,value)
};

export const getObj = (key)=>{
    return store.get(key) || {};
};

export const removeObj = (key,value)=>{
    store.remove(key,value);
};

export const clearObj = ()=>{
    store.clear()
};