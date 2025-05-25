// simple.controller.js
import {API} from "../DB/JSON.DB.js";
const simpleController = (req, res) => {
    res.send(API);
};





export {simpleController}