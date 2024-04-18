import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserByName = async (name: string) => {
	const user = await prisma.user.findFirst({
		where: {
			name: name,
		},
	});

	return user ? user : null;
};

export const getUserByEmail = async (email: string) => {
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	return user ? user : null;
};

export const createNewUser = async (
	name: string,
	email: string,
	password: string,
) => {
	const newUser = await prisma.user.create({
		data: {
			name: name,
			email: email,
			password: password,
		},
	});

	return newUser ? newUser : null;
};

// const getUserById = async (id) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: id,
//     },
//   });
//   return user ? user : null;
// };

// const deleteAllUsers = async () => {
//   return await prisma.user.deleteMany({});
// };

// const getAllUsers = async () => {
//   return await prisma.user.findMany();
// };
