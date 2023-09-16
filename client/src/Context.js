import axios from "axios";
import React, { createContext, useContext, useState } from "react";
const News = createContext();
const NewsContext = ({ children }) => {
  const [category, setCategory] = useState("general");
  const [country, setCountry] = useState("in");
  const [keyword, setKeyword] = useState("");
  const [newsList, setNewsList] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const API = axios.create({ baseURL: "https://agma-news-backend.onrender.com" });

  const newsApi = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(
        `/news?category=${category}&country=${country}`
      );

      setNewsList(data?.articles);
      setNewsResults(data?.totalResults);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const fetchNewsBySearch = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/news/search?q=${keyword}`);

      setNewsList(data?.articles);
      setNewsResults(data?.totalResults);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <News.Provider
      value={{
        category,
        setCategory,
        newsApi,
        loading,
        newsList,
        country,
        setCountry,
        keyword,
        fetchNewsBySearch,
        setKeyword,
        isDark,
        setIsDark,
      }}
    >
      {children}
    </News.Provider>
  );
};

export default NewsContext;

export const NewsState = () => {
  return useContext(News);
};
