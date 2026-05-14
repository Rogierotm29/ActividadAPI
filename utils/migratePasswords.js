import 'dotenv/config'
import mongoose from 'mongoose'
import User from '../models/user.models.js'
import { hashPassword } from './hash.js'

const migrate = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Conectado a MongoDB\n')

    const users = await User.find()
    let migrated = 0

    for (const user of users) {
        if (!user.password.includes(':')) {
            const plain = user.password
            user.password = hashPassword(plain)
            await user.save()
            migrated++
            console.log(`  Migrado: ${user.username}`)
        } else {
            console.log(`  Omitido (ya hasheado): ${user.username}`)
        }
    }

    console.log(`\nMigración completa: ${migrated} usuario(s) actualizado(s) de ${users.length} total.`)
    await mongoose.disconnect()
    process.exit(0)
}

migrate().catch((err) => {
    console.error('Error durante la migración:', err.message)
    process.exit(1)
})
