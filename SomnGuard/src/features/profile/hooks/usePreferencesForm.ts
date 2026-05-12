import { useState } from 'react';
import { profileService } from '@/features/profile/services/profile.service';
import type { PreferencesForm } from '@/features/profile/types/profile.types';

const initialForm: PreferencesForm = {
  theme: 'Oscuro',
  language: 'Español',
  units: 'Métrico',
  soundsEnabled: true,
};

export function usePreferencesForm(onSuccess: () => void) {
  const [form, setForm] = useState<PreferencesForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof PreferencesForm>(field: K, value: PreferencesForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit() {
    try {
      setIsSubmitting(true);
      await profileService.savePreferences(form);
      onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  }

  return { form, isSubmitting, updateField, submit };
}
