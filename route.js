import express from "express";
import { onGetReq, onDelReq, onPostReq, onPutReq } from "./controller.js"

const router = express.Router();

router.route('/')
    .get(onGetReq)
    .post(onPostReq);

router.route('/id/:id')
    .delete(onDelReq)
    .put(onPutReq);

export default router;