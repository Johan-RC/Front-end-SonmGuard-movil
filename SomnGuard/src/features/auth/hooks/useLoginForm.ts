import { useState } from 'react';
import { authService } from '@/features/auth/services/auth.service';
import { LoginErrors, LoginForm } from '@/features/auth/types/auth.types';
import { isRequired, isValidEmail } from '@/shared/utils/validation';

const initialForm: LoginForm = { email: '', password: '' };

function validate(form: LoginForm): LoginErrors {
  const errors: LoginErrors = {};
  if (!isRequired(form.email)) errors.email = 'El correo es obligatorio.';
  else if (!isValidEmail(form.email)) errors.email = 'Ingresa un correo valido.';
  if (!isRequired(form.password)) errors.password = 'La contrasena es obligatoria.';
  return errors;
}

export function useLoginForm(onSuccess: () => void) {
  const [form, setForm] = useState<LoginForm>(initialForm);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof LoginForm>(field: K, value: LoginForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, general: undefined }));
  }

  async function submit() {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      setIsSubmitting(true);
      await authService.login(form);
      onSuccess();
    } catch (error) {
      setErrors({ general: error instanceof Error ? error.message : 'No se pudo iniciar sesion.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return { form, errors, isSubmitting, updateField, submit };
}


