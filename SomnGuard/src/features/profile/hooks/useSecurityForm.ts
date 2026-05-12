import { useState } from 'react';
import { profileService } from '@/features/profile/services/profile.service';
import type { SecurityErrors, SecurityForm } from '@/features/profile/types/profile.types';
import { hasMinLength, isRequired } from '@/shared/utils/validation';

const initialForm: SecurityForm = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  twoFactorEnabled: false,
};

function validate(form: SecurityForm): SecurityErrors {
  const errors: SecurityErrors = {};
  if (!isRequired(form.currentPassword)) errors.currentPassword = 'La contraseña actual es obligatoria.';
  if (!isRequired(form.newPassword)) errors.newPassword = 'La nueva contraseña es obligatoria.';
  else if (!hasMinLength(form.newPassword, 6)) errors.newPassword = 'Mínimo 6 caracteres.';
  if (!isRequired(form.confirmPassword)) errors.confirmPassword = 'Confirma la nueva contraseña.';
  else if (form.newPassword !== form.confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden.';
  return errors;
}

export function useSecurityForm(onSuccess: () => void) {
  const [form, setForm] = useState<SecurityForm>(initialForm);
  const [errors, setErrors] = useState<SecurityErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof SecurityForm>(field: K, value: SecurityForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function submit() {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      setIsSubmitting(true);
      await profileService.changePassword(form.currentPassword, form.newPassword, form.twoFactorEnabled);
      onSuccess();
    } catch (error) {
      setErrors({ currentPassword: error instanceof Error ? error.message : 'No se pudo actualizar la contraseña.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return { form, errors, isSubmitting, updateField, submit };
}
