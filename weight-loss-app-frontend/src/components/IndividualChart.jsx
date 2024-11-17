import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { useGetProgressQuery } from '../api/DietExtendedApi';
import Loader from './Loader';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

const StackedLineChart = () => {
  const { data, isLoading, error } = useGetProgressQuery();

  if (isLoading) {
    return <><Loader /></>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 7', 'Week 44', 'Week 66', 'Week 89'];

  const usersData = {};
  data?.progress.forEach(item => {
    if (!usersData[item.name]) {
      usersData[item.name] = new Array(weeks.length).fill(0);
    }
    const weekIndex = weeks.indexOf(`Week ${item.week}`);
    if (weekIndex >= 0) {
      usersData[item.name][weekIndex] = item.weightLoss;
    }
  });

  const datasets = Object.keys(usersData).map(user => ({
    label: user,
    data: usersData[user],
    borderColor: getRandomColor(),
    backgroundColor: getRandomColor(0.2),
    fill: true,
  }));

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: window.innerWidth < 600 ? 10 : 12, 
          },
        },
      },
      title: {
        display: true,
        text: 'Weight Chart',
        font: {
          size: window.innerWidth < 600 ? 14 : 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weeks',
          font: {
            size: window.innerWidth < 600 ? 10 : 12, 
          },
        },
        ticks: {
          font: {
            size: window.innerWidth < 600 ? 10 : 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Weight Loss (kg)',
          font: {
            size: window.innerWidth < 600 ? 10 : 12,
          },
        },
        ticks: {
          font: {
            size: window.innerWidth < 600 ? 10 : 12,
          },
        },
        stacked: true,
        beginAtZero: true,
      },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.dataset.label}: ${tooltipItem.raw} kg`;
        },
      },
      bodyFont: {
        size: window.innerWidth < 600 ? 10 : 12,
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
  };

  function getRandomColor(alpha = 1) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const chartData = {
    labels: weeks,
    datasets: datasets,
  };

  return (
    <div className='chart-area py-3'>
       <h3 className="custom-heading py-3 ms-3">Trend Graph</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StackedLineChart;
