export class schemaBase {
    static parsearId(req) {
        const result = parseInt(req.params.id, 10);
        if (result.error) {
            throw result.error;
        }
        return result;
    }
}