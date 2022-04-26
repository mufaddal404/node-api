import Joi from "joi";

const checkId = Joi.object({
    id: Joi.number().integer().min(0)
})

const filterQuerySchema = Joi.object({
    id: Joi.number().integer().min(0),
    product_name: Joi.string(),
    cost: Joi.number(),
    vendor: Joi.string(),
    vendor_email: Joi.string().email(),

});

const postReqSchema = Joi.object({
    product_name: Joi.string().required(),
    cost: Joi.number().required(),
    vendor: Joi.string().required(),
    vendor_email: Joi.string().email().required(),

});

const putReqSchema = Joi.object({
    product_name: Joi.string(),
    cost: Joi.number(),
    vendor: Joi.string(),
    vendor_email: Joi.string().email(),

});

export {checkId, filterQuerySchema, postReqSchema, putReqSchema};