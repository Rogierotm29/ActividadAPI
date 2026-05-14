import 'dotenv/config'
import { hashPassword, verifyPassword } from './hash.js'

const texto1 = 'MiContraseña123'
const texto2 = 'MiContraseña124'

console.log('=== PRUEBA DE HASHING CON crypto (scrypt + sal + pimienta) ===\n')

// 1. Hashear el texto original
const hash = hashPassword(texto1)
console.log(`Texto original : "${texto1}"`)
console.log(`Hash generado  : ${hash}\n`)

// 2. Verificar que el mismo texto produce verificación correcta
const mismoTexto = verifyPassword(texto1, hash)
console.log(`Verificar mismo texto ("${texto1}") → ${mismoTexto}`)

// 3. Verificar que un texto diferente falla
const textoDistinto = verifyPassword(texto2, hash)
console.log(`Verificar texto distinto ("${texto2}") → ${textoDistinto}\n`)

// 4. Demostrar que dos hashes del mismo texto son distintos (sal aleatoria)
const hash2 = hashPassword(texto1)
console.log('Mismo texto, dos hashes distintos por la sal aleatoria:')
console.log(`  Hash 1: ${hash}`)
console.log(`  Hash 2: ${hash2}`)
console.log(`  Pero ambos verifican correctamente: ${verifyPassword(texto1, hash)} / ${verifyPassword(texto1, hash2)}`)
