import { Page, expect } from "@playwright/test";
import {
  FORM_BUILDER_SELECTORS,
  FORM_DELETE_FLOW_SELECTORS,
  FORM_LOADING_SELECTORS,
} from "@selectors";

interface FormProps {
  formFields: string[];
  formName: string;
}

export default class FormPage {
  constructor(private page: Page) {}

  createForm = async ({ formFields, formName }: FormProps) => {
    await this.page.getByTestId(FORM_BUILDER_SELECTORS.addFormButton).click();
    await this.page
      .getByTestId(FORM_BUILDER_SELECTORS.startFromScratchButton)
      .click();

    await this.page.getByTestId(FORM_BUILDER_SELECTORS.formName).click();
    await this.page
      .getByTestId(FORM_BUILDER_SELECTORS.formRename)
      .fill(formName);
    await this.page
      .getByTestId(FORM_BUILDER_SELECTORS.addElementButton)
      .click();
    for (const field of formFields) {
      await this.page.getByRole("button", { name: field }).click();
    }
    await this.page.getByTestId(FORM_BUILDER_SELECTORS.publishButton).click();
  };

  deleteFormAndVerify = async (formName: string) => {
    await this.page
      .getByTestId(FORM_DELETE_FLOW_SELECTORS.moleculesMenuButton)
      .click();
    await this.page
      .getByTestId(FORM_DELETE_FLOW_SELECTORS.deleteFormButton)
      .click();
    await this.page
      .getByTestId(FORM_DELETE_FLOW_SELECTORS.deleteArchiveAlertArchiveCheckbox)
      .check();
    await this.page
      .getByTestId(FORM_DELETE_FLOW_SELECTORS.deleteArchiveAlertDeleteButton)
      .click();
    await this.page.goto("/");
    await expect(
      this.page.getByTestId(FORM_LOADING_SELECTORS.pageLoader),
    ).toBeHidden();
    await expect(
      this.page.getByTestId(FORM_LOADING_SELECTORS.uiSpinner),
    ).toBeHidden();
    await expect(
      this.page.getByRole("button", { name: formName }),
    ).toBeHidden();
  };
}
