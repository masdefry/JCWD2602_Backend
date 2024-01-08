Hello, Purwadhika Students!

+ How to Install Typescript?
  - npm i -g typescript
      - npm i -g ts-node
      - Inside Folder "intro-typescript", Type on Terminal: tsc --ini
      - Setup "tsconfig.json" & Uncomment this Code: "outDir": "./bundle",
      - Running TS: ts-node filename.ts

+ How to Setup Express Typescript?
      - npm init --yes
      - npm i express mysql2
      - npm i -D typescript @types/express @types/node
      - npm i -D concurrently nodemon
      - npm install cors --save
      - npm install @types/cors --save-dev
      - npx tsc --init
      - Edit "scripts" on "package.json" with this Code:
    
        "scripts": {
            "build": "npx tsc",
            "start": "node dist/index.js",
            "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""
        },

+ How to Running?
      - npm run dev

+ How to Setup ORM Prisma (JS or TS)?
1. Install Package
    - npm install prisma --save-dev
    - npx prisma init --datasource-provider mysql

2. Edit on .env File
    - DATABASE_URL="mysql://root:abc12345@localhost:3306/day08_prisma"

3.Create Model Inside "prisma > schema.prisma"
    - model Users {
          id    String     @id @default(cuid())
          email String  @unique
          name  String
          password String
        
          usersaddress UsersAddress[]
        
          createdAt DateTime @default(now()) 
          updatedAt DateTime @default(now()) 
      }

    - model UsersAddress{
      id    Int     @id @default(autoincrement())
      consignee String 
      address String
    
      users Users @relation(fields: [usersId], references: [id])
      usersId String @unique  
    
      createdAt DateTime @default(now()) 
      updatedAt DateTime @default(now()) 
    }

4. Migration Models
    - npx prisma migrate dev --name init

5. Setup Seeders
    - Create "seed.js" on "prisma" Folders
    - After That, You Can Execute This Command: npx prisma db seed

***Error Solved:
Invalid `prisma.user.create()` invocation ---> npx prisma generate
