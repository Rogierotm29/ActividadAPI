import crypto from 'crypto'

const PEPPER = process.env.PEPPER || 'mi_pimienta_secreta'

export const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.scryptSync(password + PEPPER, salt, 64).toString('hex')
    return `${salt}:${hash}`
}

export const verifyPassword = (password, stored) => {
    const [salt, hash] = stored.split(':')
    const hashToVerify = crypto.scryptSync(password + PEPPER, salt, 64)
    const storedHash = Buffer.from(hash, 'hex')
    return crypto.timingSafeEqual(hashToVerify, storedHash)
}
