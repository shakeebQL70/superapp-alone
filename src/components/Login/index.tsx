import React from 'react'
import { Typography, Box } from '@mui/material'
import { useForm } from "react-hook-form";
import { FieldInput } from "UI/input";
import { inputsType } from "UI/utils";
import {CustomButton} from 'UI/button'
import { useUserStore } from 'SUPER/store'
import './login.scss'

const defaultValues = {
  email: '',
  password: '',
}

const Login = () => {
  const {
    watch,
    control,
    register,
    handleSubmit,getValues,
    formState: { errors },
  } = useForm<typeof defaultValues>({ defaultValues, mode:'onBlur' });
  
  const onLogin = useUserStore((state: any) => state.login)
  const isLoading = useUserStore((state: any) => state.isLoading)


  return (
    <div className="login-page">
          <div className="form">
            <Typography
              color="rgba(50, 71, 92, 0.87)"
              fontSize="1rem"
              lineHeight="1.5"
              my="10px"
              textAlign='center'
            >
              Welcome to 
              <Typography component='span' color='#3873e8'> Edique! </Typography> 👋🏻
            </Typography>
            <Typography
              color="rgba(50, 71, 92, 0.6)"
              fontSize="1rem"
              lineHeight="1.5"
              mb={3}
              textAlign='center'
            >
              Please sign-in to your account and start!
            </Typography>
            <form className="login-form" 
              onSubmit={handleSubmit((data) => {
                onLogin(data);
              })}
            >
              <FieldInput
                  type={inputsType.TEXT}
                  fullWidth
                  label="Username*"
                  placeholder="Enter your username or email"
                  isError={!!errors.email?.message}
                  control={control}
                  register={register}
                  helperText={errors?.email?.message}
                  registerWith={'email'}
                  isRequired={true}
              />
              <FieldInput
                  type={inputsType.PASSWORD}
                  fullWidth
                  label="Password*"
                  placeholder="Enter your password"
                  isError={!!errors.password?.message}
                  control={control}
                  register={register}
                  helperText={errors?.password?.message}
                  registerWith={'password'}
                  isRequired={true}
              />
              <Box display="flex" alignItems='center' justifyContent='center' >
                <CustomButton variant="contained" type="submit" color="primary" fullWidth disabled={isLoading}>
                    {isLoading ? 'Logging in....' : 'Login'}
                </CustomButton>
              </Box>
            </form>
          </div>
    </div>
  )
}

export default Login