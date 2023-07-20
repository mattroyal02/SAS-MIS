import { makeStyles } from "@material-ui/core";
import {
  Box,
  Button,
  Card,
  Icon,
  IconButton,
  Stack,
  styled,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Title = styled("span")(() => ({
  fontSize: "1.25rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize",
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  notchedOutline: {
    borderColor: "white !important",
  },
});

const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between",
}));

const ProjectsView = () => {
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedCellParams, setSelectedCellParams] = React.useState(null);
  const [cellModesModel, setCellModesModel] = React.useState({});
  //Focus
  const handleCellFocus = React.useCallback((event) => {
    const row = event.currentTarget.parentElement;
    const id = row.dataset.id;
    const field = event.currentTarget.dataset.field;
    setSelectedCellParams({ id, field });
  }, []);
  console.log("selectedCellParams :>> ", selectedCellParams);
  const cellMode = React.useMemo(() => {
    if (!selectedCellParams) {
      return "view";
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || "view";
  }, [cellModesModel, selectedCellParams]);

  //Edit BAR
  const handleCellKeyDown = React.useCallback(
    (params, event) => {
      if (cellMode === "edit") {
        // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
        event.defaultMuiPrevented = true;
      }
    },
    [cellMode]
  );

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [filterObject, setFilterObject] = useState({
    hosts: {},
    reactivities: {},
    mainCategories: {},
    applications: {},
    suppliers: {},
  });
  console.log("Filterobj", filterObject);

  console.log("loading :>> ", loading);

  const getData = async () => {
    const { data } = await axios.get("http://localhost:4050/projects", {
      params: { search },
    });
    console.log("Hello", data);
    setData(data.data);
  };
  useEffect(() => {
    getData();
  }, []);

  console.log("Products", data);

  const columns = [
    { field: "name", headerName: "Project Name", width: 250, editable: true },
    {
      field: "poNumber",
      headerName: "PO Number",
      width: 200,
      editable: true,
    },
    {
      field: "supplierProjectNumber",
      headerName: "Supplier Project Number",
      width: 250,
      editable: true,
    },
    {
      field: "poNumber",
      headerName: "Voting Number",
      // type: "text",
      editable: true,
      width: 200,
    },

    {
      field: "role",
      headerName: "Status",
      description: "This column shows the security level of each user.",
      sortable: true,
      width: 130,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            {params.row.id === 2 ? (
              <>
                {/* <Small bgcolor={bgSecondary}>Pending</Small> */}
                <Button variant="contained" color="warning" size="small">
                  Pending
                </Button>
              </>
            ) : params.row.id === 1 ? (
              <>
                {/* <Small bgcolor={bgPrimary}>Approved</Small> */}
                <Button variant="contained" color="success" size="small">
                  Approved
                </Button>
              </>
            ) : (
              <>
                {/* <Small bgcolor={bgError}>Rejected</Small> */}
                <Button variant="contained" color="error" size="small">
                  Pending
                </Button>
              </>
            )}
          </Stack>
        );
      },
    },
    {
      field: "action",
      headerName: "View/Edit",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 80,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <Link to={`/project/${params.row.id}/edit/`} className="buyNow">
              <IconButton>
                <Icon color="primary">edit</Icon>
              </IconButton>
            </Link>
          </Stack>
        );
      },
    },
  ];

  const rows = data.map((row) => {
    return {
      id: row.id,
      name: row.name,
      poNumber: row.poNumber,
      supplierProjectNumber: row.supplierProjectNumber,
      votingNumber: `${row.votingNumber}`,
    };
  });

  return (
    <>
      <Card elevation={3} sx={{ pt: "20px", m: 3 }}>
        <CardHeader>
          <Title>Projects</Title>
        </CardHeader>
        <div style={{ height: 700, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[10, 20, 50]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            checkboxSelection
            pagination
            onCellKeyDown={handleCellKeyDown}
            cellModesModel={cellModesModel}
            onCellModesModelChange={(model) => setCellModesModel(model)}
            components={{
              // Toolbar: EditToolbar,
              Toolbar: GridToolbar,
            }}
            componentsProps={{
              toolbar: {
                cellMode,
                selectedCellParams,
                setSelectedCellParams,
                cellModesModel,
                setCellModesModel,
              },
              cell: {
                onFocus: handleCellFocus,
              },
            }}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </div>
      </Card>
    </>
  );
};

export default ProjectsView;
