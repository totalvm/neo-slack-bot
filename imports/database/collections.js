module.exports = (mongoose) => {
  
  const ignoreSchema = mongoose.Schema({
    id: String,
    user: String,
    skills: String,
    interval: String,
    dateUpdated: String
  });
  
  const ignore = mongoose.model('ignore', ignoreSchema, 'ignore');
  
  const questionsSchema = mongoose.Schema({
    isQuestion: Boolean,
    text: String
  });
  
  const questions = mongoose.model('questions', questionsSchema, 'questions');
  
  const devskillsSchema = mongoose.Schema({
    isQuestion: Boolean,
    text: String
  });
  
  const devskills = mongoose.model('devskills', devskillsSchema, 'devskills');
  
  return {
    ignore: ignore,
    questions: questions,
    devskills: devskills
  }
};
