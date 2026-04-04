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

/** Scratch form with no elements (e.g. insights counts from default fields only). */
export const EMPTY_FORM_FIELDS: string[] = [];

/** Expected `insights-count` text values in analytics tab assertions. */
export const FORM_INSIGHTS_COUNTS = {
  zero: "0",
  one: "1",
  two: "2",
} as const;

export const FORM_ACCESS_TEST_DATA = {
  formPassword: "123456",
} as const;
