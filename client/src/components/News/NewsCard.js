import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import ShareIcon from "@mui/icons-material/Share";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import moment from "moment";
import { Box, Link, Tooltip } from "@mui/material";
const NewsCard = ({ author, title, description, url, image, time, source }) => {
  const i =
    image === null
      ? "https://archive.org/download/placeholder-image/placeholder-image.jpg"
      : image;
  return (
    <Card elevation={6} sx={{ maxWidth: 345, borderRadius:3 }}>
      <CardMedia component="img" height="200" image={i} alt={source} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title.split('-')[0]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            sx={{ mr: 1 }}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {source}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`• ${moment(time).startOf("ss").fromNow()}`}
          </Typography>
        </Box>

        <Tooltip title="Read more">
          <Link href={url}>
            <ReadMoreIcon />
          </Link>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
