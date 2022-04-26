import connection from "./config.js";
import {checkId, filterQuerySchema, postReqSchema, putReqSchema} from "./schema.js"
import makeQuery from "./makeQuery.js"
import Joi from "joi";

const onGetReq = (req, res) => {
    if(Object.keys(req.query).length === 0){
        connection.query('SELECT * FROM products', (error, results, fields) => {
            if(error){
                return res.status(500).send(error);
            }
            else{
                return res.send(results);
            }
        });
    }
    else{
        const {error, value} = filterQuerySchema.validate(req.query);
        if(error){
            return res.status(400).send({message: error.details[0].message});
        }
        else {
            const quer = 'SELECT * FROM products WHERE ' + makeQuery(value, ' AND ');
            connection.query(quer, (error, results, fields) => {
                if(error){
                    return res.status(500).send(error);
                }
                else{
                    return res.send(results);
                }
            });
        }
    }
}


const onDelReq = (req, res) => {

    const {error, value} = checkId.validate(req.params);

    if(error){
        return res.status(400).send({message: error.details[0].message});
    }
    else {
        connection.query('DELETE FROM products WHERE id = ?', [req.params.id], 
            (error, results, fields) => {
                if(error){
                    return res.status(500).send(error);
                }
                else {
                    if(results.affectedRows){
                        return res.send({message: `Record successfully deleted at id ${req.params.id}`});
                    }
                    else {
                        return res.status(404).send({message: 'Record not found'})
                    }
                }
            }
        );
    }
}


const onPostReq = (req, res) => {
    const {error, value} = postReqSchema.validate(req.body);

    if(error){
        return res.status(400).send({message: error.details[0].message});
    }
    else {
        const query = 'INSERT INTO products (product_name, cost, vendor, vendor_email) VALUES (?, ?, ?, ?)';
        const {product_name, cost, vendor, vendor_email} = value;
        connection.query(query, [product_name, cost, vendor, vendor_email], 
            (error, results, fields) => {
                if(error){
                    return res.status(500).send(error);
                }
                else {
                    return res.send({message: `Record successfully added`, result: results});
                }
            }
        );
    }
}


const onPutReq = (req, res) => {

    if(Object.keys(req.body).length === 0) 
    return res.status(400).send({message: 'Request body is empty'});

    const idSchema = checkId.validate(req.params);

    if(idSchema.error){
        return res.status(400).send({message: error.details[0].message});
    }
    else{
        const {error, value} = putReqSchema.validate(req.body);

        if(error){
            return res.status(400).send({message: error.details[0].message});
        }
        else {
            const query = 'UPDATE products SET ' + makeQuery(value, ', ') + ' WHERE id=?';
            connection.query(query, [idSchema.value.id], 
                (error, results, fields) => {
                    if(error){
                        return res.status(500).send(error);
                    }
                    else {
                        if(results.affectedRows){
                            return res.send({message: `Record successfully updated at id ${idSchema.value.id}`});
                        }
                        else {
                            return res.status(404).send({message: 'Record not found'})
                        }
                    }
                }
            );
        }
    }
}

export {onGetReq, onDelReq, onPostReq, onPutReq};