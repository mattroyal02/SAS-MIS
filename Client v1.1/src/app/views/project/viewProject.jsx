import { makeStyles } from "@material-ui/core";
import { Box, Grid, styled } from "@mui/material";
import useAuth from "app/hooks/useAuth";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectProfile from "../common/project-profile";
import ProjectProfileDetails from "../common/project-profile-details";
import "./index.css";
import { Container } from "./styles";
const useQuery = ({ url = "", params }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const refetch = useCallback(() => {
    if (url) {
      setLoading(true);
      axios({ method: "GET", url, params })
        .then((d) => setData(d.data))
        .catch((e) => setError(e))
        .finally(() => setLoading(false));
    }
  }, [url, params]);

  useEffect(refetch, [refetch]);

  return { data, loading, error, refetch };
};

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
  const { user } = useAuth();
  const { customerId, id } = useParams();
  const [project, setProject] = useState("");
  const [search, setSearch] = useState("");
  const {
    data: product,
    error,
    refetch,
  } = useQuery({
    url: `http://localhost:4050/projects/${id}`,
  });

  const getData = async () => {
    const { data } = await axios.get(`http://localhost:4050/projects/${id}`, {
      params: { search },
    });
    // console.log("Current Project", data);
    setProject(data);
  };
  useEffect(() => {
    getData();
  }, [search]);

  //   console.log("Products", customer);

  return (
    <Container>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {project && (
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item lg={10} md={10} xs={8}>
                <ProjectProfile currentProject={project} />
              </Grid>
              <Grid item lg={10} md={10} xs={8}>
                <ProjectProfileDetails
                  name={project.data.name}
                  poNumber={project.data.poNumber}
                  supplierProjectNumber={project.data.supplierProjectNumber}
                  votingNumber={project.data.votingNumber}
                />
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
    </Container>
  );
};

export default ProjectsView;
