[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=23397080)
# LBYCPG3 Term End Project — A Sari-Sari Store Web-Based Application for Low-End Devices

**Group Members: Derrick Matthew C. Sunglao, Venz Nathan C. Gerolaga** 


## Abstract

This project is a web-based Sari-Sari Store application designed for low-end devices. The goal is to provide a simple, fast, and user-friendly interface for managing and browsing everyday store products. The application allows users to view available products, their stock, and prices in a visually appealing and responsive layout. The outcome is a lightweight, accessible, and easy-to-use web app suitable for small businesses and community stores.


## Introduction

Sari-Sari stores are small neighborhood convenience shops that play a vital role in Filipino communities. This project aims to digitize the traditional Sari-Sari store experience, making it easier for store owners and customers to manage and browse products. By leveraging modern web technologies, the application ensures accessibility even on low-end devices, supporting digital transformation in grassroots commerce.


## Description of the Proposed System

The developed system is a single-page web application that displays a catalog of essential products typically found in a Sari-Sari store. Each product card shows the product name, stock quantity, unit, and price. The interface is optimized for clarity and speed, using a grid layout and color cues for usability. The system is relevant as it provides a digital inventory and price list, helping store owners manage stock and customers to quickly check product availability and prices.


## Objectives

- To create a lightweight, responsive web application for Sari-Sari store inventory and price display
- To ensure compatibility and fast loading on low-end devices
- To provide a user-friendly interface for both store owners and customers
- To support digital record-keeping and inventory management for small businesses


## Web Development Tools and Algorithms

- **Vite** — for fast development and build tooling
- **React** — for building the user interface as a single-page app
- **TypeScript** — for type safety and maintainability
- **CSS (with custom styles)** — for responsive and modern design

No complex algorithms were required; the main logic involves mapping product data to UI components and basic array operations for stock and price display.


## Methodology

The project followed an iterative development process:
1. Requirements gathering and UI design based on typical Sari-Sari store needs
2. Component-based development using React and TypeScript
3. Styling and layout with CSS for responsiveness
4. Manual testing on different browsers and devices to ensure compatibility and performance


## Testing and Evaluation of Results

### Results
The application successfully displays a grid of products with their stock and prices. It loads quickly and works smoothly on both desktop and mobile browsers. The UI matches the intended design, as shown in the included screenshots.

### Discussion
The project met its objectives of being lightweight, responsive, and user-friendly. The use of React and Vite enabled rapid development and easy maintenance. The app can be extended with features like search, filtering, or admin controls for stock management.

### Conclusion
This project demonstrates how modern web tools can empower small businesses with digital solutions. The Sari-Sari Store app is ready for further enhancements, such as user authentication, sales tracking, or integration with payment systems.


## References

- Vite Documentation: https://vitejs.dev/
- React Documentation: https://react.dev/
- Inspiration from local Sari-Sari stores and community feedback


## Project Deliverables

- [x] **Project Documentation** — this README
- [x] **App Design** — see screenshots and UI implementation
- [x] **Source Code** — all code and assets in `src/`
- [ ] **Video Walkthrough** — max 5 minutes, link below
- [ ] **Peer Grade** — individual submission on Canvas


## Video Walkthrough

Paste your video link here:
> (Replace this line with your video link)

Your walkthrough should demonstrate your website's key features and functionality. Max 5 minutes. There will be no presentation — your video should be clear enough that any student taking this course can understand your project.


## How to Run

1. Clone this repository to your local machine
2. Install dependencies:
	```
	npm install
	```
3. Start the development server:
	```
	npm run dev
	```
4. Open the provided local URL in your browser (e.g., http://localhost:5173)

Alternatively, you can build for production with `npm run build` and serve the `dist/` folder.


## Project Structure

```
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── products.ts
│   ├── App.css
│   ├── assets/
│   │   └── (images, icons, etc.)
│   └── ...
├── public/
│   └── ...
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```


## Submission Notes

- All source code must be committed and pushed before the deadline (**April 9, 2359**).
- Do **not** upload generated or binary files.
- Keep your repository organized — use folders as shown above.
- All team members should contribute commits.
