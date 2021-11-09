import {createStore} from 'redux'
import {Root} from './Root'
export const Store = () => {
    return createStore(Root)
}