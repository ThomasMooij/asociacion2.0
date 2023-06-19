import createError from "../middleware/createError.js";
import Attendee from "../models/attendees.model.js";
import validator from "validator";
import Class from "../models/class.model.js";

export const getAttendees = async (req, res, next) => {
  const query = req.query;

  const filter = {
    // option I disables case sensitivity
    ...(query.search && { className: { $regex: query.search, $options: "i" } }),
  };

  try {
    const attendees = await Attendee.find(filter)
    res.status(200).send(attendees);

  } catch (error) {
    next(error);
  }

};

export const getAttendee = async (req, res, next) => {

  try{
    const clase = await Attendee.findById(req.params.id);
    res.status(200).send(clase);

  }catch(err){
    next(err)
  }
};

export const createAttendee = async (req, res, next) => {
  const { name, email, phone, days } = req.body;
  const errors = [];

  const validationSchema = [
    {
      valid: days.length >= 1,
      errorMessage: "Por lo menos tiene que elegir un dia",
    },
    {
      valid: validator.isLength(name, {
        min: 4,
        max: 50,
      }),
      errorMessage: "Dejanos saber como se llama",
    },
    {
      valid: validator.isEmail(email),
      errorMessage: "Por favor introduzca un correo electronico valido",
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: "Por favor introduzca un numero de telefono valido",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });
  if (errors.length) {
    return res.status(400).json({errorMessage: errors[0]});
  }
  // check if email address was already used
  const attendee = await Attendee.find({
    email: req.body.email,
    class: req.body.class
  });
  if (attendee.length)
    return res.status(400).json({ errorMessage: "correo ya en uso" });

  try {
    const newAttendee = new Attendee(req.body);
    const savedAttendee = await newAttendee.save();
    const currentClass = await Class.findByIdAndUpdate(req.body.class, {
      $push: { attendees: savedAttendee._id },
    }); 

    const days = req.body.days
    
    days.forEach((day) => {
        currentClass.days = currentClass.days.map((item)=>{
            if(item.day === day){
                return {...item , availibility: item.availibility - 1}
            }
            return item
        })
    })

    currentClass.save()
    res.status(200).send(savedAttendee);

  } catch (error) {
    return next(createError(400, error));
  }
};
