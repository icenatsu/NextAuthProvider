import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try{
        const {email, password, name} = await req.json()
        const hashPass = await bcrypt.hash(password, 10)

          const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                hashedPassword: hashPass,
            },
        });
        await prisma.$disconnect();
        return NextResponse.json({ message: `${newUser.email} created` }, {status: 200});

        
    }catch(e){
        console.log({e});
        await prisma.$disconnect();

        return NextResponse.json({ message: `Une erreur est survenue lors de l'enregistrement` }, { status: 400 });
        
    }
};

