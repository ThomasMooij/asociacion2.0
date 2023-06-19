import createError from "../middleware/createError.js";
import Event from "../models/event.model.js";

export const getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).send(event)
  } catch (error) {
    next(error);
  }
};
export const getEvents = async (req, res, next) => {
  const query = req.query;
  const filter = {
    // option I disables case sensitivity
    ...(query.search && {name: { $regex: query.search, $options: "i" }}),
    ...( query.month && {month: query.month}),
    ...(query.year && {year: query.year})
}
  try {
const events = await Event.find(filter).sort({month: 1});
    res.status(200).send(events);
  } catch (error) {
    next(error);
  }
}

export const createEvent = async (req, res, next) => {
  if(req.presidente != true) {
    next(createError(403, 'not allowed'))
  }
 const newEvent = new Event(req.body)
    try{
        const savedEvent = await newEvent.save()
        res.status(200).json(savedEvent)
    }catch(error){
        next(createError(400, error))
    }
} 

export const updateEvent = async (req,res,next) => {
  if(req.presidente != true) {
    next(createError(403, 'not allowed'))
  }
  try{  
    const updatedEvent = await Event.findByIdAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
      );
    res.status(200).json(updatedEvent)

  }catch(err){
    next(err)
  }
}

export const deleteEvent = async (req,res,next) => {
  if(req.presidente != true) {
    next(createError(403, 'not allowed'))
  }

}