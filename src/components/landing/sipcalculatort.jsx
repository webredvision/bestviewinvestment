"use client";
import React, { useEffect, useState } from "react";
import { SipHomeChart } from "../charts/sipHomeChart";
import HomeHeading from "./heading/heading";

// Slider Input Component
const SliderInput = ({ label, value, setValue, min, max, step }) => (
  <div className="mt-4 w-full">
    <div className="flex justify-between mb-2">
      <h5 className="font-medium">{label}</h5>
      <input
        type="number"
        className="font-bold text-lg text-[var(--rv-primary)] w-24 border px-2 py-1 rounded"
        value={isNaN(value) ? 0 : value}
        onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
      />
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={isNaN(value) ? 0 : value}
      onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
      onInput={(e) => setValue(parseFloat(e.target.value) || 0)}
      style={{
        "--progress": `${
          ((isNaN(value) ? 0 : value - min) / (max - min)) * 100
        }%`,
      }}
      className="customRange"
    />
  </div>
);

// Result Card Component
const ResultCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow-md p-6 text-center">
    <h5 className="text-lg font-semibold text-gray-700">{title}</h5>
    <p className="text-2xl font-bold text-[var(--rv-secondary)] mt-2">
      {value}
    </p>
  </div>
);

export default function SipCalculator() {
  const [isMonthlySip, setIsMonthlySip] = useState(true);
  const [oneTimeInvestment, setOneTimeInvestment] = useState(500);
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const [investmentDuration, setInvestmentDuration] = useState(1);
  const [expectedReturn, setExpectedReturn] = useState(1);
  const [result, setResult] = useState(null);
  const [chartData, setChartdata] = useState([]);

  useEffect(() => {
    calculateSip();
  }, [
    monthlyInvestment,
    oneTimeInvestment,
    investmentDuration,
    expectedReturn,
    isMonthlySip,
  ]);

  const calculateSip = () => {
    const monthlyRate = expectedReturn / 12 / 100 || 0;
    const annualRate = expectedReturn / 100 || 0;
    const months = investmentDuration * 12;

    let futureValue = 0;
    let totalInvestment = 0;

    if (isMonthlySip) {
      futureValue =
        monthlyInvestment *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
      totalInvestment = monthlyInvestment * months;
    } else {
      futureValue = oneTimeInvestment * Math.pow(1 + monthlyRate, months);
      totalInvestment = oneTimeInvestment;
    }

    const yearlyData = [];
    for (let year = 1; year <= investmentDuration; year++) {
      let yearlyFutureValue = 0;
      let yearlyTotalInvestment = 0;

      if (isMonthlySip) {
        const monthsInYear = year * 12;
        yearlyFutureValue =
          monthlyInvestment *
          ((Math.pow(1 + monthlyRate, monthsInYear) - 1) / monthlyRate) *
          (1 + monthlyRate);
        yearlyTotalInvestment = monthlyInvestment * monthsInYear;
      } else {
        yearlyFutureValue = oneTimeInvestment * Math.pow(1 + annualRate, year);
        yearlyTotalInvestment = oneTimeInvestment;
      }

      yearlyData.push({
        year: year,
        investedAmount: Math.round(yearlyTotalInvestment),
        growth: Math.round(yearlyFutureValue),
      });
    }

    setChartdata(yearlyData);
    setResult({
      futureValue: isNaN(futureValue) ? 0 : Number(futureValue.toFixed(2)),
      totalInvestment: isNaN(totalInvestment)
        ? 0
        : Number(totalInvestment.toFixed(2)),
    });
  };

  return (
    <div className="main-section">
      <div className="max-w-screen-xl mx-auto">
        <HomeHeading
          title="Calculate Your SIP Easily"
          subtitle="SIP Calculator"
          className="text-center mb-10"
        />

        <div className="blurbackground md:px-10 py-10 rounded-[30px]">
          {/* Input + Chart */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            <div className="bg-white rounded-[30px] p-6">
              {/* Toggle SIP / Lumpsum */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setIsMonthlySip(true)}
                  className={`py-2 px-4 font-bold ${
                    isMonthlySip
                      ? "border-b-2 border-[var(--rv-secondary)] text-[var(--rv-secondary)]"
                      : "text-gray-700"
                  }`}
                >
                  SIP
                </button>
                <button
                  onClick={() => setIsMonthlySip(false)}
                  className={`py-2 px-4 font-bold ${
                    !isMonthlySip
                      ? "border-b-2 border-[var(--rv-secondary)] text-[var(--rv-secondary)]"
                      : "text-gray-700"
                  }`}
                >
                  Lumpsum
                </button>
              </div>

              {isMonthlySip ? (
                <SliderInput
                  label="Monthly investment (₹)"
                  value={monthlyInvestment}
                  setValue={setMonthlyInvestment}
                  min={500}
                  max={50000}
                  step={500}
                />
              ) : (
                <SliderInput
                  label="Total investment (₹)"
                  value={oneTimeInvestment}
                  setValue={setOneTimeInvestment}
                  min={500}
                  max={50000}
                  step={500}
                />
              )}

              <SliderInput
                label="Time period (Year)"
                value={investmentDuration}
                setValue={setInvestmentDuration}
                min={1}
                max={40}
                step={1}
              />

              <SliderInput
                label="Expected Return (%)"
                value={expectedReturn}
                setValue={setExpectedReturn}
                min={1}
                max={30}
                step={1}
              />
            </div>

            <div id="chart-container">
              <SipHomeChart piedata={result} title="SIP Calculator" />
            </div>
          </div>

          {result && (
            <div className="mt-10 grid md:grid-cols-3 gap-4">
              <ResultCard
                title="Invested Amount"
                value={`₹${(isNaN(result.totalInvestment)
                  ? 0
                  : result.totalInvestment
                ).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
              />
              <ResultCard
                title="Estimated Return"
                value={`₹${(isNaN(result.futureValue - result.totalInvestment)
                  ? 0
                  : Math.floor(result.futureValue - result.totalInvestment)
                ).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
              />
              <ResultCard
                title="Future Value"
                value={`₹${(isNaN(result.futureValue)
                  ? 0
                  : result.futureValue
                ).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
