import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './BuyNow.css'; // Your existing CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BuyNow = () => {
   const navigate = useNavigate()
    const userId = localStorage.getItem('UserId');
    const location = useLocation(); // Get the location object
    const { id } = useParams()
    // State to hold the form data
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        UserId: userId,
        productIds: id, // Initialize with an empty array for the product IDs
        quantity: ""
    });

    // State to hold validation errors
    const [errors, setErrors] = useState({});

    // On component mount, get the productIds from the location state
    useEffect(() => {
        if (location.state && location.state.productIds) {
            setFormData(prev => ({ ...prev, productIds: location.state.productIds }));
        }
    }, [location.state]);


    // A single handler to update form data based on input name
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev,  [id]: id === 'quantity' ? parseInt(value, 10): value }));
    };

    // Function to validate the form data
    const validateForm = () => {
        const newErrors = {};

        // Rule 1: Check for empty fields
        if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
        if (!formData.address) newErrors.address = 'Shipping Address is required.';
        if (!formData.city) newErrors.city = 'City is required.';

        // Rule 2: Check for specific formats (simple examples)
        if (!/^\d{5}$/.test(formData.zip)) {
            newErrors.zip = 'ZIP Code must be 5 digits.';
        }
        if (!/^\d{16}$/.test(formData.cardNumber)) {
            newErrors.cardNumber = 'Card Number must be 16 digits.';
        }
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
            newErrors.expiry = 'Expiry Date must be in MM/YY format.';
        }
        if (!/^\d{3}$/.test(formData.cvv)) {
            newErrors.cvv = 'CVV must be 3 digits.';
        }
           if (!formData.quantity || formData.quantity <= 0) {
            newErrors.quantity = 'Quantity must be at least 1.';
        }
        if (isNaN(formData.quantity)) {
            newErrors.quantity = 'Quantity must be a number.';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
 axios.put(`http://localhost:5000/BuyStock/${id}`, {UserId: userId , count:formData.quantity},
)
            .then((result) => {
                console.log(result.data);

            })
            .catch((error) => {
                console.log(error);
            });
        // Re-run validation on submit
        const validationErrors = validateForm();
        setErrors(validationErrors);

        // If there are no errors, proceed with the submission
        if (Object.keys(validationErrors).length === 0) {
            if (!userId) {
                alert("You must be logged in to make a purchase.");
                return;
            }

            axios.post(`http://localhost:5000/processcheckout/${id}`, formData)
                .then((result) => {
                    console.log(result.data);
                    alert("Order Placed!");
                    navigate('/Buydetails')
                })
                .catch((error) => {
                    console.log(error);
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
                          <div className="form-section">
                        <h4 className="section-title">Order Details</h4>
                        <div className="form-group">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                className="form-input"
                                placeholder="1"
                                min="1" // Ensure minimum quantity is 1
                                value={formData.quantity}
                                onChange={handleChange}
                            />
                            {errors.quantity && <p className="error-text">{errors.quantity}</p>}
                        </div>
                    </div>

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
                            />
                            {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="expiry">Expiry Date</label>
                                <input
                                    type="text"
                                    id="expiry"
                                    className="form-input"
                                    placeholder="MM/YY"
                                    value={formData.expiry}
                                    onChange={handleChange}
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

export default BuyNow;