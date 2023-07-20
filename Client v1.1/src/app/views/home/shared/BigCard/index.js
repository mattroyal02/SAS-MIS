import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Icon } from "@mui/material";
import { styled } from "@mui/material/styles";

const CardInfo = styled(CardContent)(({ theme }) => ({
  "&:last-child": {
    paddingBottom: theme.spacing(2),
  },
}));

const MovieCard = ({ movie }) => {
  return (
    <Card sx={{ maxWidth: 250, position: "relative" }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="350"
          image={movie.image}
          alt={movie.title}
        />
      </Box>

      <CardInfo>
        <Typography variant="h6" gutterBottom component="div">
          {movie.title}
        </Typography>

        <Button
          href={movie.link}
          target="_blank"
          rel="noopener noreferrer"
          mb={0}
          variant="outlined"
          gutterBottom
          color="inherit"
          sx={{ m: 1 }}
        >
          <Icon>language</Icon> Visit Website
        </Button>
      </CardInfo>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
