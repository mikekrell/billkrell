
import { createClient } from 'contentful';

export const CONTENT_TYPE_EQUIPMENT = 'equipment';

const Space = process.env.CONTENTFUL_SPACE;
const Token = process.env.CONTENTFUL_TOKEN;

export class ContentfulService {
    client = createClient({
        space: Space,
        accessToken: Token
    });

    async fetchEquipment() {
        return await this.client.getEntries({
            content_type: CONTENT_TYPE_EQUIPMENT
        });
    }

}
