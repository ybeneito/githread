import { Prisma, PrismaClient } from '@prisma/client';
import {faker} from "@faker-js/faker"
const prisma = new PrismaClient()

const main = async () => {
    const users = []
    const posts = []
    const likes = []

    // Ajout de 10 users et remplissage du tableau
    for (let i = 0; i < 10; i++) {
        const user = {
            username: faker.internet.userName(),
            image : faker.image.avatar(),
            name: faker.person.firstName(),
            bio: faker.lorem.paragraph(),
            link: faker.internet.url(),
            email: faker.internet.email(),
        } satisfies Prisma.UserCreateInput

        const dbUser = await prisma.user.create({data: user})

        users.push(dbUser)
    }

    // Ajout de 100 posts
    for (let i = 0; i < 100; i++) {
        const randomUserId = faker.number.int({
            min:0, max: users.length - 1
        }) 
        const randomWordsCount = faker.number.int({
            min:5, max:12
        })

        const post = {
            content: faker.lorem.sentence(randomWordsCount),
            userId: users[randomUserId].id,
        } satisfies Prisma.PostUncheckedCreateInput

        const dbPost = await prisma.post.create({data: post})
        posts.push(dbPost)
    }

    //Ajout de 200 likes
    for (let i = 0; i < 200; i++) {
        const randomUserId = faker.number.int({
            min:0, max: users.length - 1
        })
        const randomPostId = faker.number.int({
            min:0, max: posts.length - 1
        }) 
        const like = {
            postId: posts[randomPostId].id,
            userId: users[randomUserId].id
        } satisfies Prisma.LikeUncheckedCreateInput
        const dbLike = await prisma.like.create({data: like}) 
        likes.push(dbLike)
    }
}

main().then(async() => {
    await prisma.$disconnect()
}).catch(async e => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
})