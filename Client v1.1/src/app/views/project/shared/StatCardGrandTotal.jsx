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
  "& small": { color: "white", fontSize: 20 },
  "& .icon": {
    opacity: 0.95,
    fontSize: "32px",
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

const StatCardGrandTotal = ({ metersMeasuredBin1 }) => {
  const cardList = [
    {
      name: "Total number of participants(s)",
      amount: metersMeasuredBin1,
      unit: "Tons",
      icon: "ac_unit",
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: "12px" }}>
      {cardList.map((item, index) => (
        <Grid container spacing={3} sx={{ p: 2 }}>
          <Grid item xs={12} md={5} key={index}>
            <StyledCard
              elevation={6}
              sx={{
                background:
                  "linear-gradient(to right bottom, #00A880, #00A880 )",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ContentBox>
                <Small
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "left",
                    p: 2,
                  }}
                  variant="h5"
                  color="white"
                >
                  Total
                </Small>
              </ContentBox>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4} key={index}>
            <StyledCard
              elevation={6}
              sx={{
                background:
                  "linear-gradient(to right bottom, #00A880, #00A880 )",
              }}
            >
              <ContentBox>
                <Icon className="icon">{item.icon}</Icon>
                <Small
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 2,
                    pl: 2,
                  }}
                  variant="h5"
                  color="white"
                >
                  Clean Maize
                </Small>
              </ContentBox>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={3} key={index}>
            <StyledCard
              elevation={6}
              sx={{
                background:
                  "linear-gradient(to right bottom, #00A880, #00A880 )",
              }}
            >
              <ContentBox>
                {!isNaN(item.amount) ? (
                  <Small
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      p: 2,
                    }}
                    variant="h6"
                    color="white"
                  >
                    {item.amount} &nbsp;
                    {item.unit}
                  </Small>
                ) : (
                  <Small sx={{ p: 2 }}>
                    Waiting to collect all the values...
                  </Small>
                )}
              </ContentBox>
            </StyledCard>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCardGrandTotal;
