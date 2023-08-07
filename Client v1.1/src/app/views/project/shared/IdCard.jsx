import { Box, Card, Grid, Icon, styled } from "@mui/material";

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

const IdCard = ({ id }) => {
  const cardList = [
    {
      amount: id,
      icon: "clo ck",
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: "12px" }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={12} key={index}>
          <StyledCard
            elevation={6}
            sx={{
              background: "linear-gradient(to right bottom, #93DA00, #00A880)",
            }}
          >
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default IdCard;

{
	{
	id:1,
	  timestamp:1, 
	  duration:"00:00:23", 
	  reason: "I was tired"
	},
	{
	  id:2,
	  timestamp:1, 
	  duration:"00:00:23", 
	  reason: "Hello"
	},
	{
id:3,
	  timestamp:1, 	
	  duration:"00:00:23", 
	  reason: "Testing"
	},
	totalDownTime: add all downtimeTime
}


