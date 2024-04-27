import React, { useState, useEffect } from "react";
import ReactApexChart from 'react-apexcharts';
import { fetchProductByOrder } from "@/providers/Orders";

export default function ProductChart(props) {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                foreColor: '#9baec8',
                height: 390,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                        margin: 20,
                        size: '20%',
                        background: 'transparent',
                        image: undefined,
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            show: false,
                        }
                    },
                    barLabels: {
                        enabled: true,
                        useSeriesColors: true,
                        margin: 8,
                        fontSize: '15px',
                        formatter: function(seriesName, opts) {
                            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                        },
                    },
                }
            },
            colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
            labels: [],
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        show: false
                    }
                }
            }]
        },
        error: null,
    });

    useEffect(() => {
        fetchProductByOrder()
            .then(data => {
                // Extract product names and repetition counts from the data
                const formattedData = data.map(item => ({
                    name: item[0].name,
                    repetitionCount: item[1]
                  }));
                const responseData = formattedData.map(item => [item.name, item.repetitionCount]);
                const series = responseData.map(item => item[1]);
                const labels = responseData.map(item => item[0]);
    
                // Update state with fetched and processed data
                setChartData(prevData => ({
                    ...prevData,
                    series: series,
                    options: {
                        ...prevData.options,
                        labels: labels,
                    }
                }));
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
                setChartData(prevData => ({ ...prevData, error: error.message }));
            });
    }, []);

    const { series, options, error } = chartData;

    if (error) {
        return <div>Error: {error}</div>; // Render error message if data fetching fails
    }

    return (
        <div className="relative flex flex-col min-w-0 break-words bg-dark w-full mb-6 rounded">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                            Performance
                        </h6>
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            TOP 5 Best Sold Products
                        </h2>
                    </div>
                </div>
            </div>
            <div className="p-4 flex-auto" id="chart">
                <div className="relative" >
                    <ReactApexChart options={options} series={series} type="pie" width={550} />
                </div>
            </div>
        </div>
    );
}
