import { Box, Card, Grid, Icon, styled } from "@mui/material";
import { Small } from "app/components/Typography";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "4px !important",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: { padding: "16px !important" },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  "& small": { color: "white", fontSize: 15 },
  "& .icon": {
    opacity: 0.95,
    fontSize: "28px",
    color: "white",
    transform: "rotate(180deg)",
  },
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  fontSize: "15px",
  fontWeight: "500",
  color: "white",
}));

const StatCardTotal = ({ metersMeasuredBin1 }) => {
  const cardList = [
    {
      name: "Total number of participants(s)",
      amount: metersMeasuredBin1,
      unit: "Tons",
      icon: "scale",
    },
  ];

  return (
    <Grid
      container
      alignItems="right"
      justifyContent="flex-end"
      spacing={3}
      sx={{ mb: "12px" }}
    >
      {cardList.map((item, index) => (
        <Grid item xs={12} md={7} key={index}>
          <StyledCard
            elevation={6}
            sx={{
              background: "linear-gradient(to right bottom, #00A880, #40c9ff )",
            }}
          >
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>Section Total</Small>
                {!isNaN(item.amount) ? (
                  <Heading>
                    {item.amount} &nbsp;
                    {item.unit}
                  </Heading>
                ) : (
                  <Heading>Waiting to collect all the values...</Heading>
                )}
              </Box>
            </ContentBox>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCardTotal;
