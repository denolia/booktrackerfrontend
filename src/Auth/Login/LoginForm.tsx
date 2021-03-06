import { Link } from 'react-router-dom';
import { LoginMode } from './enums/LoginMode';
import React, { FormEvent, useState } from 'react';
import { Redirect } from 'react-router';

interface IProps {
  mode: LoginMode;
  loggedIn: boolean;
  onSubmit: (email: string, password: string) => void;
}

export function LoginForm({ mode, onSubmit, loggedIn }: IProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(email, password);
  }

  return (
    <div
      className={
        'container-sm justify-content-center col-lg-4 col-md-8 col-sm-12'
      }
    >
      <h4>
        {mode} or{' '}
        <Link
          to={mode === LoginMode.SIGN_IN ? '/register' : '/login'}
          className="link"
        >
          {mode === LoginMode.SIGN_IN ? LoginMode.SIGN_UP : LoginMode.SIGN_IN}
        </Link>
      </h4>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputEmail">Email address</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value as string)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value as string)}
          />
        </div>

        <div className="form-group">
          <input type="submit" value={mode} className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
