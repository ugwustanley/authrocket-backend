import Joi from 'joi'


export  const validationSchema = Joi.object({

    email: Joi.string()
        .max(150)
        .required()
        .email({
            minDomainSegments: 2
        }),

    password: Joi.string()
        .min(6)
        .max(255)
        .required()
});

export  const registerSchema = Joi.object({

    auth:{
        apiKey: Joi.string().required(),
        appName: Joi.string().required()
    },
    user:{
        email: Joi.string()
        .max(150)
        .required()
        .email({
            minDomainSegments: 2
        }),

    password: Joi.string()
        .min(6)
        .max(255)
        .required() 
    },
    payload: Joi.any()
   
});

export  const loginSchema = Joi.object({

    auth:{
        apiKey: Joi.string().required(),
        appName: Joi.string().required()
    },
    user:{
        email: Joi.string()
        .max(150)
        .required()
        .email({
            minDomainSegments: 2
        }),

    password: Joi.string()
        .min(6)
        .max(255)
        .required() 
    }
   
});