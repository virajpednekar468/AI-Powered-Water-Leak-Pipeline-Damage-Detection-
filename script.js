document.addEventListener("DOMContentLoaded", function() {
    // Initialize gauges
    var pressureGauge = new Gauge(document.getElementById("pressureGauge")).setOptions({ max: 10 });
    var flowGauge = new Gauge(document.getElementById("flowGauge")).setOptions({ max: 100 });
    var tempGauge = new Gauge(document.getElementById("tempGauge")).setOptions({ max: 100 });
    
    var ctx = document.getElementById("dataChart").getContext("2d");
    var dataChart = new Chart(ctx, {
        type: "line",
        data: { labels: [], datasets: [{ label: "Pressure", data: [], borderColor: "red" }] },
    });
    
    window.predictLeak = function() {
        const pressure = parseFloat(document.getElementById("pressure").value);
        const flowRate = parseFloat(document.getElementById("flow_rate").value);
        const temperature = parseFloat(document.getElementById("temperature").value);

        fetch("/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pressure, flow_rate: flowRate, temperature })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("result").innerText = data.prediction;
            
            // Update gauges
            pressureGauge.set(pressure);
            flowGauge.set(flowRate);
            tempGauge.set(temperature);
            
            // Update chart
            dataChart.data.labels.push(new Date().toLocaleTimeString());
            dataChart.data.datasets[0].data.push(pressure);
            dataChart.update();
        });
    };
});
