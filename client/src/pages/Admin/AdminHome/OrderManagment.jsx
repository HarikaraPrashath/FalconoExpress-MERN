import React, { useState, useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoIosInformationCircle } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { SiTrustpilot } from "react-icons/si";

import { Link } from "react-router-dom";
import {
  CalendarIcon,
  EyeIcon,
  InfoIcon,
  Package2Icon,
  TruckIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";
import Badge from "../../../components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/Table";
import Button from "../../../components/ui/Button";

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders/orders");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // Filter orders for "New Orders" (not assigned or cancelled)
  const newOrders = allOrders.filter(
    (order) => order.status !== "assigned" && order.status !== "cancelled"
  );

  // Filter orders for "Current Deliveries" (assigned)
  const currentDeliveries = allOrders.filter(
    (order) => order.status === "assigned"
  );

  // Combined search filter for both sections
  const filterOrders = (orders) =>
    orders.filter(
      (order) =>
        (order.orderNo &&
          order.orderNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.deliveryPerson &&
          order.deliveryPerson
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (order.date &&
          order.date.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const filteredNewOrders = filterOrders(newOrders);
  const filteredDeliveries = filterOrders(currentDeliveries);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-red-500 to-red-900 text-white p-6 flex flex-col justify-between shadow-lg">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <AiFillHome className="text-2xl" />
            <h1 className="text-2xl font-bold tracking-wide">Dashboard</h1>
          </div>
          <div className="flex flex-col items-center text-center mb-8">
            <img
              src="https://images.pexels.com/photos/9461230/pexels-photo-9461230.jpeg"
              alt="User Profile"
              className="rounded-full w-20 h-20 border-4 border-white shadow-md mb-3 object-cover"
            />
            <p className="text-lg font-semibold">Admin</p>
            <p className="text-sm opacity-80">admin@gmail.com</p>
          </div>
          <nav className="space-y-4">
            <Link
              to={`/adminOrder`}
              className="flex items-center space-x-2 w-full text-left p-2 bg-white text-red-600 rounded"
            >
              <FaBookmark className="text-xl" />
              <span>Orders</span>
            </Link>
            <Link
              to={`/custonerdelivery`}
              className="flex items-center space-x-2 w-full text-left p-2 hover:bg-white hover:text-red-600 rounded"
            >
              <IoIosInformationCircle className="text-xl" />
              <span>Customer Delivery</span>
            </Link>
            <Link
              to={`/paymentad`}
              className="flex items-center space-x-2 w-full text-left p-2 hover:bg-white hover:text-red-600 rounded"
            >
              <MdOutlinePayment className="text-xl" />
              <span>Payment</span>
            </Link>

            <Link
              to={`/revenue`}
              className="flex items-center space-x-2 w-full text-left p-2   hover:bg-white hover:text-red-600 rounded"
            >
              <BiSolidOffer className="text-xl" />
              <span>Revenue Infor</span>
            </Link>
            <Link
              to={`/loyalty`}
              className="flex items-center space-x-2 w-full text-left p-2   hover:bg-white hover:text-red-600 rounded"
            >
              <SiTrustpilot className="text-xl" />
              <span>Loyalty Infor</span>
            </Link>
            <Link
              onClick={logoutUser}
              className="flex items-center space-x-3 w-full text-left p-2 hover:bg-white hover:text-red-600 rounded"
            >
              <IoLogOut className="text-xl" />
              <span>Logout</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <header className="sticky top-0 z-10 bg-gradient-to-r from-gray-100 to-white px-4 py-3 md:px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Manage Orders</h1>
            <Button size="sm">
              <a href="/orderviewpage/DeliveryAssignPage/orderHistory">
                History
              </a>
            </Button>
          </div>
        </header>

        {/* Search Input */}
        <div className="my-6">
          <input
            type="text"
            placeholder="Search orders by number, delivery person, or date..."
            className="w-full rounded border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {[
            {
              title: "Total Revenue",
              value: "Rs. 56,789.00",
              subtitle: "+20.1% from last month",
              icon: <WalletIcon className="h-4 w-4 text-muted-foreground" />,
              bg: "bg-yellow-50",
            },
            {
              title: "Pending Deliveries",
              value: newOrders.length,
              subtitle: "+12 since yesterday",
              icon: <Package2Icon className="h-4 w-4 text-muted-foreground" />,
              bg: "bg-yellow-50",
            },
            {
              title: "New Orders",
              value: newOrders.length,
              subtitle: "+4 in the last hour",
              icon: <TruckIcon className="h-4 w-4 text-muted-foreground" />,
              bg: "bg-yellow-50",
            },
            {
              title: "Available Persons",
              value: "15",
              subtitle: "Out of 24 total",
              icon: <UsersIcon className="h-4 w-4 text-muted-foreground" />,
              bg: "bg-yellow-50",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className={`transition-transform duration-300 transform hover:scale-105 ${item.bg}`}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                {item.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New Orders Section */}
        <div className="mt-6">
          <Card className="bg-gradient-to-br from-gray-100 to-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800">
                New Orders
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Orders waiting to be assigned
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {filteredNewOrders.length > 0 ? (
                  filteredNewOrders.map((order) => (
                    <Card
                      key={order._id}
                      className="group overflow-hidden bg-white shadow-md rounded-xl border border-gray-200 hover:border-red-400 hover:shadow-lg transform transition duration-300 hover:scale-[1.03]"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">
                              Order {order.orderNo}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <CalendarIcon className="h-4 w-4" />
                              <span>
                                {order.date || new Date().toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 inline-flex items-center gap-2 text-sm">
                          <div className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-full group-hover:border-red-500 group-hover:text-red-600 transition-colors">
                            <EyeIcon className="h-4 w-4 group-hover:text-red-600" />
                            <Link
                              to={`/orderviewpage/DeliveryAssignPage?orderNo=${order.orderNo}`}
                              className="text-sm font-medium transition-colors group-hover:text-red-600"
                            >
                              View details
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-full">
                    No new orders match your search.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Deliveries */}
        <div className="mt-6">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Current Deliveries</CardTitle>
              <CardDescription>
                Manage and track ongoing deliveries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Delivery No.</TableHead>
                      <TableHead>Delivery Person</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDeliveries.length > 0 ? (
                      filteredDeliveries.map((delivery) => (
                        <TableRow key={delivery._id}>
                          <TableCell className="font-medium">
                            {delivery.orderNo}
                          </TableCell>
                          <TableCell>
                            {delivery.deliveryPerson || "N/A"}
                          </TableCell>
                          <TableCell>
                            {delivery.date || new Date().toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <span className="text-green-600 font-semibold">
                              In Progress
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Link
                              to={`/orderviewpage/DeliveryAssignPage/EditDeatilsPage?orderNo=${delivery.orderNo}`}
                            >
                              <Button variant="ghost" size="icon">
                                <InfoIcon className="h-4 w-4" />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center text-gray-500"
                        >
                          No current deliveries match your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OrderManagement;
