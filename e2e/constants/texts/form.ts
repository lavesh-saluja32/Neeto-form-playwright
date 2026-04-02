export const FORM_VALIDATION_MESSAGES = {
  emailRequired: "Email is required",
  emailInvalid: "Email is invalid",
  phoneInvalid: "Phone number is invalid",
} as const;

export const FORM_BUILDER_FIELD_LABELS = {
  name: "Name",
  phoneNumber: "Phone number",
} as const;

export const DEFAULT_FORM_FIELDS: string[] = [
  FORM_BUILDER_FIELD_LABELS.name,
  FORM_BUILDER_FIELD_LABELS.phoneNumber,
];
