# projeto-drivenpass
### a password manager!

## How to run
1. clone this repository
2. Install all dependencies


```
npm i
```

3. Create a PostgreSQL database with whatever name you want
4. Configure the .env.development file using the .env.example file
5. Run all migrations
```
npx prisma migrate dev
```
6. run the back-end

```
npm start
```
## How to run tests

```
npm test
```