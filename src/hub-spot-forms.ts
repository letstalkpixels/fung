import { HttpRequest } from './http-request';
interface HubSpotFormField {
    objectTypeId: string;
    name: string;
    value: string;
}

interface FormSubmission {
    submittedAt: string;
    fields: HubSpotFormField[];
    context: {
        hutk: string;
        pageUri: string;
        pageName: string;
    };
    legalConsentOptions: {
        consent: {
            consentToProcess: boolean;
            text: string;
        };
    };
}

export class HubSpotForms {
    private buildFormSubmission(
        fields: HubSpotFormField[],
        consent: boolean,
    ): FormSubmission {
        const hutkCookie = this.getCookieValue('hubspotutk');

        return {
            submittedAt: (+new Date()).toString(),
            fields,
            context: {
                hutk: hutkCookie,
                pageUri: location.href,
                pageName: document.title,
            },
            legalConsentOptions: {
                consent: {
                    consentToProcess: consent,
                    text: 'I have read and agree with the terms and conditions and privacy statement of Fung.', // Hardcoded for Fung.
                },
            },
        };
    }

    public async sendContactForm(
        fields: HubSpotFormField[],
        consent: boolean,
    ): Promise<void> {
        const payload = this.buildFormSubmission(fields, consent);

        const response = await new HttpRequest(
            'https://api.hsforms.com/submissions/v3/integration/submit/25357114/9a96bc17-866a-447e-8851-15e6879bd405',
        ).post(payload);
    }

    public async sendSandboxForm(
        fields: HubSpotFormField[],
        consent: boolean,
    ): Promise<void> {
        const payload = this.buildFormSubmission(fields, consent);

        const response = await new HttpRequest(
            'https://api.hsforms.com/submissions/v3/integration/submit/25357114/a0d8e708-1340-4f3a-bf30-bc2075d68d73',
        ).post(payload);
    }

    private getCookieValue(name: string): string {
        return (
            document.cookie
                .match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')
                ?.pop() || ''
        );
    }
}
