## Getting Started

Prerequistic

```bash
Add .env file
Add docker-compose.yml file
```

How to install packages

```bash
npm install
# or
yarn dev
```

DB

```bash
Create Migration
prisma migrate save --name migration_name

Apply Migration
prisma migrate up
```

How to run the project

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the frontend result.
You can start editing the frontend by modifying `src/app/page.tsx`.

Open [http://localhost:3000](http://localhost:3000/api) with your browser to see the API result.
You can start editing the api by modifying `src/app/api`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
  You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
