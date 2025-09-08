import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BuyNow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BuyTotalProduct = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('UserId');
    const location = useLocation(); // Get the location object

    // State to hold the form data
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        UserId: userId, // Initialize with userId from localStorage
        productIds: [], // Initialize with an empty array for the product IDs
    });

    // State to hold validation errors
    const [errors, setErrors] = useState({});

    // On component mount, get the productIds from the location state
    useEffect(() => {
        // Check if location.state exists and contains productIds
        if (location.state && location.state.productIds) {
            setFormData(prev => ({ ...prev, productIds: location.state.productIds }));
        } else {
            // Handle case where productIds might not be passed (e.g., direct access or refresh)
            setErrors(prev => ({ ...prev, productIds: 'No products found for checkout. Please go back to your cart.' }));
            // Optionally, redirect if no products are found, as a checkout without products is invalid
            // navigate('/addtocart'); // Redirect to cart or home
        }
    }, [location.state, navigate]); // Add navigate to dependency array

    // A single handler to update form data based on input name
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        // Clear error for the field being edited
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: undefined }));
        }
    };

    // Function to validate the form data
    const validateForm = () => {
        const newErrors = {};

        // Rule 1: Check for empty fields
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
        if (!formData.address.trim()) newErrors.address = 'Shipping Address is required.';
        if (!formData.city.trim()) newErrors.city = 'City is required.';
        if (!formData.zip.trim()) newErrors.zip = 'ZIP Code is required.';
        if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card Number is required.';
        if (!formData.expiry.trim()) newErrors.expiry = 'Expiry Date is required.';
        if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required.';

        // Ensure productIds are present
        if (!formData.productIds || formData.productIds.length === 0) {
            newErrors.productIds = 'No products selected for purchase. Please go back to your cart.';
        }

        // Rule 2: Check for specific formats
        if (formData.zip && !/^\d{5}$/.test(formData.zip)) {
            newErrors.zip = 'ZIP Code must be 5 digits.';
        }
        if (formData.cardNumber && !/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ''))) { // Allow spaces, common for card numbers
            newErrors.cardNumber = 'Card Number must be between 13 and 19 digits.';
        }
        if (formData.expiry && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
            newErrors.expiry = 'Expiry Date must be in MM/YY format.';
        } else if (formData.expiry) {
            // Further expiry date validation: check if it's in the future
            const [month, year] = formData.expiry.split('/').map(Number);
            const currentYear = new Date().getFullYear() % 100; // Get last two digits
            const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed

            if (year < currentYear || (year === currentYear && month < currentMonth)) {
                newErrors.expiry = 'Expiry Date cannot be in the past.';
            }
        }
        if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) { // CVV can be 3 or 4 digits
            newErrors.cvv = 'CVV must be 3 or 4 digits.';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            if (!userId) {
                alert("You must be logged in to make a purchase.");
                return;
            }
            if (formData.productIds.length === 0) {
                alert("No products found to purchase. Please go back to your cart.");
                navigate('/addtocart'); 
                return;
            }


            
            axios.post(`http://localhost:5000/processCheckoutUser`, formData)
                .then((result) => {
                    console.log("Checkout successful:", result.data);
                    alert("Order Placed Successfully!");
                    navigate('/Buydetails'); 
                })
                .catch((error) => {
                    console.error("Error placing order:", error);
                    alert("Error placing order. Please try again. " + (error.response?.data?.message || error.message)); // More user-friendly error
                });
        }
    };

    return (
        <div className="buy-now-container">
            <div className="checkout-card">
                <div className="checkout-header">
                    <h2 className="header-title">Secure Checkout</h2>
                    <p className="header-subtitle">Complete your purchase</p>
                </div>

                <form className="checkout-form" onSubmit={handleSubmit} noValidate>
                    {/* --- Shipping Information Section --- */}
                    <div className="form-section">
                        <h4 className="section-title">Shipping Information</h4>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                className="form-input"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                            {errors.fullName && <p className="error-text">{errors.fullName}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Shipping Address</label>
                            <input
                                type="text"
                                id="address"
                                className="form-input"
                                placeholder="123 Main Street"
                                value={formData.address}
                                onChange={handleChange}
                            />
                            {errors.address && <p className="error-text">{errors.address}</p>}
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    className="form-input"
                                    placeholder="Anytown"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                                {errors.city && <p className="error-text">{errors.city}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="zip">ZIP Code</label>
                                <input
                                    type="text"
                                    id="zip"
                                    className="form-input"
                                    placeholder="12345"
                                    value={formData.zip}
                                    onChange={handleChange}
                                />
                                {errors.zip && <p className="error-text">{errors.zip}</p>}
                            </div>
                        </div>
                    </div>
                    
                    {/* Display general productIds error if any */}
                    {errors.productIds && <p className="error-text">{errors.productIds}</p>}


                    <div className="form-section">
                        <h4 className="section-title">Payment Details</h4>
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input
                                type="text"
                                id="cardNumber"
                                className="form-input"
                                placeholder="**** **** **** ****"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                maxLength="19" // Max length for visual input, actual validation is more robust
                            />
                            {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="expiry">Expiry Date (MM/YY)</label>
                                <input
                                    type="text"
                                    id="expiry"
                                    className="form-input"
                                    placeholder="MM/YY"
                                    value={formData.expiry}
                                    onChange={handleChange}
                                    maxLength="5" // MM/YY
                                />
                                {errors.expiry && <p className="error-text">{errors.expiry}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input
                                    type="text"
                                    id="cvv"
                                    className="form-input"
                                    placeholder="123"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                    maxLength="4" // CVV can be 3 or 4 digits
                                />
                                {errors.cvv && <p className="error-text">{errors.cvv}</p>}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">
                        Place Order
                    </button>
                </form>

                <div className="back-to-shop">
                    <Link to="/">or Continue Shopping</Link>
                </div>
            </div>
        </div>
    );
};

export default BuyTotalProduct;