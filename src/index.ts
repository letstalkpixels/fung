import { HubSpotForms } from './hub-spot-forms';

class FungMoney {
    private readonly hubSpotForms: HubSpotForms;

    constructor() {
        this.hubSpotForms = new HubSpotForms();
        this.setupListeners();
    }

    private getMultiCheckValue(groupElement: HTMLElement): string {
        let combinedValue = '';

        (
            [
                ...groupElement.querySelectorAll('input[type="checkbox"]'),
            ] as HTMLInputElement[]
        ).forEach((element: HTMLInputElement): void => {
            if (element.checked) {
                const value = element.dataset.value ?? '';

                combinedValue =
                    combinedValue.length > 0
                        ? `${combinedValue};${value}`
                        : value;
            }
        });

        return combinedValue;
    }

    private setupListeners(): void {
        const sandboxForm = document.getElementById(
            'wf-form-Get-sandbox-access',
        ) as HTMLFormElement;
        if (sandboxForm) {
            sandboxForm.addEventListener('submit', event => {
                this.onSandboxFormSubmit(event, sandboxForm);
            });
        }

        const contactForm = document.getElementById(
            'wf-form-Contactform',
        ) as HTMLFormElement;
        if (contactForm) {
            contactForm.addEventListener('submit', event => {
                this.onContactFormSubmit(event, contactForm);
            });
        }
    }

    private onSandboxFormSubmit(
        event: SubmitEvent,
        form: HTMLFormElement,
    ): void {
        const firstNameInput = document.getElementById(
            'First-Name',
        ) as HTMLInputElement;
        const lastNameInput = document.getElementById(
            'Last-name',
        ) as HTMLInputElement;
        const emailInput = document.getElementById(
            'Email-Adress',
        ) as HTMLInputElement;
        const websiteInput = document.getElementById(
            'Website',
        ) as HTMLInputElement;
        const companyInput = document.getElementById(
            'Company-name',
        ) as HTMLInputElement;
        const messageInput = document.getElementById(
            'Why-are-you-getting-in-contact-with-us-2',
        ) as HTMLTextAreaElement;
        const countrySelect = document.getElementById(
            'Country',
        ) as HTMLSelectElement;
        const volumeSelect = document.getElementById(
            'Payments-volume',
        ) as HTMLSelectElement;
        const intrestsOtherInput = document.getElementById(
            'field',
        ) as HTMLSelectElement;
        const blockchainsOtherInput = document.getElementById(
            'Which-blockhain-are-you-building-on---Other',
        ) as HTMLSelectElement;
        const offeringOtherInput = document.getElementById(
            'C-5',
        ) as HTMLSelectElement;
        const consentInput = document.getElementById(
            'GDPR---Agreed',
        ) as HTMLInputElement;

        const checkboxGroups = [
            ...document.getElementsByClassName('required-checkbox-group'),
        ] as HTMLElement[];
        const interestGroup = checkboxGroups[0];
        const interestValue = this.getMultiCheckValue(interestGroup);
        const blockchainsGroup = checkboxGroups[1];
        const blockchainsValue = this.getMultiCheckValue(blockchainsGroup);
        const offeringsGroup = checkboxGroups[2];
        const offeringsValue = this.getMultiCheckValue(offeringsGroup);

        this.hubSpotForms.sendSandboxForm(
            [
                {
                    objectTypeId: '0-1',
                    name: 'firstname',
                    value: firstNameInput.value,
                },
                {
                    objectTypeId: '0-1',
                    name: 'lastname',
                    value: lastNameInput.value,
                },
                {
                    objectTypeId: '0-1',
                    name: 'email',
                    value: emailInput.value,
                },
                {
                    objectTypeId: '0-1',
                    name: 'website',
                    value: websiteInput.value,
                },
                {
                    objectTypeId: '0-1',
                    name: 'company',
                    value: companyInput.value,
                },
                {
                    objectTypeId: '0-1',
                    name: 'message',
                    value: messageInput.value,
                },
                {
                    objectTypeId: '0-1',
                    name: 'country',
                    value: countrySelect.value,
                },
                {
                    objectTypeId: '0-1',
                    name: 'payment_volume',
                    value: volumeSelect.value,
                },
                {
                    objectTypeId: '0-1',
                    name: 'business_areas_of_interests',
                    value: interestValue,
                },
                {
                    objectTypeId: '0-1',
                    name: 'business_areas_of_interests___other',
                    value: intrestsOtherInput.value,
                },
                {
                    objectTypeId: '0-1',
                    name: 'what_blockhain_are_you_building_on_',
                    value: blockchainsValue,
                },
                {
                    objectTypeId: '0-1',
                    name: 'what_blockhain_are_you_building_on____other',
                    value: blockchainsOtherInput.value,
                },
                {
                    objectTypeId: '0-1',
                    name: 'what_interests_you_the_most_about_fung_s_offering_',
                    value: offeringsValue,
                },
                {
                    objectTypeId: '0-1',
                    name: 'what_interests_you_the_most_about_fung_s_offering____other',
                    value: offeringOtherInput.value,
                },
            ],
            consentInput.checked,
        );
    }

    private onContactFormSubmit(event: Event, form: HTMLFormElement): void {
        const firstNameInput = document.getElementById(
            'First-name',
        ) as HTMLInputElement;
        const lastNameInput = document.getElementById(
            'Last-name',
        ) as HTMLInputElement;
        const emailInput = document.getElementById(
            'Email-adress',
        ) as HTMLInputElement;
        const websiteInput = document.getElementById(
            'Website',
        ) as HTMLInputElement;
        const messageInput = document.getElementById(
            'Why-are-you-getting-in-contact-with-us',
        ) as HTMLTextAreaElement;
        const consentInput = document.getElementById(
            'GDPR-Agreed',
        ) as HTMLInputElement;

        this.hubSpotForms.sendContactForm(
            [
                {
                    objectTypeId: '0-1',
                    name: 'firstname',
                    value: firstNameInput.value,
                },
                {
                    objectTypeId: '0-1',
                    name: 'lastname',
                    value: lastNameInput.value,
                },
                {
                    objectTypeId: '0-1',
                    name: 'email',
                    value: emailInput.value,
                },
                {
                    objectTypeId: '0-1',
                    name: 'website',
                    value: websiteInput.value,
                },
                {
                    objectTypeId: '0-1',
                    name: 'message',
                    value: messageInput.value,
                },
            ],
            consentInput.checked,
        );
    }
}

(() => {
    if (
        document.readyState === 'complete' ||
        document.readyState === 'interactive'
    ) {
        new FungMoney();
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            new FungMoney();
        });
    }
})();
