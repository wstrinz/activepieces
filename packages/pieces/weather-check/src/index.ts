import { PieceAuth, createPiece } from '@activepieces/pieces-framework';
import { checkWeather } from './lib/actions/check-weather';

export const weatherCheck = createPiece({
    displayName: 'Weather Check',
    logoUrl: 'https://your-logo-url.com',
    auth: PieceAuth.None(),
    authors: [],
    actions: [checkWeather],
    triggers: [],
});
