import React from 'react';
import { userReducer } from './user-reducer';

test('user reducer should change name of user', ()=>{
    const startState = {
        name:'Alina'
    };
    const newName = 'Ella';
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName })
    expect(endState.name).toBe(newName);
});