import React, { useState, useEffect } from "react";
import {
  AppWrapper,
  MainNav,
  Title,
  Container,
  FilterByTitle,
  FilterByOption,
} from "./styles";
import axios from "axios";
import cheerio from "cheerio";
import { InfoGrid } from "./components";

const App = () => {
  const [top30, setTop] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://thingproxy.freeboard.io/fetch/https://news.ycombinator.com/"
      )
      .then(
        (response) => {
          if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            const top30Data = [];

            $(
              `body > center > table > tbody > tr > td > table > tbody > tr`
            ).each((_idx, el) => {
              top30Data.push({
                rank: $(el).find(".athing .title .rank").text(),
                title: $(el).find(".athing .title .titlelink").text(),
                points: $(el)
                  .next()
                  .find(".subtext .score")
                  .text()
                  .toString()
                  .split(" ")[0],
                numberComments: $(el)
                  .next()
                  .find(".subtext a:contains('comment')")
                  .text()
                  .toString()
                  .split("c")[0],
              });
            });
            setTop(top30Data.filter((el) => el.rank !== ""));
            setFiltered(top30Data.filter((el) => el.rank !== ""));
          }
        },
        (error) => console.log(error)
      );
  }, []);

  const onChange = (e) => {
    const { value } = e.target;

    const filtereByComments = [...top30]
      .sort((a, b) =>
        parseFloat(b.numberComments) > parseFloat(a.numberComments) ? 1 : -1
      )
      .filter((el) => el.numberComments !== "")
      .slice(0, 5);
    const filterByPoints = [...top30]
      .sort((a, b) => (parseFloat(b.points) > parseFloat(a.points) ? 1 : -1))
      .filter((el) => el.points !== "")
      .slice(0, 5);

    switch (value) {
      case "numberComments":
        setFiltered(filtereByComments);
        break;
      case "points":
        setFiltered(filterByPoints);
        break;
      default:
        setFiltered(top30);
    }
  };

  return (
    <AppWrapper className="App" data-test-id="App">
      <MainNav>
        <Title>Y Combinator Top 30</Title>
        <Container>
          <FilterByTitle htmlFor="filter-option">
            Choose an option:
          </FilterByTitle>

          <select name="filter-option" id="filter-option" onChange={onChange}>
            <FilterByOption value="reset">All</FilterByOption>
            <FilterByOption value="numberComments">
              previous entries with more than five words in the title ordered by
              the number of comments first
            </FilterByOption>
            <FilterByOption value="points">
              previous entries with less than or equal to five words in the
              title ordered by points
            </FilterByOption>
          </select>
        </Container>
      </MainNav>

      {top30 &&
        filtered.map((item, idx) => {
          return (
            <InfoGrid
              key={idx}
              title={item.title}
              rank={item.rank}
              numberComments={item.numberComments}
              points={item.points}
            />
          );
        })}
    </AppWrapper>
  );
};

export default App;
