import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
	try {
		const listUser = await prisma.user.findMany();
		
		await prisma.$disconnect();

		return NextResponse.json(
			{ listUser },
			{ status: 200 }
		);
	} catch (e: any) {
		await prisma.$disconnect();

		return NextResponse.json(
			{
				message: `Une erreur est survenue lors de la récupération des données`,
			},
			{ status: 500 }
		);
	}
}

// export async function POST(req: NextRequest) {
//   const body: { name: string, email: string, password: string } = await req.json();
//   const { name, email, password } = body; 

//   try {
// 		const newUser = await prisma.user.create({
// 			data: {
// 				name,
// 				email,
// 			},
// 		});
// 		await prisma.$disconnect();
		

// 		return NextResponse.json({ message: `${newUser.name} created` }, {status: 200});
// 	} catch (e: any) {
// 		console.log(e);
// 		await prisma.$disconnect();

//     return NextResponse.json({ message: `Une erreur est survenue lors de l'enregistrement de : ${name}` }, { status: 200 });
// 	}
// }