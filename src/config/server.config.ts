export const server_config = {
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 3012,
    ENDPOINT_PREFIX: process.env.ENDPOINT_PREFIX || ""
}