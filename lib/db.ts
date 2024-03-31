import {PrismaClient} from "@prisma/client"
    
declare global{
    var prisma: PrismaClient | undefined
}

// make sure only one client is created during hot reloading
export const db = globalThis.prisma || new PrismaClient()

if(process.env.NODE_ENV !=="production") globalThis.prisma = db