// import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";

const UsersTable = ({ users }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nom", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
  ];

  const rows = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));

  return (
    <div
      style={{
        height: 300,
        width: "80vw",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UsersTable;
