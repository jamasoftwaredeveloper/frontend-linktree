import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../../services/auth/AuthService";
import { toast } from "sonner";

const { updateUser } = AuthService(); // Extraemos updateUser

export const useUserAuthMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUser, // La función que realiza la mutación
    onError: (error) => {
      console.error("Error al actualizar perfil:", error);
      toast.error("Error al actualizar perfil. Inténtalo de nuevo.");
    },
    onSuccess: () => {      
      // 🔄 Refresca la información del usuario en caché
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    },
  });

  return mutation;
};
