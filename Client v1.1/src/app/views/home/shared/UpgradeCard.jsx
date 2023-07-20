import { Button, Card, styled } from "@mui/material";
import { convertHexToRGB } from "app/utils/utils";

const CardRoot = styled(Card)(({ theme }) => ({
  marginBottom: "24px",
  padding: "24px !important",
  [theme.breakpoints.down("sm")]: { paddingLeft: "16px !important" },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  position: "relative",
  padding: "24px !important",
  background: "white",
  [theme.breakpoints.down("sm")]: { padding: "16px !important" },
}));

const Paragraph = styled("p")(({ theme }) => ({
  margin: 20,
  paddingTop: "24px",
  paddingBottom: "24px",
  color: theme.palette.text.secondary,
}));

const UpgradeCard = () => {
  return (
    <CardRoot>
      <StyledCard elevation={0}>
        <img src="/assets/images/biocom2.png" alt="upgrade" />

        <Paragraph>
          Clieck here to go to <b>BIOCOM AFRICA</b> <br /> website for client
          view
        </Paragraph>

        <Button
          size="large"
          color="primary"
          variant="contained"
          sx={{ textTransform: "uppercase" }}
        >
          WEBSITE VIEW
        </Button>
      </StyledCard>
    </CardRoot>
  );
};

export default UpgradeCard;
