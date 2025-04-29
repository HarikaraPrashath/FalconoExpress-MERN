// HistoryPage.jsx
import React, { useState, useEffect } from 'react';
import { getProducts } from '../../pages/DeliverySection/api/deliveryProductAPI';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import jsPDF from 'jspdf';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const HistoryPage = () => {
  const [products, setProducts] = useState([]);
  const [deliveriesData, setDeliveriesData] = useState([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const data = await getProducts();
      const productsWithDeliveries = data.map((product) => {
        // Extract deliveries count from description
        const deliveriesCount = product.description ? extractDeliveriesFromDescription(product.description) : 0;
        return {
          ...product,  // Spread the existing product data
          deliveries: deliveriesCount, // Add deliveries to the product
        };
      });
      setProducts(productsWithDeliveries);  // Set the products with the new deliveries data
  
      const deliveries = productsWithDeliveries.map((product) => {
        return {
          name: product.name,
          deliveries: product.deliveries,
        };
      });
      setDeliveriesData(deliveries);  // Update deliveriesData if needed for charts
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };
  

  const extractDeliveriesFromDescription = (description) => {
    // Match the deliveries number pattern from description (e.g., "8 deliveries")
    const match = description.match(/(\d+) deliveries/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Delivery History & Deliveries Chart', 20, 20);

    doc.setFontSize(12);
    let yOffset = 30;
    products.forEach((product, index) => {
      doc.text(`${index + 1}. ${product.name} - ${product.deliveries || 0} deliveries`, 20, yOffset);
      yOffset += 10;
    });

    doc.addPage();
    doc.text('Deliveries Bar Chart', 20, 20);
    const chartCanvas = document.getElementById('deliveryChart').toDataURL();
    doc.addImage(chartCanvas, 'PNG', 20, 30, 180, 90);

    // Add pie chart to PDF
    doc.addPage();
    doc.text('Deliveries Pie Chart', 20, 20);
    const pieChartCanvas = document.getElementById('deliveryPieChart').toDataURL();
    doc.addImage(pieChartCanvas, 'PNG', 20, 30, 180, 90);

    doc.save('DeliveryHistory.pdf');
  };

  const getRating = (deliveries) => {
    if (deliveries >= 30) return 5;
    if (deliveries >= 20) return 5;
    if (deliveries >= 10) return 4;
    if (deliveries >= 1) return 3;
    return 0;
  };

  const chartData = {
    labels: deliveriesData.map((delivery) => delivery.name),
    datasets: [
      {
        label: 'Number of Deliveries',
        data: deliveriesData.map((delivery) => delivery.deliveries),
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Soft Blue for bar chart
        borderColor: 'rgba(54, 162, 235, 1)',       // Darker Blue for border
        borderWidth: 1,

      },
    ],
  };

  const pieChartData = {
    labels: deliveriesData.map((delivery) => delivery.name),
    datasets: [
      {
        data: deliveriesData.map((delivery) => delivery.deliveries),
        backgroundColor: deliveriesData.map(() =>
          'rgba(54, 162, 235, 0.6)'  // Red color for pie chart
        ),
        borderColor: deliveriesData.map(() =>
          'rgba(54, 162, 235, 1)'  // Red border for pie chart
        ),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Deliveries by Person',
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Deliveries Distribution',
      },
    },
    maintainAspectRatio: false,  // Allow custom sizing
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Delivery History</h1>
      <div className="overflow-x-auto bg-white rounded shadow mb-6">
        <table className="w-full text-left border-t">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Deliveries</th>
              <th className="px-4 py-3">Rating</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.deliveries || 0}</td>
                <td className="px-4 py-3">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-${index < getRating(product.deliveries || 0) ? 'red-500' : 'gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-6">
        <Bar id="deliveryChart" data={chartData} options={chartOptions} />
      </div>

      <div className="mb-6" style={{ height: '600px', width: '600px' }}> {/* Reduced size for pie chart */}
        <Pie id="deliveryPieChart" data={pieChartData} options={pieChartOptions} />
      </div>

      <button
        onClick={generatePDF}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generate PDF
      </button>
    </div>
  );
};

export default HistoryPage;
