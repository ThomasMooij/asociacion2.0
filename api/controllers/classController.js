import createError from "../middleware/createError.js";
import Classes from "../models/class.model.js";

export const getClass = async (req, res, next) => {
  try {
    const clase = await Classes.findById(req.params.id);
    res.status(200).send(clase);
  } catch (error) {
    next(error);
  }
};
export const getClasses = async (req, res, next) => {
  const query = req.query;

  const filter = {
    // option I disables case sensitivity
    ...(query.search && { name: { $regex: query.search, $options: "i" } }),
  };

  try {
    const classes = await Classes.find(filter).select(
      "-attendees -description -collectionId"
    )
    res.status(200).send(classes);
  } catch (error) {
    next(error);
  }
};
export const createClass = async (req, res, next) => {
  //check if admin
  console.log("In class controller")
  const newClass = new Classes(req.body);
  try {
    if(req.presidente != true) {
      next(createError(403, 'not allowed'))
    }
    const saveClass = await newClass.save();
    res.status(200).json(saveClass);
  } catch (error) {
    next(error);
  }
};
export const updateClass = async (req, res, next) => {
  if(req.presidente != true) {
    next(createError(403, 'not allowed'))
  }
  try {
    const updatedClass = await Classes.findByIdAndUpdate(      
      {_id: req.params.id }, 
      {$set: req.body},
      {new: true}
      );
      res.status(200).json(updatedClass);
  } catch (err) {
    next(err)
  }
};
export const deleteClass = async (req, res, next) => {
  if(req.presidente != true) {
    next(createError(403, 'not allowed'))
  }
  try{
    const targetClass = await Classes.findByIdAndDelete(req.params.id)

    res.status(200).send(targetClass)
  }catch(err){
    next(err)
  }
};
