import React, { useState } from 'react';
const flatObject = (data) => {
    let state = {};
    function flatting(object) {
        Object.values(object).map((value, index) => {
            if (Object.getPrototypeOf(value).constructor === Object) {
                state[JSON.stringify(value)] = false;
                return flatting(value);
            }
            return state;
        })
    };
    flatting(data);
    return state;
}
const useJSON = (initial) => {
    let [state, setState] = useState({});

    //init all inner object by {[key - stringify inside object value]: true||false - expand or colapse}
    if (Object.keys(state).length === 0) {
        let strInit = JSON.stringify(initial);
        state = { [strInit]: false };
        state = { ...state, ...flatObject(initial) };
    }

    const setStateObject = (newState) => {
        setState({ ...state, ...newState });
    }
    const setAll = (status) => {
        const newObj = Object.keys(state).reduce((acc, value, index) => {
            return { ...acc, ...{ [value]: status } };
        }, {});
        setState(newObj);
    }
    return [state, setStateObject, setAll]
}
export { useJSON }