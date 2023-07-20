import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Avatar,
  Box,
  Card,
  Icon,
  Button,
  Stack,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Paragraph } from "app/components/Typography";

const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
}));

const ProductTable = styled(Table)(() => ({
  width: 1200,
  minWidth: 400,
  whiteSpace: "pre",
  "& small": {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
  },
  "& td": { borderBottom: "none" },
  "& td:first-of-type": { paddingLeft: "16px !important" },
}));

const Small = styled("small")(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
}));

const OrderTable = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  const [data, setData] = useState([]);

  //   fetch('url',
  //   method: 'GET',
  // {headers: {'Content-Type': "application/json"}
  // })
  const getData = async () => {
    const { data } = await axios.get("http://localhost:4050/quotations");
    console.log("Hello", data);
    setData(data.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "quotationRef", headerName: "Quotation Reference", width: 220 },
    {
      field: "dateTime",
      headerName: "Date/Time",
      width: 220,
      valueFormatter: (params) => new Date(params?.value).toLocaleString(),
    },
    {
      field: "orderedBy",
      headerName: "Ordered by",
      type: "text",
      width: 200,
    },
    {
      field: "customerEmail",
      headerName: "Customer's Email",
      sortable: true,
      width: 220,
      // valueGetter: (params) =>
      //   `${params.row.quotationRef || ""} ${params.row.dateTime || ""}`,
    },
    {
      field: "supplier",
      headerName: "Supplier(s)",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.quotationRef || ""} ${params.row.dateTime || ""}`,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 120,
      // valueGetter: (params) =>
      //   `${params.row.quotationRef || ""} ${params.row.dateTime || ""}`,
    },
    {
      field: "orderStatus",
      headerName: "Quotation Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow, null, 4));
        };
        const onClickAlert = (e) => {
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow, null, 4));
        };
        return (
          <Stack direction="row" spacing={2}>
            {params.row.orderStatus === "PENDING" ? (
              <>
                {/* <Small bgcolor={bgSecondary}>Pending</Small> */}
                <Button variant="contained" color="warning" size="small">
                  Pending
                </Button>
              </>
            ) : params.row.orderStatus === "APPROVED" ? (
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
                  Rejected
                </Button>
              </>
            )}
          </Stack>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow, null, 4));
        };
        const onClickAlert = (e) => {
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow, null, 4));
        };

        return (
          <Stack direction="row" spacing={2}>
            <Link to={`/quotations/${params.row.id}`} className="buyNow">
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
      quotationRef: row.orderReference,
      dateTime: row.tStamp,
      orderedBy: `${row.customerFirstname} ${row.customerSurname}`,
      supplier: row.orderSuppliers,
      orderStatus: row.orderStatus,
      action: row.orderSuppliers,
      customerEmail: row.customerEmail,
      totalAmount: row.orderTotalExclVAT,
    };
  });

  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <CardHeader>
        <Title>Latest Quotation</Title>
      </CardHeader>

      {/*New DATA GRID*/}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Card>
  );
};

export default OrderTable;
