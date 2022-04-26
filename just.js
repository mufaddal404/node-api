const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
]


app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/filters', (req, res) => {
    if(Object.keys(req.query).length === 0){
        return res.status(400).send({body: 'no filters provided'});
    }
    const querySchema = Joi.object({
        id: Joi.number().integer().min(0),
        name: Joi.string()

    })
    const {error, value} = querySchema.validate(req.query);
    if(error){
        return res.status(400).send(error);
    }
    console.log(value);
    return res.send(value);
})

app.get('/api/courses/:id', (req, res) => {

    const numSchema = Joi.object({
        id: Joi.number().integer()
    })

    const {error, val} = numSchema.validate(req.params)

    if(error){
        return res.status(400).send({body: 'invalid id'})
    }

    const course = courses.find(c => c.id == req.params.id);

    if(!course){
        return res.status(404).send({body: 'course not found'})
    }

    res.send(course);
});

app.post('/api/courses', (req, res) => {
   
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const {error} = schema.validate(req.body);

    if(error) return res.status(400).send(error)

    const course = {
        id: courses.length+1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});