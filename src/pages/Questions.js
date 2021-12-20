// Components
import Nav from "../components/layout/Nav";
import QuestionList from "../components/question/QuestionList";

// Framer Motion
import { motion } from "framer-motion";

// Components
import QuestionsFilterButtons from "../components/question/QuestionsFilterButtons";

// Redux
import { connect } from "react-redux";

const Questions = ({ questions }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Nav />
      <QuestionsFilterButtons />
      <QuestionList questions={questions} />
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    questions: state.questionsReducer,
  };
};

export default connect(mapStateToProps, null)(Questions);
