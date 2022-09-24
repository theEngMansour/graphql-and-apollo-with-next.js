/* 
    * This function takes in a schema and adds upper-casing logic
    * to every resolver for an object field that has a directive with
    * the specified name (we're using `upper`)
*/
import { mapSchema, MapperKind, getDirective} from '@graphql-tools/utils';
import { defaultFieldResolver } from "graphql";

export function upperDirectiveTransformer(schema, directiveName) {
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            const upperDirective = getDirective(schema, fieldConfig, directiveName)
            if(upperDirective) {
                const { resolve = defaultFieldResolver } = fieldConfig
                fieldConfig.resolve = async function (parent, args, context, info) {
                    const result = await resolve(parent, args, context, info);
                    if(typeof result === 'string') {
                        return result.toUpperCase();
                    }
                    return result
                }
                return fieldConfig
            }
        }
    })
}