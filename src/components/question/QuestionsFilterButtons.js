import { useState } from "react";
// Material UI
import {
  Button,
  Container,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Check } from "@mui/icons-material";

// Redux
import { connect } from "react-redux";
import {
  filterUnAnswered,
  filterAnswered,
  filterAll,
} from "../../redux/questionsSlices/questionSlice";

const QuestionsFilterButtons = ({
  answers,
  filterUnAnswered,
  filterAnswered,
  filterAll,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterBy, setFilterBy] = useState("Filter By");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getAnsweredQuestionsIds = () => {
    const unAnsweredQuestionsList = [];
    Object.keys(answers.answers).map((idx) =>
      unAnsweredQuestionsList.push(idx.split("_")[1])
    );
    return unAnsweredQuestionsList;
  };

  const handleUnAnswered = () => {
    filterUnAnswered(getAnsweredQuestionsIds());
    handleClose();
    setFilterBy("unanswered");
  };

  const handleAnswered = () => {
    filterAnswered(getAnsweredQuestionsIds());
    handleClose();
    setFilterBy("answered");
  };

  const handleAll = () => {
    filterAll();
    handleClose();
    setFilterBy("all");
  };
  return (
    <Container
      sx={{
        marginTop: "25px",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button
        id="basic-button"
        sx={{ color: "#2B2B2B", textTransform: "capitalize" }}
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {filterBy}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleAll()}>
          {filterBy == "all" && (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          )}
          <ListItemText inset={filterBy !== "all"}>All</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAnswered()}>
          {filterBy == "answered" && (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          )}
          <ListItemText inset={filterBy !== "answered"}>Answered</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleUnAnswered()}>
          {filterBy == "unanswered" && (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          )}
          <ListItemText inset={filterBy !== "unanswered"}>
            Unanswered
          </ListItemText>
        </MenuItem>
      </Menu>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    answers: state.answersReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterUnAnswered: (answers) => dispatch(filterUnAnswered(answers)),
    filterAnswered: (answers) => dispatch(filterAnswered(answers)),
    filterAll: () => dispatch(filterAll()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsFilterButtons);
