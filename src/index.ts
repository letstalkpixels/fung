import { HubSpotForms } from './hub-spot-forms';

class FungMoney {
    constructor(private readonly hubSpotForms: HubSpotForms) {
        this.setupListeners();
    }

    private setupListeners(): void {
        const sandboxForm = document.getElementById(
            'wf-form-Get-sandbox-access',
        ) as HTMLFormElement;

        if (sandboxForm) {
            sandboxForm.addEventListener('submit', event =>
                this.onSandboxFormSubmit(event, sandboxForm),
            );
        }

        const contactForm = document.getElementById(
            'wf-form-Contactform',
        ) as HTMLFormElement;

        if (contactForm) {
            contactForm.addEventListener('submit', event =>
                this.onContactFormSubmit(event, contactForm),
            );
        }
    }

    private onSandboxFormSubmit(
        event: SubmitEvent,
        form: HTMLFormElement,
    ): void {
        console.log(form.getElementsByTagName('input'));

        this.hubSpotForms.sendSandboxForm([], true);
    }

    private onContactFormSubmit(
        event: SubmitEvent,
        form: HTMLFormElement,
    ): void {
        console.log(form.getElementsByTagName('input'));

        this.hubSpotForms.sendContactForm([], true);
    }
}

(() => {
    new FungMoney(new HubSpotForms());
})();
