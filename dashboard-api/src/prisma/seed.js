import prisma from './../connection/index';

const categories = [
    {
        name: 'Sport'
    }
]

async function main(){
    for(let item of categories){
        await prisma.categories.create({
            data: item
        })
    }
}

main().catch(error => {
    console.log(error)
    process.exit(1)
}).finally(async() => {
    await prisma.$disconnect();
})