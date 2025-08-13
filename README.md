# 📌 ExpertSoft

Financial data management system that centralizes information from Nequi and Daviplata, allowing data to be uploaded to Excel, automatically converted to CSV, and stored in MySQL. It offers CRUD functionality and advanced queries to optimize organization, analysis, and decision-making.

---

## 🌐 Technologies
- **Frontend:** Vite, TailwindCSS, SheetJS (xlsx)  
- **Backend:** Node.js, Express, MySQL2, CSV-Parser, Dotenv, Cors  

---

## ⚙️ Quick Installation

### 1 Clone the repository
```bash
git clone https://github.com/user/expertsoft.git
cd expertsoft
```

### 2 Install dependencies

**Frontend**
```bash
cd client
npm install
```

**Backend**
```bash
cd ../server
npm install
```

### 3 Configure environment variables

In `server/.env`:
```env
PORT=3000
DB_USER=root
DB_PASSWORD=123
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=expertSoft
```

### 4 Create the database

Run `doc/txl.sql` in MySQL.

---

## ▶  Run the project

**Backend** (with nodemon)
```bash
cd server
npm run dev
```

**Frontend**
```bash
cd client
npm run dev
```

- Frontend: `http://localhost:5173`  
- Backend: `http://localhost:3000`

---

## 🔍 Usage Flow
1. Open the web app (`localhost:5173`).
2. Select an **Excel** file.
3. The system automatically converts it to **CSV** and sends it to the backend.
4. The backend saves, processes, and inserts the data into MySQL.
5. CRUD operations and advanced queries are available via API (see Postman collection in `/doc`).



## 🖧 ERM
The **Entity-Relationship Model (ERM)** of the system is composed of key entities that represent the core financial data flow:  

- **Customers**: Stores client details such as name, identification, address, contact information, and email.  
- **Transactions**: Records all movements, including date, amount, type, status, associated customer, platform, and related invoice.  
- **Transaction Types**: Classifies transactions (e.g., deposits, withdrawals, payments).  
- **Transaction Status**: Indicates the current state of the transaction (e.g., completed, pending, failed).  
- **Platforms**: Contains the Fintech platforms used, such as **Nequi** and **Daviplata**.  
- **Invoices**: Stores billing data including invoice number, billing period, amounts billed, and amounts paid.  

These entities are interconnected through primary and foreign keys, enabling a relational structure that supports secure storage, prevents redundancy, and facilitates complex queries.  