import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Avatar,
  Box,
  Card,
  Icon,
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

const CustomerTable = () => {
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
    const { data } = await axios.get("http://localhost:4050/users");
    console.log("Hello", data);
    setData(data.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <CardHeader>
        <Title>Customers</Title>
        <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 0 }} colSpan={14}>
                Username
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={13}>
                Customer Email
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={12}>
                Title
              </TableCell>
              <TableCell sx={{ px: 3 }} colSpan={11}>
                First Name(s)
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={10}>
                Surname
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={9}>
                Job title/role
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={8}>
                Institution
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={7}>
                Department
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={6}>
                Primary Number
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={5}>
                Office Number
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={4}>
                Region
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={3}>
                City
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Address
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell
                  colSpan={14}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 1 }}>
                      {product.username}
                    </Paragraph>
                  </Box>
                </TableCell>
                <TableCell
                  colSpan={13}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 1 }}>
                      {product.username}
                    </Paragraph>
                  </Box>
                </TableCell>
                <TableCell
                  colSpan={12}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 1 }}>Mr</Paragraph>
                  </Box>
                </TableCell>
                <TableCell
                  colSpan={11}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 1 }}>
                      {product.firstName}
                    </Paragraph>
                  </Box>
                </TableCell>
                <TableCell
                  colSpan={10}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 1 }}>
                      {product.lastName}
                    </Paragraph>
                  </Box>
                </TableCell>
                <TableCell
                  align="left"
                  colSpan={9}
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  Student
                </TableCell>
                <TableCell
                  colSpan={8}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 1 }}>UP, UJ, UCT</Paragraph>
                  </Box>
                </TableCell>
                <TableCell
                  colSpan={7}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 1 }}>Medicine</Paragraph>
                  </Box>
                </TableCell>
                <TableCell
                  colSpan={6}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 1 }}>
                      {product.phoneNumber}
                    </Paragraph>
                  </Box>
                </TableCell>
                <TableCell
                  colSpan={5}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 1 }}>
                      {product.phoneNumber}
                    </Paragraph>
                  </Box>
                </TableCell>
                <TableCell
                  colSpan={4}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 1 }}>Gauteng</Paragraph>
                  </Box>
                </TableCell>
                <TableCell
                  colSpan={3}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 1 }}>Pretoria</Paragraph>
                  </Box>
                </TableCell>
                <TableCell
                  colSpan={2}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 1 }}>
                      Unit 15, Sultane Park, Midrand
                    </Paragraph>
                  </Box>
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={1}>
                  <Link to={`/orders/${product.id}`} className="buyNow">
                    <IconButton>
                      <Icon color="primary">edit</Icon>
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

// // const productList = [
// //   {
// //     imgUrl: "/assets/images/products/headphone-2.jpg",
// //     name: "earphone",
// //     price: 100,
// //     available: 15,
// //   },
// //   {
// //     imgUrl: "/assets/images/products/headphone-3.jpg",
// //     name: "earphone",
// //     price: 1500,
// //     available: 30,
// //   },
// //   {
// //     imgUrl: "/assets/images/products/iphone-2.jpg",
// //     name: "iPhone x",
// //     price: 1900,
// //     available: 35,
// //   },
// //   {
// //     imgUrl: "/assets/images/products/iphone-1.jpg",
// //     name: "iPhone x",
// //     price: 100,
// //     available: 0,
// //   },
// //   {
// //     imgUrl: "/assets/images/products/headphone-3.jpg",
// //     name: "Head phone",
// //     price: 1190,
// //     available: 5,
// //   },
// // ];

export default CustomerTable;
