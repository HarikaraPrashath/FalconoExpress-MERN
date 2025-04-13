import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/ui/Button';
import { Download, Pencil } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function DeliveryViewPage() {
  const navigate = useNavigate();
  const currentDateTime = new Date().toLocaleString();
  const orderId = 'ORD12345';

  const handleEdit = () => {
    navigate('/orderviewpage/DeliveryAssignPage/EditDeatilsPage');
  };

  const handleDownloadPDF = async () => {
    const input = document.getElementById('pdf-content');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Delivery_Report_${orderId}.pdf`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-md" id="pdf-content">
      <header className="top-0 z-10 bg-gradient-to-r from-gray-100 to-white px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Details - Order No: 1021</h1>
          <h4 className="text-sm text-gray-500">{currentDateTime}</h4>
        </div>
      </header>

      <div className="mt-6">
        <table className="w-full text-sm text-left">
          <tbody className="space-y-6">
            <tr className="align-top h-20">
              <td className="font-semibold pr-6 w-1/3">Sender Information</td>
              <td className="text-gray-700">
                <div className="space-y-1">
                  <p>John Smith</p>
                  <p>+1 (555) 123-4567</p>
                  <p>123 Sender St, Shipping City</p>
                </div>
              </td>
            </tr>

            <tr className="align-top h-20">
              <td className="font-semibold pr-6 w-1/3">Pickup Location</td>
              <td className="text-gray-700">
                <div className="space-y-1">
                  <p>Main Warehouse</p>
                  <p>789 Warehouse BLVD, Storage City</p>
                </div>
              </td>
            </tr>

            <tr className="align-top h-20">
              <td className="font-semibold pr-6 w-1/3">Recipient Information</td>
              <td className="text-gray-700">
                <div className="space-y-1">
                  <p>Jane Doe</p>
                  <p>+1 (555) 987-6543</p>
                  <p>456 Recipient Ave, Delivery Town</p>
                </div>
              </td>
            </tr>

            <tr className="align-top h-20">
              <td className="font-semibold pr-6 w-1/3">Parcel Details</td>
              <td className="text-gray-700">
                <div className="space-y-1">
                  <p>Weight: 5.2 kg</p>
                  <p>Type: Electronics</p>
                </div>
              </td>
            </tr>

            <tr className="align-top h-20">
              <td className="font-semibold pr-6 w-1/3">Assigned Delivery Person</td>
              <td className="text-gray-700">Rahul Sharma</td>
            </tr>

            <tr className="align-top h-20">
              <td className="font-semibold pr-6 w-1/3">Admin Notes</td>
              <td className="text-gray-700">Handle with care. Deliver before 6 PM.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-end space-x-4 mt-6 print:hidden">
        <Button variant="outline" onClick={handleEdit}>
          <Pencil className="w-4 h-4 mr-2" /> Edit
        </Button>
        <Button onClick={handleDownloadPDF}>
          <Download className="w-4 h-4 mr-2" /> Download PDF
        </Button>
      </div>

      <div className="hidden print:flex justify-center mt-10">
        <img src="/logo.png" alt="Company Logo" className="h-16" />
      </div>
    </div>
  );
}

export default DeliveryViewPage;
