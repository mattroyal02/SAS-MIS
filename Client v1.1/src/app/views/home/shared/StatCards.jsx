import { Link } from "react-router-dom";
import {
  Box,
  Card,
  Grid,
  Icon,
  IconButton,
  styled,
  Tooltip,
} from "@mui/material";
import { Small } from "app/components/Typography";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "24px !important",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: { padding: "16px !important" },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  "& small": { color: theme.palette.text.secondary },
  "& .icon": {
    opacity: 0.6,
    fontSize: "44px",
    color: theme.palette.primary.main,
  },
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  marginTop: "4px",
  fontSize: "14px",
  fontWeight: "500",
  color: theme.palette.primary.main,
}));

const StatCards = ({
  numberOfClients,
  totalQNumber,
  pendingQNumber,
  totalNumberOfProducts,
}) => {
  const cardList = [
    {
      name: "Total Number of Customer(s)",
      amount: numberOfClients,
      unit: "user(s)",
      icon: "group",
      customerTooltip: true,
    },
    {
      name: "Number of Products",
      amount: totalNumberOfProducts,
      unit: "item(s)",
      icon: "store",
      productTooltip: true,
    },
    {
      name: "Total Quotations",
      amount: totalQNumber,
      unit: "Quotation(s)",
      icon: "add_shopping_cart",
      quotationTooltip: true,
    },
    {
      name: "Pending Quotation(s)",
      amount: pendingQNumber,
      unit: "Quotation(s)",
      icon: "shopping_cart",
      quotationTooltip: true,
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: "24px" }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>
                  {item.amount} &nbsp;
                  {item.unit}
                </Heading>
              </Box>
            </ContentBox>
            {item.quotationTooltip ? (
              <Tooltip title="View Details" placement="top">
                <Link to={`/orders/`} className="buyNow">
                  <IconButton>
                    <Icon>arrow_right_alt</Icon>
                  </IconButton>
                </Link>
              </Tooltip>
            ) : (
              <Tooltip title="View Details" placement="top">
                <IconButton></IconButton>
              </Tooltip>
            )}
            {item.productTooltip ? (
              <Tooltip title="View Details" placement="top">
                <Link to={`/products/`} className="buyNow">
                  <IconButton>
                    <Icon>arrow_right_alt</Icon>
                  </IconButton>
                </Link>
              </Tooltip>
            ) : (
              <Tooltip title="View Details" placement="top">
                <IconButton></IconButton>
              </Tooltip>
            )}
            {item.customerTooltip ? (
              <Tooltip title="View Details" placement="top">
                <Link to={`/customers`} className="buyNow">
                  <IconButton>
                    <Icon>arrow_right_alt</Icon>
                  </IconButton>
                </Link>
              </Tooltip>
            ) : (
              <Tooltip title="View Details" placement="top">
                <IconButton></IconButton>
              </Tooltip>
            )}
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
