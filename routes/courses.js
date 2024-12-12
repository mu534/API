const express = require('express')
const router = express.Router()

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

// Get all courses
router.get('/', (req, res) => {
    res.send(courses);
});



// Get a single course by ID
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)  return res.status(404).send('The course with the given id was not found!');
    
    res.send(course);
});

// Add a new course
router.post('/', (req, res) => {
    const { error } = ValidateCourse(req.body);

    if (error)  return res.status(400).send(error.details[0].message);
    

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


// Update an existing course
router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)  return res.status(404).send('The course with the given id was not found!');
   

    const { error } = ValidateCourse(req.body);
    if (error)  return res.status(400).send(error.details[0].message);
    

    course.name = req.body.name;
    res.send(course);

});


router.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)  return res.status(404).send('The course with the given id was not found!');
   
});

// Validation function
function ValidateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}


module.exports =router