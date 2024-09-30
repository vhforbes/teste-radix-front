# How to Set Up a Next.js Project Using Vougan's Template

## 1. Install the Template
Create the project and install dependencies

```bash
npx create-next-app -e https://github.com/vougan-finance/next-template
```

```
cd my-new-project
npm i
```

## 2. Set Up Environment Variables
Create a .env.local file
```bash
NEXT_PUBLIC_API_URL=https://api.example.com
```

## 3. Change Colors in globals.css

Example:
```
:root {
  --primary-color: #3490dc;
  --secondary-color: #ffed4a;
}
```
