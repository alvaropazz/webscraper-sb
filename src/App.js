import React, { useState, useEffect } from "react";
import { AppWrapper } from "./styles";
import axios from "axios";
import cheerio from "cheerio";
import { Button, InfoGrid } from "./components";

const App = () => {
  const [top30, setTop30] = useState([]);

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
                numberComments: $(el).next().find(".subtext .score").text(),
                points: $(el)
                  .next()
                  .find(".subtext a:contains('comment')")
                  .text(),
              });
            });
            setTop30(top30Data);
          }
        },
        (error) => console.log(error)
      );
  }, []);

  return (
    <AppWrapper className="App" data-test-id="App">
      <Button text={"test"} />

      {top30 &&
        top30.map((item, idx) => {
          if (item.rank) {
            return (
              <InfoGrid
                key={idx}
                title={item.title}
                rank={item.rank}
                numberComments={item.numberComments}
                points={item.points}
              />
            );
          }
        })}
    </AppWrapper>
  );
};

export default App;
