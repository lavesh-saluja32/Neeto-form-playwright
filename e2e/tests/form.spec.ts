import { test } from "@fixtures";
import { expect, type Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { FORM_PUBLISHED_SELECTORS, FORM_BUILDER_SELECTORS } from "@selectors";
import {
  COMMON_FORM_TEST_DATA,
  CUSTOMIZE_FORM_FIELDS,
  DEFAULT_FORM_FIELDS,
  FORM_BUILDER_FIELD_LABELS,
  FORM_VALIDATION_MESSAGES,
} from "@texts";

test.describe("Form page", () => {
  let formName: string;
  test.afterEach(async ({ page, formPage }) => {
    // clean up delete form
    await test.step("Delete and verify form", async () => {
      await formPage.deleteFormAndVerify(formName);
    });
  });

  test.beforeEach(async ({ page }) => {
    await test.step("1. Navigate to home", async () => {
      await page.goto("/");
    });
    formName = faker.word.words({ count: 3 });
  });
  test("should create and submit a form", async ({ page, formPage }) => {
    await test.step("2. Create a new form", async () => {
      await formPage.createForm({
        formFields: DEFAULT_FORM_FIELDS,
        formName: formName,
      });
    });

    let page2: Page;

    await test.step("3. Visit published form (preview in new tab)", async () => {
      page2 = await formPage.openPublishPreviewInNewTab();
    });

    await test.step("4. Verify all fields are present on the submission page", async () => {
      await expect(
        page2.getByTestId(FORM_PUBLISHED_SELECTORS.emailGroup),
      ).toBeVisible();
      await expect(
        page2.getByTestId(FORM_PUBLISHED_SELECTORS.fullNameGroup),
      ).toBeVisible();
      await expect(
        page2.getByTestId(FORM_PUBLISHED_SELECTORS.phoneGroup),
      ).toBeVisible();
    });

    await test.step("5. Verify form shows validation when submitted without required fields", async () => {
      await page2
        .getByTestId(FORM_PUBLISHED_SELECTORS.startOrSubmitButton)
        .click();
      await expect(
        page2.getByText(FORM_VALIDATION_MESSAGES.emailRequired),
      ).toBeVisible();
    });

    await test.step("6. Verify invalid email and phone number show validation messages", async () => {
      await page2
        .getByTestId(FORM_PUBLISHED_SELECTORS.emailTextField)
        .fill(COMMON_FORM_TEST_DATA.invalidEmailInput);
      await page2.getByTestId(FORM_PUBLISHED_SELECTORS.previewCard).click();
      await expect(
        page2.getByText(FORM_VALIDATION_MESSAGES.emailInvalid),
      ).toBeVisible();

      await page2
        .getByTestId(FORM_PUBLISHED_SELECTORS.phoneNumberInputField)
        .fill(COMMON_FORM_TEST_DATA.invalidPhoneShort);
      await page2.getByTestId(FORM_PUBLISHED_SELECTORS.previewCard).click();
      await expect(
        page2.getByText(FORM_VALIDATION_MESSAGES.phoneInvalid),
      ).toBeVisible();
    });

    await test.step("7. Fill all fields with valid data", async () => {
      await page2
        .getByTestId(FORM_PUBLISHED_SELECTORS.emailTextField)
        .fill(COMMON_FORM_TEST_DATA.validEmail);
      await page2
        .getByTestId(FORM_PUBLISHED_SELECTORS.firstNameTextField)
        .fill(COMMON_FORM_TEST_DATA.firstName);
      await page2
        .getByTestId(FORM_PUBLISHED_SELECTORS.lastNameTextField)
        .fill(COMMON_FORM_TEST_DATA.lastName);
      await page2
        .getByTestId(FORM_PUBLISHED_SELECTORS.phoneNumberInputField)
        .fill(COMMON_FORM_TEST_DATA.validPhone);
    });

    await test.step("8. Submit the form", async () => {
      await page2
        .getByTestId(FORM_PUBLISHED_SELECTORS.startOrSubmitButton)
        .click();
    });

    await test.step("9. Verify thank you message", async () => {
      await page2
        .getByTestId(FORM_PUBLISHED_SELECTORS.thankYouPageMessage)
        .click();
    });

    await test.step("10. Verify submission appears in submissions tab", async () => {
      await page.getByTestId(FORM_BUILDER_SELECTORS.submissionsTab).click();
      await expect(
        page.getByTestId(FORM_BUILDER_SELECTORS.submittedResponse1),
      ).toBeVisible();
    });
  });


  test("should customize form's field elements", async ({ page, formPage }) => {
    await test.step("2. Create form with choice fields and builder customizations", async () => {
      await formPage.createForm({
        formFields: CUSTOMIZE_FORM_FIELDS,
        formName,
        publish: false,
      });
      await page
        .getByRole("button", { name: FORM_BUILDER_FIELD_LABELS.question })
        .nth(1)
        .click();
      await page.getByTestId(FORM_BUILDER_SELECTORS.addOptionLink).click();
      await page
        .getByTestId(FORM_BUILDER_SELECTORS.randomizeSwitchLabel)
        .click();
      await page
        .getByRole("button", { name: FORM_BUILDER_FIELD_LABELS.question })
        .nth(2)
        .click();
      await page.getByTestId(FORM_BUILDER_SELECTORS.addOptionLink).click();
      await page
        .getByTestId(FORM_BUILDER_SELECTORS.hideQuestionToggleLabel)
        .click();
      await formPage.publishForm();
    });

    const previewPage = await test.step("3. Open publish preview", () =>
      formPage.openPublishPreviewInNewTab(),
    );

    await test.step("4. Verify single choice options order changes after reload (randomized)", async () => {
      const optionsBefore = await previewPage
        .getByTestId(FORM_PUBLISHED_SELECTORS.singleChoiceOptionsContainer)
        .allInnerTexts();
      await previewPage.reload();
      const optionsAfter = await previewPage
        .getByTestId(FORM_PUBLISHED_SELECTORS.singleChoiceOptionsContainer)
        .allInnerTexts();
      expect(optionsBefore).not.toEqual(optionsAfter);
    });

    await test.step("5. Verify hidden question is not shown on preview", async () => {
      await expect(
        previewPage.getByTestId(FORM_PUBLISHED_SELECTORS.formGroupQuestion).nth(2),
      ).toBeHidden();
    });

    await test.step("6. Reveal hidden question, republish, and verify it appears", async () => {
      await page
        .getByRole("button", { name: FORM_BUILDER_FIELD_LABELS.question })
        .nth(2)
        .click();
      await page
        .getByTestId(FORM_BUILDER_SELECTORS.hideQuestionToggleLabel)
        .click();
      await formPage.publishForm();
      await previewPage.reload();
      await previewPage.reload();
      await expect(
        previewPage.getByTestId(FORM_PUBLISHED_SELECTORS.formGroupQuestion).nth(2),
      ).toBeVisible();
    });
  });
});
