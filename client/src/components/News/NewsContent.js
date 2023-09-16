import React, { useEffect, useState } from "react";
import { NewsState } from "../../Context";
import NewsCard from "./NewsCard";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const NewsContent = () => {
  const {
    newsList,
    newsApi,
    category,
    NewsResults,
    loading,
    country,
    keyword,
  } = NewsState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    newsApi();
  }, [category, NewsResults, country]);

  if (loading) return <LinearProgress />;
  if (!loading && !newsList) return null;
  if (!loading && newsList.length === 0)
    return (
      <Paper sx={{ m: "auto", width: 500 }} elevation={6}>
        <Typography sx={{ m: 2 }} variant="h6" gutterBottom component="div">
          No News related to selected category or keyword. Please try again
          after some time.
        </Typography>
      </Paper>
    );

  return (
    <Container sx={{ marginTop: "100px" }}>
      <Box>
        <Grid
          container
          spacing={4}
          alignItems="stretch"
          direction="row"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          {newsList
            .slice((page - 1) * 9, (page - 1) * 9 + 9)
            .map((newsItem) => (
              <Grid item key={newsItem.title}>
                <NewsCard
                  author={newsItem.author}
                  title={newsItem.title}
                  description={newsItem.description}
                  url={newsItem.url}
                  image={newsItem.urlToImage}
                  time={newsItem.publishedAt}
                  source={newsItem.source.name}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      <Pagination
        sx={{ display: "flex", justifyContent: "center", p: 2 }}
        count={Math.ceil(newsList.length / 9)}
        onChange={(_, value) => {
          setPage(value);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </Container>
  );
};

export default NewsContent;
