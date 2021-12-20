// Material UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//Components
import DisplayUser from "../auth/DisplayUser";

const TableWrapper = ({ HeaderFields, ContentFields }) => {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ marginTop: "25px" }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {HeaderFields &&
              HeaderFields.map((field) => (
                <TableCell key={field} align="center">
                  {field}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {ContentFields &&
            ContentFields.map((field) => (
              <TableRow key={field}>
                <TableCell align="center">
                  <DisplayUser
                    displayName={field.displayName}
                    avatar={field.photoURL}
                  />
                </TableCell>
                <TableCell align="center">{field.score}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableWrapper;
