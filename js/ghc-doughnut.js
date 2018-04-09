new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: ['ACM-W scholarship', 'Outside scholarship', 'Personal funds'],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#fcf592", "#fb5454","#54befb"],
          data: [12,7,3]
        }
      ]
    },
});
