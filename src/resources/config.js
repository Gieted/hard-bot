/**
 * Token bota.
 * @type {string}
 */
export const token = process.env.TOKEN

/**
 * ID gildii "Hard Party".
 * @type {string}
 */
export const guildId = process.env.GUILD_ID

/**
 * ID administratora serwera.
 * @type {string}
 */
export const adminId = process.env.ADMIN_ID

/**
 * Dane logowania do firebase (odkodowane z Base64 i wczytane z JSON).
 * @type {admin.ServiceAccount}
 */
export const firebaseServiceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString())
