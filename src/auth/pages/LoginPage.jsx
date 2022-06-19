import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { checkingAuthentication, startGoogleSignIn } from '/src/store/auth/authSlice.js'

import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';


export const LoginPage = () => {

  const dispatch = useDispatch();
  const { email, password, onInputChange} = useForm({
    email: '',
    password: ''
  });

  const { status } = useSelector((state) => state.auth);
  const isAuthenticated = useMemo(() => status === 'checking', [status])

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(checkingAuthentication(email, password))
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn(email, password));
  }
  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder='correo@google.com'
                fullWidth
                name="email"
                onChange={ onInputChange}
                value={ email }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder='Contraseña'
                fullWidth
                name="password"
                onChange={ onInputChange}
                value={ password }
              />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button type="submit" disabled={isAuthenticated} variant='contained' fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button onClick={onGoogleSignIn} disabled={isAuthenticated} variant='contained' fullWidth>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>


      </form>

    </AuthLayout>
  )
}
