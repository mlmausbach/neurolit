import app from "./app";
import { logger } from "./lib/logger";

/**
 * No Cloudflare Workers, não usamos app.listen().
 * Exportamos o app diretamente para que o Cloudflare gerencie o tráfego.
 */
export default app;
