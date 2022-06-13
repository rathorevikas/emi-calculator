import React, { useState } from "react";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import MuiInput from "@mui/material/Input";
import "./EmiCalculator.css";

ChartJs.register(Tooltip, Title, ArcElement, Legend);
const Input = styled(MuiInput)`
  width: 100px;
`;

const EmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1500000);
  const [interestRate, setInterestRate] = useState(7);
  const [longTerm, setLongTerm] = useState(10);
  const [emi, setEmi] = useState(17416);
  const [interestPayable, setInterestPayable] = useState(589953);



  const loanmarks = [
    {
      value: 0,
      label: "0",
    },

    {
      value: 50000000,
      label: "5Cr",
    },
  ];

  const interestmarks = [
    {
      value: 0,
      label: "0%",
    },

    {
      value: 15,
      label: "15%",
    },
  ];

  const longtermmarks = [
    {
      value: 0,
      label: "0",
    },

    {
      value: 30,
      label: "30Yrs",
    },
  ];

  const emiCalculation = () => {

    let newEmi = Math.round(
      (loanAmount *
        (interestRate / 12 / 100) *
        Math.pow(1 + interestRate / 12 / 100, longTerm * 12)) /
        (Math.pow(1 + interestRate / 12 / 100, longTerm * 12) - 1)
    );
    let totalAmount = newEmi * longTerm*12;
    let newPayableInterest = totalAmount - loanAmount;

    setInterestPayable(newPayableInterest);
    setEmi(newEmi);
    
  };

  

  // All input Handler
  const inputHandler = (event) => {
    if (event.target.name === "loan") {
      setLoanAmount(
        event.target.value === "" ? "" : Number(event.target.value)
      );
    } else if (event.target.name === "interest") {
      setInterestRate(
        event.target.value === "" ? "" : Number(event.target.value)
      );
    } else if (event.target.name === "term") {
      setLongTerm(event.target.value === "" ? "" : Number(event.target.value));
    }
    emiCalculation();
  };

  //All slider handler
  const sliderHandler = (event, newValue) => {
    if (event.target.name === "loan") {
      setLoanAmount(newValue);
    } else if (event.target.name === "interest") {
      setInterestRate(newValue);
    } else if (event.target.name === "term") {
      setLongTerm(newValue);
    }
    emiCalculation();

  };


  const data = {
    labels: ["Principal Amount", "Interest Payable"],
    datasets: [
      {
        label: "My First Dataset",
        data: [loanAmount, interestPayable],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="container">
      <div className="container_heading">
        <h3>EMI Calculator</h3>
      </div>
      <div className="container_calculator">
        <div className="calculator_sliders">
          <div className="LoanAmount_slider">
            <div className="slider_heading">
              <h3>Loan Amount</h3>
              <input
                type="number"
                name="loan"
                value={loanAmount}
                onChange={inputHandler}
                max={50000000}
              />
            </div>
            <div className="slider">
              <Slider
                name="loan"
                value={typeof loanAmount === "number" ? loanAmount : 0}
                onChange={sliderHandler}
                aria-labelledby="input-slider"
                min={0}
                max={50000000}
                marks={loanmarks}
                sx={{ color: "#314467" }}
              />
            </div>
          </div>

          <div className="InterestRate_slider">
            <div className="slider_heading">
              <h3>Interest Rate</h3>
              <input
                type="number"
                name="interest"
                value={interestRate}
                onChange={inputHandler}
                max={15}
              />
            </div>
            <div className="slider">
              <Slider
                name="interest"
                value={typeof interestRate === "number" ? interestRate : 0}
                onChange={sliderHandler}
                aria-labelledby="input-slider"
                min={0}
                max={15}
                marks={interestmarks}
                sx={{ color: "#314467" }}
              />
            </div>
          </div>

          <div className="InterestRate_slider">
            <div className="slider_heading">
              <h3>Long Term (Years) </h3>
              <input
                type="number"
                name="term"
                value={longTerm}
                onChange={inputHandler}
                max={30}
              />
            </div>
            <div className="slider">
            <Slider
            name="term"
            value={typeof longTerm === "number" ? longTerm : 0}
            onChange={sliderHandler}
            aria-labelledby="input-slider"
            min={0}
            max={30}
            marks={longtermmarks}
            sx={{ color: "#314467" }}
          />
            </div>
          </div>
        </div>
        <div className="claculator_graph">
          <Doughnut data={data} />
          <div className="calculated_data">
            <label>Monthly Emi:</label>
            <h4>{emi}</h4>
            <label>Interest Pay:</label>
            <h4>{interestPayable}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;
