import ajax from './ajax'
import {getObj} from "../tools/store";


export const getMenuList = () => ajax("/menu/api/list");

export const getUser = () => getObj('user');