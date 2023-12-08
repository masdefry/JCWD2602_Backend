Hello, Purwadhika Students!

+ How to Install Typescript?

    1. npm i -g typescript
    2. npm i -g ts-node
    3. Inside Folder "intro-typescript", Type on Terminal: tsc --init
    4. Setup "tsconfig.json" & Uncomment this Code: "outDir": "./bundle", 
    5. Running TS: ts-node filename.ts

+ How to Setup Express Typescript?
    -   npm init --yes
    -   npm install express
    -   npm i -D typescript @types/express @types/node
    -   npx tsc --init
    -   npm i -D concurrently nodemon
    -   Edit "scripts" on "package.json" with this Code:
        "scripts": {
            "build": "npx tsc",
            "start": "node dist/index.js",
            "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""
        }

        How to Running? npm run dev