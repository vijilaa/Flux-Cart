import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BuyNow.css';

const BuyTotalProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = localStorage.getItem('UserId');

    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        UserId: userId || '',
        productIds: [],
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (location.state?.productIds) {
            setFormData(prev => ({ ...prev, productIds: location.state.productIds }));
        } else {
            setErrors(prev => ({ ...prev, productIds: 'No products found for checkout.' }));
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        let val = value;

        if (id === 'fullName') val = value.replace(/[^a-zA-Z\s]/g, '');
        if (['zip', 'cardNumber', 'cvv'].includes(id)) val = value.replace(/\D/g, '');

        setFormData(prev => ({ ...prev, [id]: val }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
        if (!formData.address) newErrors.address = 'Address is required.';
        if (!formData.city) newErrors.city = 'City is required.';
        if (!/^\d{6}$/.test(formData.zip)) newErrors.zip = 'ZIP Code must be 6 digits.';
        if (!/^\d{13,19}$/.test(formData.cardNumber)) newErrors.cardNumber = 'Card Number must be 13–19 digits.';
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
            newErrors.expiry = 'Expiry must be in MM/YY format.';
        } else {
            const [month, year] = formData.expiry.split('/').map(Number);
            const now = new Date();
            const currentYear = now.getFullYear() % 100;
            const currentMonth = now.getMonth() + 1;
            if (year < currentYear || (year === currentYear && month < currentMonth)) {
                newErrors.expiry = 'Card is expired.';
            }
        }
        if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3 or 4 digits.';
        if (formData.productIds.length === 0) newErrors.productIds = 'No products selected.';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        try {
            await axios.post('http://localhost:5000/processCheckoutUser', formData);
            alert('Order placed successfully!');
            navigate('/Buydetails');
        } catch (err) {
            console.error(err);
            alert('Failed to place order. Please try again.');
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
                                    placeholder="123456"
                                    value={formData.zip}
                                    onChange={handleChange}
                                />
                                {errors.zip && <p className="error-text">{errors.zip}</p>}
                            </div>
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
                                maxLength="19"
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
                                    maxLength="5"
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
                                    maxLength="4"
                                />
                                {errors.cvv && <p className="error-text">{errors.cvv}</p>}
                            </div>
                        </div>
                    </div>

                    {errors.productIds && <p className="error-text text-center">{errors.productIds}</p>}

                    <button type="submit" className="submit-btn">
                        Place Order
                    </button>
                </form>

                <div className="back-to-shop">
                    <Link to="/home">← Continue Shopping</Link>
                </div>
            </div>
        </div>
    );
};

export default BuyTotalProduct;
