// Import bcrypt or bcryptjs
import { genSalt, hash, compare } from 'bcrypt'; // or 'bcryptjs' if you're using that

// Function to hash a password
async function hashPassword(password) {
  const salt = await genSalt(10); // Adjust salt rounds as needed
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

// Function to compare a password with a hashed one
async function comparePassword(plainPassword, hashedPassword) {
  const isMatch = await compare(plainPassword, hashedPassword);
  return isMatch;
}

// Export functions to use elsewhere in your project
export default { hashPassword, comparePassword };
