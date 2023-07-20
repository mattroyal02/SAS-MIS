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
    fontSize: "42px",
    color: "white",
    padding: 1,
  },
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  fontSize: "15px",
  fontWeight: "500",
  color: "white",
}));

const DisplayCard = ({ name }) => {
  const cardList = [
    {
      name: name,
      icon: "aspect_ratio",
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
        <Grid item xs={12} md={12} key={index}>
          <StyledCard
            elevation={6}
            sx={{
              background: "linear-gradient(to right bottom, #00A880, #93DA00 )",
            }}
          >
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Small
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 1,
                  pl: 2,
                }}
                variant="h6"
                color="white"
              >
                {item.name}
              </Small>
            </ContentBox>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default DisplayCard;
