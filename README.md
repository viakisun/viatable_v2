# viatable QR Ordering System (v0.1)

This repository contains the proof-of-concept for the viatable QR-based smart dining solution. It is a React application built with Vite and TypeScript, designed to showcase the user flow for both customers and staff.

## Current Status

**Version:** v0.1

This is the initial release of the application. For detailed changes in this version, please see the [RELEASE_NOTES.md](RELEASE_NOTES.md).

## Getting Started

To run the application locally, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

This will start the application on `http://localhost:5173` (or the next available port).

## Project Overview

The application is structured as follows:
- **Root Page (`/`)**: A directory page with links to all sample pages.
- **Customer Pages (`/qo-c-*`)**: A series of pages demonstrating the customer's journey, from scanning a QR code to placing an order.
- **Staff Pages (`/qo-s-*`)**: A series of pages for staff members to manage orders, tables, and other restaurant operations.