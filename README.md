# StudyNotion

StudyNotion is a web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides a platform similar to Udemy, where users can sign up and log in as either an instructor or a student. Instructors can create courses, make them public, and students can purchase these courses using Razorpay integration for payment processing.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Future Lookouts](#future-lookouts)

## Features

- **User Authentication:** Users can sign up and log in as instructors or students.
- **Instructor Dashboard:** Instructors have access to a dashboard where they can manage their courses, edit courses, and view a pie chart with key statistics .
- **Course Creation:** Instructors can create new courses and add details like title, description, and pricing.
- **Public/Private Courses:** Instructors can choose whether to make their courses public or private.
- **Student Dashboard:** Students have a dashboard showing purchased courses and other relevant information.
- **Course Purchasing:** Students can purchase courses using Razorpay integration for secure payment processing.
- **Search Functionality:** Users can look for courses based on different categories like web dev, blockchain etc.

## Technologies Used

- Frontend:
  - React.js
  - Redux (for state management)
  - HTML, CSS, JavaScript

- Backend:
  - Node.js
  - Express.js
  - MongoDB (for database)

- Payment Integration:
  - Razorpay API (for payment processing)


## Future Lookouts

1. **Course Verification by Admin:** Before making a course public, the platform will introduce a course verification process where an admin will review the course content to ensure its quality and adherence to community guidelines.

2. **Enhanced Security Measures:** To protect course content, StudyNotion will implement robust security measures to prevent video lectures and course materials from being downloaded by unauthorized users.
