export class HttpRequest {
    constructor(private readonly location: string) {}

    /**
     * Make post request.
     *
     * @param location Request location.
     *
     * @returns
     *
     * @author Niek van der Velde <niek@aimtofeel.com>
     */
    public post(body: object): Promise<Response> {
        return fetch(this.location, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
    }
}
