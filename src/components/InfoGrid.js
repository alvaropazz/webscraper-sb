import React from "react";
import { Row, Text, InfoGridWraper } from "./styles";

const InfoGrid = (props) => {
  const { title, rank, numberComments, points } = props;
  return (
    <InfoGridWraper className="info-grid-wrapper">
      <Row>
        <Text style={{ fontSize: "40px", width: "10%" }}>{rank}</Text>
        <Text style={{ fontSize: "30px", width: "90%" }}>{title}</Text>
      </Row>
      <Row>
        <Text style={{ fontSize: "20px", width: "50%" }}>
          {numberComments ? numberComments + " comments" : "N/A"}
        </Text>
        <Text style={{ fontSize: "20px", width: "50%" }}>
          {points ? points + " points" : "N/A"}{" "}
        </Text>
      </Row>
    </InfoGridWraper>
  );
};

export default InfoGrid;
