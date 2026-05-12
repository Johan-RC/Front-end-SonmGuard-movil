import { useState } from 'react';
import { authService } from '@/features/auth/services/auth.service';
import { RegisterErrors, RegisterForm } from '@/features/auth/types/auth.types';
import { hasMinLength, isRequired, isValidColombianPhone, isValidEmail, onlyDigits } from '@/shared/utils/validation';

const initialForm: RegisterForm = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phone: '' };

function validate(form: RegisterForm): RegisterErrors {
  const errors: RegisterErrors = {};
  if (!isRequired(form.firstName)) errors.firstName = 'El nombre es obligatorio.';
  if (!isRequired(form.lastName)) errors.lastName = 'Los apellidos son obligatorios.';
  if (!isRequired(form.email)) errors.email = 'El correo es obligatorio.';
  else if (!isValidEmail(form.email)) errors.email = 'Correo electronico invalido.';
  if (!isRequired(form.password)) errors.password = 'La contrasena es obligatoria.';
  else if (!hasMinLength(form.password, 6)) errors.password = 'Minimo 6 caracteres.';
  if (!isRequired(form.confirmPassword)) errors.confirmPassword = 'Confirma tu contrasena.';
  else if (form.password !== form.confirmPassword) errors.confirmPassword = 'Las contrasenas no coinciden.';
  if (!isRequired(form.phone)) errors.phone = 'El telefono es obligatorio.';
  else if (!isValidColombianPhone(form.phone)) errors.phone = 'Ingresa 10 digitos despues de +57.';
  return errors;
}

export function useRegisterForm(onSuccess: () => void) {
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof RegisterForm>(field: K, value: RegisterForm[K]) {
    const nextValue = field === 'phone' ? onlyDigits(value).slice(0, 10) : value;
    setForm((current) => ({ ...current, [field]: nextValue }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function submit() {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      setIsSubmitting(true);
      await authService.register(form);
      onSuccess();
    } catch (error) {
      setErrors({ email: error instanceof Error ? error.message : 'No se pudo registrar el usuario.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return { form, errors, isSubmitting, updateField, submit };
}