'use client';

import { useState } from 'react';

// SETUP: Replace YOUR_FORM_ID with your actual Formspree form ID
// 1. Go to https://formspree.com
// 2. Create a new form and set endpoint to hello@motkan.ai
// 3. Copy the form ID (format: f/xxxxxxx)
// 4. Paste it below: 'https://formspree.io/f/YOUR_FORM_ID'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target);
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setSubmitted(true);
        e.target.reset();
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to submit. Please try again or email hello@motkan.ai');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      {submitted ? (
        <div className="form-success">
          <h3>Thanks! We'll be in touch.</h3>
          <p>Check your email for next steps. We'll book your strategy call within 24 hours.</p>
        </div>
      ) : (
        <>
          <div className="form-row">
            <input type="text" name="name" placeholder="Your name" required />
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <div className="form-row">
            <input type="tel" name="phone" placeholder="Phone" required />
            <input type="text" name="company" placeholder="Agency / Team name" required />
          </div>
          <textarea
            name="message"
            placeholder="Tell us about your team and what you're looking to solve (optional)"
            rows="4"
          ></textarea>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn primary lg" disabled={loading}>
            {loading ? 'Sending...' : 'Book a strategy call →'}
          </button>
          <p className="form-fine">No obligation · No tech setup required · See ROI before you decide</p>
        </>
      )}
    </form>
  );
}
