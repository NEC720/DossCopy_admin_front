// import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";

const CybersTable = ({ cybers }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nom", width: 150 },
    { field: "latitude", headerName: "Latitude", width: 130 },
    { field: "longitude", headerName: "Longitude", width: 130 },
    { field: "address", headerName: "Adresse", width: 200 },
    { field: "nbr_imprimantes", headerName: "Nombre d'imprimantes", width: 70 },
    { field: "status", headerName: "Statut", width: 130 },
  ];

  const rows = cybers.map((cyber) => ({
    id: cyber.id,
    name: cyber.name,
    latitude: cyber.latitude,
    longitude: cyber.longitude,
    address: cyber.address,
    nbr_imprimantes: cyber.nbr_imprimantes,
    status: cyber.status,
  }));

  return (
    <div style={{ height: 400, width: "90vw", marginLeft: "auto", marginRight: "auto" }}>
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

CybersTable.propTypes = {
  cybers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CybersTable;
