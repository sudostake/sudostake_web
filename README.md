# 🌐 Sudostake Web

This is the frontend and functions environment for the Sudostake protocol.

The project includes:

- A **Next.js** frontend for interacting with Sudostake.
- **Firebase Cloud Functions** written in TypeScript for backend logic and API routes.

&nbsp;

## 🧩 Project Structure

```
sudostake_web/
├── firebase_functions/        # Firebase Cloud Functions (TypeScript)
├── public/                    # Static assets
├── app/                       # Next.js source code
├── .env.local                 # Environment variables (not committed)
└── README.md                  # Project documentation
```

&nbsp;

## 🚀 Getting Started (Frontend)

1. **Install dependencies** at the root:

```bash
npm install
```

2. **Start the development server**:

```bash
npm run dev
```

The app will be running at:

```
http://localhost:3000
```

> 💡 Make sure `.env.local` is configured with the necessary variables before running the app.

&nbsp;

## 🔧 Running Firebase Functions Locally

1. **Navigate to the `firebase_functions/` folder**:

```bash
cd firebase_functions
```

2. **Install dependencies**:

```bash
npm install
```

3. **Build the functions**:

```bash
npm run build
```

4. **Start the Firebase Functions emulator**:

```bash
npm run serve
```

```
http://127.0.0.1:5001/sudostake/us-central1

# Index a vault example
curl -X POST http://127.0.0.1:5001/sudostake/us-central1/index_vault \
  -H "Content-Type: application/json" \
  -d '{"vault": "vault-0.nzaza.testnet"}'
{"owner":"selfcustody.testnet","state":"idle"}

# Get user vaults example
curl -X GET "http://127.0.0.1:5001/sudostake/us-central1/get_user_vaults?owner=selfcustody.testnet&factory_id=nzaza.testnet" \
  -H "Content-Type: application/json"
```

> 🔎 View the Emulator UI at [http://localhost:5002](http://localhost:5002)

&nbsp;

## 🧪 Notes

- Frontend is built with **Next.js + TypeScript + TailwindCSS**
- Functions are written using **Firebase Cloud Functions (TypeScript)**
- All functions are located in `firebase_functions/src/index.ts`
- Functions must be **built before being served** locally
