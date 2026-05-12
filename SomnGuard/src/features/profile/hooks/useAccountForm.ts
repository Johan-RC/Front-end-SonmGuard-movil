import { useState } from 'react';
import { profileService } from '@/features/profile/services/profile.service';
import type { AccountErrors, AccountForm } from '@/features/profile/types/profile.types';
import { hasMinLength, isRequired, isValidColombianPhone, isValidEmail, onlyDigits } from '@/shared/utils/validation';

const initialProfile = profileService.getProfile();
const initialForm: AccountForm = {
  name: initialProfile.name,
  email: initialProfile.email,
  phone: initialProfile.phone,
  birthDate: initialProfile.birthDate,
};

function validate(form: AccountForm): AccountErrors {
  const errors: AccountErrors = {};
  if (!isRequired(form.name)) errors.name = 'El nombre completo es obligatorio.';
  if (!isRequired(form.email)) errors.email = 'El correo es obligatorio.';
  else if (!isValidEmail(form.email)) errors.email = 'Ingresa un correo válido.';
  if (!isRequired(form.phone)) errors.phone = 'El teléfono es obligatorio.';
  else if (!isValidColombianPhone(form.phone)) errors.phone = 'Ingresa 10 dígitos después de +57.';
  if (!isRequired(form.birthDate)) errors.birthDate = 'La fecha de nacimiento es obligatoria.';
  return errors;
}

export function useAccountForm(onSuccess: (form: AccountForm) => void) {
  const [form, setForm] = useState<AccountForm>(initialForm);
  const [errors, setErrors] = useState<AccountErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof AccountForm>(field: K, value: AccountForm[K]) {
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
      const updated = await profileService.updateAccount(form);
      onSuccess(updated);
    } catch (error) {
      setErrors({ email: error instanceof Error ? error.message : 'No se pudo actualizar la cuenta.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return { form, errors, isSubmitting, updateField, submit };
}
