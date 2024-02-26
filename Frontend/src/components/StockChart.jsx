import React from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

export default function StockChart({ currentStock, soldItems, returnItems }) {
  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: "center" }}>Pie Chart</h2> */}
      <Pie
        data={{
          labels: ["CURRENT STOCK", "SOLD ITEMS", "RETURNED ITEMS"],
          datasets: [
            {
              label: "Popularity of colours",
              data: [currentStock, soldItems, returnItems],
              // you can set indiviual colors for each bar
              backgroundColor: ["#EED3D9", "#9BCF53", "#FDBF60"],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Stock Analysis",
            },
          },
        }}
      />
    </div>
  );
}
