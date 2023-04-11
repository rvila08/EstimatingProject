import styled from "styled-components";
import React from "react";

export default function Fields({ onCarInfoChange }) {
  const handleInputChange = (event) => {
    onCarInfoChange({ [event.target.name]: event.target.value });
  };

  return (
    <Wrapper>
      <MyField>
        <Label htmlFor="Year">Year: </Label>
        <input
          type="text"
          name="Year"
          style={{ height: "20px", width: "40px" }}
          onChange={handleInputChange}
        />
      </MyField>
      <MyField>
        <Label htmlFor="Make">Make: </Label>
        <input
          type="text"
          name="Make"
          style={{ height: "20px", width: "40px" }}
          onChange={handleInputChange}
        />
      </MyField>
      <MyField>
        <Label htmlFor="Model">Model: </Label>
        <input
          type="text"
          name="Model"
          style={{ height: "20px", width: "40px" }}
          onChange={handleInputChange}
        />
      </MyField>
      <MyField>
        <Label htmlFor="VIN">VIN:</Label>
        <input
          type="text"
          name="VIN"
          style={{ height: "20px", width: "100%" }}
          onChange={handleInputChange}
        />
      </MyField>
      <MyField>
        <Label htmlFor="Color">Color: </Label>
        <input
          type="text"
          name="Color"
          style={{ height: "20px", width: "40px" }}
          onChange={handleInputChange}
        />
      </MyField>
    </Wrapper>
  );
}

const MyField = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
  flex-direction: row;
  font-size: 0.75rem;
  align-items: baseline;
`;

const Wrapper = styled.form`
  width: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5%;
  background-color: var(--gray-100);
  border-radius: 10px;
`;

const Label = styled.label`
  position: relative;
  right: 10px;
`;
