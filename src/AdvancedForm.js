// src/AdvancedForm.js

import React, { useRef, useState } from 'react';

const AdvancedForm = () => {
  // Step 1: Dynamic Form Input Focus
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleFocus = (ref) => {
    ref.current.focus();
  };

  // Step 2: Real-time Input Validation
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateInput = (ref, type) => {
    const value = ref.current.value;

    switch (type) {
      case 'name':
        setNameError(value.length < 3 ? 'Name must be at least 3 characters' : '');
        break;
      case 'email':
        setEmailError(!/\S+@\S+\.\S+/.test(value) ? 'Invalid email format' : '');
        break;
      case 'password':
        setPasswordError(value.length < 6 ? 'Password must be at least 6 characters' : '');
        break;
      default:
        break;
    }
  };

  // Step 3: Custom Form Submission Handling
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Custom validation before submission
    if (nameError || emailError || passwordError) {
      alert('Please fix validation errors before submitting the form.');
      return;
    }

    // Collecting form data using useRef
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');

    // Clear the form fields after submission
    nameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Advanced Form with useRef</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Step 1: Dynamic Form Input Focus */}
        <div style={{ marginBottom: '15px' }}>
          <label>
            Name:
            <input
              ref={nameRef}
              type="text"
              placeholder="Enter your name"
              onChange={() => validateInput(nameRef, 'name')}
              onClick={() => handleFocus(nameRef)}
            />
          </label>
          {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Email:
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter your email"
              onChange={() => validateInput(emailRef, 'email')}
              onClick={() => handleFocus(emailRef)}
            />
          </label>
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Password:
            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter your password"
              onChange={() => validateInput(passwordRef, 'password')}
              onClick={() => handleFocus(passwordRef)}
            />
          </label>
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>

        {/* Step 3: Custom Form Submission Handling */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdvancedForm;
