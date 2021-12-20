import { useState, useEffect } from "react";

// Redux
import { Container } from "@mui/material";
import { connect } from "react-redux";

// Components
import TableWrapper from "../tabel/TableWrapper";

function sortByScore(a, b) {
  return a.last_nom > b.last_nom ? 1 : b.last_nom > a.last_nom ? -1 : 0;
}

const LeaderboardList = ({ users }) => {
  const [sortedUsers, setSortedUsers] = useState([]);

  useEffect(() => {
    setSortedUsers(users.users.sort(sortByScore));
  }, []);

  return (
    <Container>
      <TableWrapper
        HeaderFields={["User", "Score"]}
        ContentFields={sortedUsers}
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.usersReducer,
  };
};

export default connect(mapStateToProps, null)(LeaderboardList);
