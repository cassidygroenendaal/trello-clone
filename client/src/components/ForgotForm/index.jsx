// ----------------- Dependencies ------------------

import React, { useState, useContext } from 'react';

// ----------------- Other Dependencies ------------------

import { StatusContext } from '../../contexts/StatusContext';
import API from '../../lib/API';

// ----------------- Stylesheet ------------------

// import './style.css';

// ----------------- Components ------------------

import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';

// ----------------- ForgotForm ------------------

const ForgotForm = () => {
  const status = useContext(StatusContext);

  const [email, setEmail] = useState(''),
    [mailSent, setMailSent] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    if (email === '') {
      status.setError('Email cannot be blank.')();
      status.setCode(400)();
    } else {
      API.User
        .forgot(email)
        .then((response) => {
          if (response.data.status === 200) {
            status.setCode(200)();
            status.setSuccess('Password Reset Email successfully sent!')();
            setMailSent(true);
          } else {
            setMailSent(false);
            status.setError(response.data.message)();
            status.setCode(response.data.status)();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      {status.state.code !== 200 && (
        <div>
          <p>{status.state.error}</p>
        </div>
      )}

      {!mailSent && (
        <form>
          <InputGroup
            name="email"
            label="Email"
            type="email"
            placeholder="raduser420@hotmail.net"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button value="Get Reset Token" onClick={submitForm} />
        </form>
      )}

      {mailSent && (
        <div>
          <h3>{status.state.success}</h3>
        </div>
      )}
    </div>
  );
};

export default ForgotForm;