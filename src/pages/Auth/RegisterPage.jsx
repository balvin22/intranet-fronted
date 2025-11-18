import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// 1. Importa los componentes de UI que acabamos de crear
import GuestLayout from '../../components/layout/GuestLayout';
import InputError from '../../components/UI/InputError';
import InputLabel from '../../components/UI/InputLabel';
import PrimaryButton from '../../components/UI/PrimaryButton';
import TextInput from '../../components/UI/TextInput';

// 2. Define la URL de la API
const API_REGISTER_URL = 'http://localhost:8001/api/users';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const navigate = useNavigate();

    // 4. Nueva función de Submit con Axios
    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            await axios.post(API_REGISTER_URL, {
                name_user: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,

                // --- CAMPOS FALTANTES ---
                // last_name_user: '...valor...'
                // number_document: '...valor...'
                // company_id: 1,
                // regional_id: 1,
                // position_id: 1,
                // role_name: 'Asesor'
            });

            // Si el registro es exitoso, redirige al login
            navigate('/login');

        } catch (err) {
            if (err.response && err.response.status === 422) {
                // Error de validación del backend
                setErrors(err.response.data.errors);
            } else {
                // Otro tipo de error
                setErrors({ general: 'Ocurrió un error al registrar.' });
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <GuestLayout>
            <form onSubmit={submit} className="w-full max-w-md p-8 mx-auto">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <InputError message={errors.name_user} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={passwordConfirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    {/* 6. 'Link' de Inertia reemplazado por 'Link' de react-router-dom */}
                    <Link
                        to="/login"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}