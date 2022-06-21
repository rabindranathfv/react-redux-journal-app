import { Link as RouterLink } from 'react-router-dom';
import { Button, easing, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';


export const RegisterPage = () => {

  const dispatch = useDispatch();
  const {fullname, email, password, onInputChange, formState} = useForm({
    fullname: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log( formState)
  }

  return (
    <AuthLayout title="Crear cuenta">
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
              />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button type='submit' variant='contained' fullWidth>
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
