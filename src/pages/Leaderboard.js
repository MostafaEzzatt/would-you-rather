import { useState, useEffect } from "react";

// Redux
import { calcUsersScore } from "../redux/usersSlices/usersSlice";
import { connect } from "react-redux";

// Components
import Nav from "../components/layout/Nav";
import LeaderboardList from "../components/leaderboard/LeaderboardList";

// Framer Motion
import { motion } from "framer-motion";

// Components
import Loading from "../components/Loading";

const Leaderboard = ({ all, calcUsersScore }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    calcUsersScore(all);
    setIsLoading(false);
  }, []);

  if (isLoading) return <Loading />;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Nav />
      <LeaderboardList />
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    all: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    calcUsersScore: (data) => dispatch(calcUsersScore(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
