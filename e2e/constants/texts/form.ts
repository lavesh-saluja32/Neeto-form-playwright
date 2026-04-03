export const FORM_VALIDATION_MESSAGES = {
  emailRequired: "Email is required",
  emailInvalid: "Email is invalid",
  phoneInvalid: "Phone number is invalid",
} as const;

export const FORM_BUILDER_FIELD_LABELS = {
  name: "Name",
  phoneNumber: "Phone number",
  singleChoice: "Single choice",
  multipleChoice: "Multiple choice",
  question: "Question",
} as const;

export const DEFAULT_FORM_FIELDS: string[] = [
  FORM_BUILDER_FIELD_LABELS.name,
  FORM_BUILDER_FIELD_LABELS.phoneNumber,
];

/** Fields for the customize-elements scenario (randomize / hide question). */
export const CUSTOMIZE_FORM_FIELDS: string[] = [
  FORM_BUILDER_FIELD_LABELS.singleChoice,
  FORM_BUILDER_FIELD_LABELS.multipleChoice,
];
