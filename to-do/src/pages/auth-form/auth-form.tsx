import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
    useForm,
    SubmitHandler,
    Controller,
    useFormState,
} from 'react-hook-form';
import './auth-form.css';
import { loginValidation, passwordValidation } from './validation';

interface ISignInForm {
    username: string;
    password: string;
}

export const AuthForm: React.FC = () => {
    const { handleSubmit, control } = useForm<ISignInForm>();
    const { errors } = useFormState({
        control,
    });

    const onSubmit: SubmitHandler<ISignInForm> = data => console.log(data);

    return (
        <div className="auth-form">
            <Typography variant="h4" component="div">
                Login
            </Typography>
            <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                className="auth-form__subtitle"
            >
                to access
            </Typography>
            <form className="auth-form__form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="username"
                    rules={loginValidation}
                    render={({ field }) => (
                        <TextField
                            label="Username"
                            onChange={e => field.onChange(e)}
                            value={field.value}
                            fullWidth={true}
                            size="small"
                            margin="normal"
                            className="auth-form__input"
                            error={!!errors.username?.message}
                            helperText={errors?.username?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={passwordValidation}
                    render={({ field }) => (
                        <TextField
                            label="Password"
                            onChange={e => field.onChange(e)}
                            value={field.value}
                            fullWidth={true}
                            size="small"
                            margin="normal"
                            type="password"
                            className="auth-form__input"
                            error={!!errors?.password?.message}
                            helperText={errors?.password?.message}
                        />
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth={true}
                    disableElevation={true}
                    sx={{
                        marginTop: 2,
                    }}
                >
                    Enter
                </Button>
            </form>

            <div className="auth-form__footer">
                <Typography variant="subtitle1" component="span">
                    Don't have an account?{' '}
                </Typography>
                <Typography
                    variant="subtitle1"
                    component="span"
                    sx={{ color: 'green' }}
                >
                    Register
                </Typography>
            </div>
        </div>
    );
};
