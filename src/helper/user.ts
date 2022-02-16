import { db } from "@/core/database";
import { User } from "@prisma/client";


export const createOrFindUser = async (id: string): Promise<User | null> => {
	try {
		let user = await db.user.findUnique({
			where: {
				id
			}
		})
		if (!user) {
			user = await db.user.create({
				data: {
					id,
					name: 'UNDEFINED'
				}
			})
		}
		return user;
	}
	catch (err) {
		console.log("Error occured while finding or creating user")
		console.log(err)
		return null
	}
}