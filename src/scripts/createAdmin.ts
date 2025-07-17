// scripts/createAdmin.ts
import { auth } from '../../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const email = "your-chosen-email@example.com";
const password = "your-chosen-password";

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log('Admin user created:', userCredential.user.email);
  })
  .catch((error) => {
    console.error('Error creating admin:', error);
  });