export const PRODUCT = {
    name: '',
    description: '',
    category: '',
    price: 0
};

export const stateToModel = (state, model) =>{
    let data = {};
    for (var key in model) {
        if (model.hasOwnProperty(key)) {
            data[key] = state[key];            
        }
    }
    return data;
};

