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
  "& small": { color: "white", fontSize: 15 },
  "& .icon": {
    opacity: 0.75,
    fontSize: "54px",
    color: "white",
  },
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  marginTop: "4px",
  fontSize: "24px",
  fontWeight: "500",
  color: "white",
}));

const StatCards = ({
  numberOfClients,
  totalNumberOfProducts,
  remainingTime,
  currentDate,
}) => {
  const cardList = [
    {
      name: "Total number of participants(s)",
      amount: numberOfClients,
      unit: "participant(s)",
      icon: "group",
      customerTooltip: false,
    },
    {
      name: "My position in the game",
      amount: totalNumberOfProducts,
      unit: `out of ${numberOfClients} participant(s)`,
      icon: "store",
      productTooltip: false,
    },
    {
      name: "Remaining time",
      amount: remainingTime,
      unit: "",
      icon: "timer",
      quotationTooltip: false,
    },
    {
      name: "Current Date",
      amount: currentDate,
      unit: "",
      icon: "calendar_month",
      quotationTooltip: false,
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: "24px" }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard
            elevation={6}
            sx={{
              background: "linear-gradient(to right bottom, #110E2A, #2E389F)",
            }}
          >
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
