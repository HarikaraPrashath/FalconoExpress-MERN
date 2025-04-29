    import React, { useState } from 'react';

    const PopUpForOrderMakeUser = ({ onClose }) => {
    const [formData, setFormData] = useState({
        receiverName: '',
        senderMobile: '',
        receiverMobile: '',
        pickupPoint: '',
        deliveryPoint: '',
        courierType: 'brakable',
    });

    const [deliveryCost, setDeliveryCost] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculateDistanceAndCost = async () => {
        const { pickupPoint, deliveryPoint } = formData;

        if (!pickupPoint || !deliveryPoint) {
        alert("Please enter both pickup and delivery points.");
        return;
        }

        const apiKey = import.meta.env.VITE_MAPS_API_KEY;

        const geocode = async (location) => {
        const res = await fetch(
            `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(location)}`
        );
        const data = await res.json();
        if (data?.features?.[0]?.geometry?.coordinates) {
            return data.features[0].geometry.coordinates; // [lng, lat]
        }
        throw new Error(`Could not geocode location: ${location}`);
        };

        try {
        setLoading(true);

        const pickupCoords = await geocode(pickupPoint);
        const deliveryCoords = await geocode(deliveryPoint);

        const body = {
            coordinates: [pickupCoords, deliveryCoords],
        };

        const response = await fetch("https://api.openrouteservice.org/v2/directions/driving-car", {
            method: "POST",
            headers: {
            "Authorization": apiKey,
            "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        console.log(data)
        const distanceInMeters = data?.routes?.[0]?.summary?.distance || 0;  //get distance in meter
        const distanceKm = distanceInMeters / 1000; // convert it to km
        const cost = distanceKm * 10;  // calculate cost based on distance

        setDeliveryCost(cost.toFixed(2));
        } catch (error) {
        console.error("Error calculating distance:", error);
        alert("Could not calculate delivery cost.");
        } finally {
        setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!deliveryCost) {
        alert("Please calculate the delivery cost before submitting.");
        return;
        }
    
        const finalOrder = {
        ...formData,
        deliveryCost,
        };
    
        try {
        const response = await fetch(`${import.meta.env.VITE_FRONT_END_API_URL}/orders/create`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(finalOrder),
        });
    
        if (!response.ok) {
            throw new Error("Failed to submit order");
        }
    
        const result = await response.json();
        console.log("Order submitted successfully:", result);
    
        // Optionally notify the user
        alert("Order submitted successfully!");
    
        onClose(); // Close the popup
        } catch (error) {
        console.error("Error submitting order:", error);
        alert("There was a problem submitting your order.");
        }
    };
    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Generate Token</h2>

            <input
            type="text"
            name="receiverName"
            placeholder="Receiver Name"
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            />
            <input
            type="text"
            name="senderMobile"
            placeholder="Sender Mobile Number"
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            />
            <input
            type="text"
            name="receiverMobile"
            placeholder="Receiver Mobile Number"
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            />
            <input
            type="text"
            name="pickupPoint"
            placeholder="Pickup Point"
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            />
            <input
            type="text"
            name="deliveryPoint"
            placeholder="Delivery Point"
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
            />

            <select
            name="courierType"
            value={formData.courierType}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            >
            <option value="brakable">Brakable</option>
            <option value="wood">Wood Material</option>
            <option value="iron">Iron</option>
            </select>

            <button
            onClick={calculateDistanceAndCost}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded mb-2 w-full disabled:opacity-50"
            >
            {loading ? "Calculating..." : "Calculate Delivery Cost"}
            </button>

            {deliveryCost && (
            <p className="text-blue-700 font-semibold mb-2">
                Estimated Delivery Cost: Rs {deliveryCost}
            </p>
            )}

            <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="text-red-500">Cancel</button>
            <button onClick={handleSubmit} className="bg-red-600 text-white px-4 py-2 rounded">
                Submit
            </button>
            </div>
        </div>
        </div>
    );
    };

    export default PopUpForOrderMakeUser;
