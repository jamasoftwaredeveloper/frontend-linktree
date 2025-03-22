import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { LoginForm } from "../../types/TUser";
import ErrorMessage from "../../components/ErrorMessage";
import { AuthService } from "../../services/auth/AuthService";
import { useNavigate } from "react-router-dom";


export default function LoginView() {
    const navigate = useNavigate();
    const { login } = AuthService();
    const defaultValues = {
        email: '',
        password: ''
    };
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginForm>({ defaultValues });
    async function handleLogin(data: LoginForm) {
        await login(data);
        reset();
        navigate("/admin/profile");
    }

    return (
        <>
            <h1 className="text-4xl text-white font-bold">Ingresar Sesión</h1>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="bg-white px-5 py-5 rounded-lg space-y-10 mt-10"
                noValidate
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg text-black placeholder-slate-400"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 text-black rounded-lg placeholder-slate-400"
                        {...register("password", {
                            required: "El Password es obligatorio",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Iniciar Sesión'
                />
            </form>
            <nav className="mt-10">
                <Link to={"/auth/register"} className="text-center text-white text-lg block">
                    ¿No tienes cuenta? Crea un aquí.
                </Link>
            </nav>
        </>
    )
}
