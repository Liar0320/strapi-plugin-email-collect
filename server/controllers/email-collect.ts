/**
 *  controller
 */

import { factories } from "@strapi/strapi";
import { errors } from "@strapi/utils";
let { ApplicationError } = errors;

export default factories.createCoreController('plugin::email-collect.email-collect', ({ strapi }) => {
    return {
        async create(ctx) {
            const {
                email: to,
                templateReferenceId,
                payload,
            } = ((ctx.request.body as any).data as any) || {};

            if (!to) {
                return new ApplicationError("No recipient(s) are given");
            }

            const email = {
                to,
                templateReferenceId,
                payload,
            };

            // some logic here
            const { data, meta } = await super.create(
                ctx
            );
            // some more logic

            let errMsg = "";

            let instanceService = strapi.service("plugin::email-collect.email-collect");

            let updateData: { status: "success" | "failed" | "notsend" , remark?: string } = {
                status: "success"
            };

            if (isNumher(email.templateReferenceId)) {
                try {
                    await instanceService.sendWithPlugin(email);
                } catch (e) {
                    if (e.statusCode === 400) {
                        errMsg = e.message;
                    } else {
                        errMsg = `Couldn't send test email: ${e.message}.`;
                    }
                }
            }else{
                updateData.status = 'notsend';
            }

          

            if (errMsg) {
                updateData.status = 'failed';
                updateData.remark = data.attributes.remark ? `${data.attributes.remark}\nError Information: ${errMsg}` : errMsg;
            }

            let result = await instanceService.update(data.id, {
                data: updateData,
            });

            if (errMsg) {
                return new ApplicationError(errMsg);
            }

            return { data: result, meta };
        },
    }
});


function isNumher(id: string | number) {
    return !isNaN(Number(id));
}