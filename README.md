# QuickDev (QuickQuery Web)

**QuickDev** is a developer productivity suite ported from the QuickQuery WPF application to the web using **Next.js 14**, **Tailwind CSS**, and **Shadcn/UI**.

## 🚀 Features

### 1. 📋 Smart IN-Clause Generator
- Converts newline-separated values (e.g., from Excel) into SQL `IN (...)` clauses.
- user-selectable separator (comma `,` or pipe `|`).
- **Oracle Mode**: Automatically splits lists larger than 1000 items into multiple `OR column IN (...)` blocks.

### 2. 📝 CRUD Generator
- Generates basic SQL boilerplate (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) from a table name and column list.
- Supports **SQL Server** (`@param`) and **Oracle** (`:param`) parameter styles.

### 3. 🔄 Model Mapper
- Converts database column names (`snake_case`) to C# Property names (`PascalCase`).
- Generates numeric/string property definitions.

### 4. 🔗 Query Interpolator
- Replaces SQL placeholders (`?`, `@p0`, `:1`) with actual parameter values for debugging.
- Handy for taking a parameterized query from logs and making it runnable in a DB tool.

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Getting Started

```bash
npm run dev
# Open http://localhost:3000
```

## ☁️ Deployment

This project is optimized for deployment on **Vercel** (the creators of Next.js).
- **Pricing**: Vercel is **FREE** for personal/hobby projects (Hobby Tier).
- **Limits**: Generous limits for bandwidth and build minutes, suitable for this type of tool.
- **HTTPS**: Automatic free SSL.

```bash
npx vercel
```
