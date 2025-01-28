# Lead Management System

## Project Overview

This project is a **Lead Management System** built using **Next.js**, **Prisma**, **SQLite**, and **TypeScript**. It provides functionality for managing leads and assigning salespersons to them through an admin interface.

---

## Features

- View all leads with associated salespersons.
- Assign salespersons to leads dynamically.
- Add, update, and manage leads.
- Modular architecture with server and client components.

---

## Tech Stack

- **Frontend Framework:** Next.js (App Router)
- **Database:** SQLite (via Prisma ORM)
- **Styling:** Tailwind CSS
- **Language:** TypeScript

---

## File Structure

```
├── dev.db                # SQLite database file
├── prisma/
│   └── schema.prisma     # Prisma schema
│
├── public/               # Public assets
├── src/
│   ├── actions/
│   │   └── index.ts      # Server-side action handlers
│   ├── app/
│   │   ├── admins/
│   │   │   └── page.tsx  # Admin page component
│   │   ├── globals.css   # Global CSS styles
│   │   └── layout.tsx    # Layout component
│   └── components/
│       ├── adminComponent.tsx   # Admin dashboard component
│       ├── adminRow.tsx         # Table row for admin leads
│       ├── header.tsx           # Header component
│       └── leadFormClient.tsx   # Lead form for client-side actions
├── db/                  # Prisma database folder
├── .env                 # Environment variables
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

---

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/arefkhandantabrizi/leads.git
   cd leads
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**: Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. **Generate Prisma Client**:

   ```bash
   npx prisma generate
   ```

5. **Migrate the Database**:

   ```bash
   npx prisma migrate dev --name init
   ```

6. **Run the Development Server**:

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` in your browser.

---

## Usage

- **Admin Page:** View and manage leads and their assigned salespersons at `/admins`.
- **Database Schema:** The schema is defined in `prisma/schema.prisma`.
- **Dynamic Assignment:** Salespersons can be assigned to leads using the dropdown menu and button on the admin page.

---

## Key Components

### 1. **Admin Page (**``**)**

This page fetches data from the database and renders the admin interface for managing leads.

### 2. **Components**

- `adminComponent.tsx`: Renders the leads and salesperson data.
- `leadFormClient.tsx`: Handles adding and updating leads.
- `adminRow.tsx`: Manages the rows of the leads table.

### 3. **Actions (**``**)**

Server-side functions for database operations like assigning salespersons.

---

## Prisma Schema Overview

```prisma
model Lead {
  id            Int           @id @default(autoincrement())
  name          String
  email         String
  source        Source
  salesperson   Salesperson?  @relation("LeadSalesperson", fields: [salespersonId], references: [id])
  salespersonId Int?
  assignments   Assignment[]
}

model Salesperson {
  id    Int    @id @default(autoincrement())
  name  String
  leads Lead[]
}

model Assignment {
  id            Int          @id @default(autoincrement())
  leadId        Int
  salespersonId Int
  lead          Lead         @relation(fields: [leadId], references: [id])
  salesperson   Salesperson  @relation(fields: [salespersonId], references: [id])
}

enum Source {
  GOOGLE
  SOCIAL_MEDIA
  FRIENDS
}
```

---

## Potential Improvements

### Separate Backend Logic

Currently, the backend logic (like database operations and API routes) is tightly coupled with the Next.js app. While this works for demonstration purposes, in real-world applications, separating the backend into its own Express.js app (or similar framework) can provide several advantages:

- **Scalability**: Independent scaling of backend and frontend services.
- **Reusability**: Backend APIs can be reused across multiple frontend applications (e.g., web, mobile).
- **Security**: Easier to secure and manage backend services separately.
- **Flexibility**: Freedom to choose other backend technologies or architectures.

To implement this:

1. Create a separate Express.js application.
2. Move the database logic and API routes to the Express app.
3. Update the front-end to consume the back-end API using `fetch` or a library like `axios`.

For instance, the current lead assignment functionality could be moved to an Express route:

```javascript
app.post('/api/assign-salesperson', async (req, res) => {
  const { leadId, salespersonId } = req.body;

  try {
    await db.lead.update({
      where: { id: leadId },
      data: { salespersonId },
    });

    res.status(200).json({ message: 'Lead assigned successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign lead.' });
  }
});
```

### Improved UI/UX

The current UI is intended for demonstration purposes. In real-world scenarios, it would benefit from:

- **Enhanced Design**: A more polished and visually appealing interface.
- **Accessibility Features**: Ensuring the app is usable for all users, including those with disabilities.
- **Pagination and Filtering**: For better handling of large datasets.
- **Real-time Updates**: Using WebSockets or similar technology for instant updates.

### Additional Features

- **Authentication and Authorization**: To ensure secure access.
- **Advanced Reporting**: Detailed insights into leads and sales performance.
- **Notifications**: Alerts for important events, such as new lead assignments.

## Disclaimer

This UI is created for demonstration purposes only. In real-world scenarios, the design and functionality would be significantly enhanced to provide a smoother and more professional user experience.



## Troubleshooting

### Common Errors:

- **Database Not Found:** Ensure `DATABASE_URL` in `.env` points to the correct SQLite file.
- **Schema Validation:** Run `npx prisma format` to validate and format your schema.

---

## License

This project is licensed under the MIT License. Feel free to use and modify it.
