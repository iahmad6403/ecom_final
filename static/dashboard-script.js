async function fetchDataAndRenderChart(
  apiEndpoint,
  chartElementId,
  chartConfig
) {
  try {
    let response = await fetch(apiEndpoint);
    let data = await response.json();
    const ctx = document.getElementById(chartElementId).getContext("2d");
    new Chart(ctx, chartConfig(data));
  } catch (error) {
    console.error("Error fetching or rendering chart:", error);
  }
}

fetchDataAndRenderChart("/api/orders_over_time", "ordersChart", (data) => ({
  type: "bar",
  data: {
    labels: data.dates,
    datasets: [
      {
        label: "Number of Orders",
        data: data.counts,
      },
    ],
  },
}));

fetchDataAndRenderChart("/api/low_stock_levels", "stockChart", (data) => ({
  type: "line",
  data: {
    labels: data.products,
    datasets: [
      {
        label: "Low Stock",
        data: data.quantities,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        display: false,
      },
    },
  },
}));

fetchDataAndRenderChart("/api/most_popular_products", "popularProductsChart", (data) => ({
  type: "bar",
  data: {
    labels: data.map((item) => item.product_name),
    datasets: [
      {
        label: "Quantity Sold",
        data: data.map((item) => item.total_quantity),
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        display: false,
      },
    },
  },
}));

fetchDataAndRenderChart("/api/revenue_generation", "revenueChart", (data) => ({
  type: "bar",
  data: {
    labels: data.dates,
    datasets: [
      {
        label: "Total Revenue",
        data: data.revenues,
      },
    ],
  },
}));

fetchDataAndRenderChart("/api/product_category_popularity", "categoryPopularityChart", (data) => ({
  type: "polarArea",
  data: {
    labels: data.categories,
    datasets: [
      {
        label: "Total Sales",
        data: data.sales,
      },
    ],
  },
}));

fetchDataAndRenderChart("/api/payment_method_popularity", "paymentMethodChart", (data) => ({
  type: "bar",
  data: {
    labels: data.methods,
    datasets: [
      {
        label: "Transaction Count",
        data: data.counts,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        display: false,
      },
    },
  },
}));

fetchDataAndRenderChart("/api/temperature_over_time", "temperatureChart", (data) => ({
  type: "bar",
  data: {
    labels: data.daily.time,
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.daily.temperature_2m_max,
      },
    ],
  },
}));
