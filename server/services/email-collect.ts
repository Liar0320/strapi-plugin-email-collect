/**
 *  service
 */

import { factories } from '@strapi/strapi';
import { errors } from "@strapi/utils";

export default factories.createCoreService('plugin::email-collect.email-collect', ({ strapi }) => {
    return {
        sendWithPlugin: async (data: {
            templateReferenceId: string;
            to: string;
            payload: Record<string, any>;
        }) => {
            const { templateReferenceId, to, payload } = data;
            let result = await strapi
                .plugin("email-designer")
                .service("email")
                .sendTemplatedEmail(
                    {
                        // required
                        to: to,

                        // // optional if /config/plugins.js -> email.settings.defaultFrom is set
                        // from: 'from@example.com',

                        // // optional if /config/plugins.js -> email.settings.defaultReplyTo is set
                        // replyTo: 'reply@example.com',

                        // optional array of files
                        attachments: [],
                    },
                    {
                        // required - Ref ID defined in the template designer (won't change on import)
                        templateReferenceId: templateReferenceId,

                        // // If provided here will override the template's subject.
                        // // Can include variables like `Thank you for your order {{= USER.firstName }}!`
                        // subject: `Thank you for your order`,
                    },
                    {
                        ...(payload || {}),
                    }
                );

            if (!result) {
                throw new Error("Failed to send email:" + "No email template found with referenceId " + templateReferenceId);
            }

            if(result.rejected.length > 0) {
                throw new Error("Failed to send email:" + "Email rejected by the server");
            }

            return result;
        },
    }
});
