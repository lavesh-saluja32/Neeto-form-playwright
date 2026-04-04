export const FORM_BUILDER_SELECTORS = {
  addFormButton: "add-form-button",
  startFromScratchButton: "start-from-scratch-button",
  addElementButton: "add-element-button",
  addOptionLink: "add-option-link",
  randomizeSwitchLabel: "randomize-switch-label",
  hideQuestionToggleLabel: "hide-question-toggle-label",
  publishButton: "publish-button",
  publishPreviewButton: "publish-preview-button",
  submissionsTab: "submissions-tab",
  submittedResponse1: "submitted-response-1",
  paneCloseButton: "pane-close-button",
  formName: "form-title",
  formRename: "form-rename-text-field",
} as const;

export const FORM_DELETE_FLOW_SELECTORS = {
  moleculesMenuButton: "neeto-molecules-menu-button",
  deleteFormButton: "form-delete-button",
  deleteArchiveAlertArchiveCheckbox: "delete-archive-alert-archive-checkbox",
  deleteArchiveAlertDeleteButton: "delete-archive-alert-delete-button",
} as const;

export const FORM_LOADING_SELECTORS = {
  pageLoader: "neeto-molecules-pageloader",
  uiSpinner: "neeto-ui-spinner",
} as const;

export const FORM_INSIGHTS_SELECTORS = {
  analyticsTab: "analytics-tab",
  visitsMetric: "visits-metric",
  startsMetric: "starts-metric",
  submissionsMetric: "submissions-metric",
  insightsCount: "insights-count",
} as const;

export const FORM_UNIQUE_SUBMISSION_SETTINGS_SELECTORS = {
  uniqueSubmissionSettingsLink: "unique-submission-settings-link",
  cookieTrackRadioItem: "cookie-track-radio-item",
} as const;

export const FORM_ACCESS_SETTINGS_SELECTORS = {
  settingsTab: "settings-tab",
  accessControlSettingsLink: "access-control-settings-link",
  accessControlPasswordProtectedRadioInput:
    "access-control-password-protected-radio-input",
  passwordInputField: "password-input-field",
  saveChangesButton: "save-changes-button",
  passwordTextField: "password-text-field",
  continueButton: "continue-button",
} as const;

export const FORM_PUBLISHED_SELECTORS = {
  emailGroup: "email-group",
  fullNameGroup: "full-name-group",
  phoneGroup: "phone-group",
  startOrSubmitButton: "start-or-submit-button",
  emailTextField: "email-text-field",
  previewCard: "preview-card",
  phoneNumberInputField: "phone-number-input-field",
  firstNameTextField: "first-name-text-field",
  lastNameTextField: "last-name-text-field",
  thankYouPageMessage: "thank-you-page-message",
  thankYouPageContent: "thank-you-page-content",
  alreadySubmittedMessage: "already-submitted-message",
  singleChoiceOptionsContainer: "single-choice-options-container",
  formGroupQuestion: "form-group-question",
} as const;
