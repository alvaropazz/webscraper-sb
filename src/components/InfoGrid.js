import React from "react";
import { Row, Text, InfoGridWraper } from "./styles";

const InfoGrid = (props) => {
  const { title, rank, numberComments, points } = props;
  return (
    <InfoGridWraper className="info-grid-wrapper">
      <Row>
        <Text style={{ fontSize: "40px" }}>{rank}</Text>
        <Text>{title}</Text>
      </Row>
      <Row>
        <Text>{numberComments}</Text>
        <Text>{points}</Text>
      </Row>
    </InfoGridWraper>
  );
};

export default InfoGrid;
