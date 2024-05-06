import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import './RegisterForm.css';

interface IRegisterForm {
    username: string;
    password: string;
    confirmPassword: string;
}

export const RegisterForm: React.FC = () => {
    const { handleSubmit, control, watch } = useForm<IRegisterForm>();
    const onSubmit: SubmitHandler<IRegisterForm> = data => console.log(data);

    return (
        <div className="register-form">
            <Typography variant="h4" component="div">
                Register
            </Typography>
            <form
                className="register-form__form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Controller
                    control={control}
                    name="username"
                    render={({ field }) => (
                        <TextField
                            label="Username"
                            onChange={field.onChange}
                            value={field.value}
                            fullWidth={true}
                            size="small"
                            margin="normal"
                            className="register-form__input"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <TextField
                            label="Password"
                            type="password"
                            onChange={field.onChange}
                            value={field.value}
                            fullWidth={true}
                            size="small"
                            margin="normal"
                            className="register-form__input"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <TextField
                            label="Confirm Password"
                            type="password"
                            onChange={field.onChange}
                            value={field.value}
                            fullWidth={true}
                            size="small"
                            margin="normal"
                            className="register-form__input"
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
                    Register
                </Button>
            </form>
        </div>
    );
};
