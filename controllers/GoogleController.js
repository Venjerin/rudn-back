import {Auth, google} from 'googleapis';

class GoogleServiece {
    constructor() {
        this.oauthClient = null;
    }

    async init() {
        const clientId = '96875601024-h4j0momk2kd5u2bkmg9hk4rhf4lraqdd.apps.googleusercontent.com';
        const clientSecret = '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';
        const redirect_url = 'http://localhost:3000/oauth-callback-google';    
        this.oauthClient = new google.auth.OAuth2(clientId, clientSecret, redirect_url);
    }

    async loginGoogleUser (code) {
        try {
            const { tokens } = await this.oauthClient.getToken(code);
            const user = await this.oauthClient.verifyIdToken({
                idToken: tokens.id_token || '',
                audience: '96875601024-h4j0momk2kd5u2bkmg9hk4rhf4lraqdd.apps.googleusercontent.com'
            })
            const currentUser = user.getPayload();
            if(!currentUser){
                throw new Error("User not found")
            }
            return {
                email: currentUser.email,
                avatar_url: currentUser.picture,
                name: currentUser.name
            }
        } catch (error) {
            console.log("Error in loginGoogleUser:", error);
            throw new Error ('Failed to authenticate with Google')
        }
    }
}

export const googleService = new GoogleServiece()