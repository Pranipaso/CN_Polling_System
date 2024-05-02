import Question from "../models/question.js";
import Option from "../models/option.js";

// To create a question
export const createQuestion = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "title is required for creating question",
      });
    }

    const question = await Question.create({
      title,
    });

    res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    console.log("creating question error", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// To create an option
export const createOptions = async (req, res) => {
  try {
    const questionId = req.params.id;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "text required for creating option",
      });
    }

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(400).json({
        message: "question not found!",
      });
    }

    const option = await Option.create({
      text,
      question,
    });

    // create link_to_vote using _id of option
    option.link_to_vote = `https://polling-system-api0.herokuapp.com/options/${option.id}/add_vote`;
    option.save();

    // put reference of option in question schema
    await question.updateOne({ $push: { options: option } });

    return res.status(200).json({
      success: true,
      option,
    });
  } catch (err) {
    console.log("creating option error ", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// To delete a question
export const deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(400).json({
        message: "question not found",
      });
    }

    // if even one of the options of question has votes. It won't be deleted
    if (question.totalVotes > 0) {
      return res.status(400).json({
        message: "atleast one of the option has votes",
      });
    }

    // delete all the options of the question
    await Option.deleteMany({ question: questionId });

    // delete question
    await Question.findByIdAndDelete(questionId);

    return res.status(200).json({
      success: true,
      message: "question and its options are deleted successfully!",
    });
  } catch (err) {
    console.log("delete question error", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// To view a question and it's options
export const viewQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    // populate question with all of its options
    const question = await Question.findById(questionId).populate({
      path: "options",
      model: "Option",
    });

    if (!question) {
      return res.status(400).json({
        message: "question not found",
      });
    }

    return res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    console.log("view question error", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
