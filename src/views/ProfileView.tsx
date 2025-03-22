import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";

import { useQueryClient } from "@tanstack/react-query";
import { ProfileForm, User } from "../types/TUser";
import { useUserAuthMutation } from "../hooks/Mutations/useAuthUserMutation";


export default function ProfileView() {
    const { mutate:updataUser } = useUserAuthMutation();
    const queryClient = useQueryClient();
    const data: User = queryClient.getQueryData(['getUser'])!;

    const defaultValues = {
        handle: data.handle,
        description: data.description,
        email: data.email
    };

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
        defaultValues
    });
    async function handleUserProfileForm(data: ProfileForm) {
        updataUser(data);
    }
    return (
        <form
            className="bg-white p-5 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Handle o Nombre de Usuario"
                    {...register('handle', {
                        required: "El Handle es obligatorio"
                    })}
                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register('description', {
                        required: "La Descripción es obligatorio"
                    })}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={() => { }}
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}