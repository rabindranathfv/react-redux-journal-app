import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, easing, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';

const formValidations = {
  email: [ (value) => value.includes("@"), 'the email should have an @'],
  password: [ (value) => value.length >= 5, 'the password should have more than 5 characters'],
  fullname: [ (value) => value.length >=1 , 'your full name is mandatory' ]
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setformSubmitted] = useState(false)
  const {fullname, email, password, onInputChange,
   formState, isFormValid, fullnameValid, emailValid, passwordValid} = useForm({
    fullname: '',
    email: '',
    password: ''
  }, formValidations);

  const handleSubmit = (e) => {
    e.preventDefault();
    setformSubmitted(true);
    console.log( formState)
  }

  return (
    <AuthLayout title="Crear cuenta">
      <h2>{ isFormValid ? 'valido': 'cagaste'}</h2>
      <form onSubmit={handleSubmit}>
          <Grid container>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField
                label="Nombre completo"
                type="text"
                placeholder='Nombre completo'
                fullWidth
                name="fullname"
                onChange={onInputChange}
                value={fullname}
                error={ !!fullnameValid && formSubmitted }
                helperText={ fullnameValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder='correo@google.com'
                fullWidth
                name="email"
                onChange={onInputChange}
                value={email}
                error={ !!emailValid && formSubmitted }
                helperText={ emailValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder='Contraseña'
                fullWidth
                name="password"
                onChange={onInputChange}
                value={password}
                error={ !!passwordValid && formSubmitted }
                helperText={ passwordValid }
              />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button type='submit' disabled={!isFormValid} variant='contained' fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
