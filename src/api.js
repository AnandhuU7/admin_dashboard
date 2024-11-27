
let usersData = [
  { key: 1, name: "Arun", email: "arun@example.com", username: "arun", isActive: true, role: "Editor" },
  { key: 2, name: "Priya", email: "priya@example.com", username: "priya", isActive: false, role: "User" },
  { key: 3, name: "Anjali", email: "anjali@example.com", username: "anjali", isActive: true, role: "Editor" },
  { key: 4, name: "Ravi", email: "ravi@example.com", username: "ravi", isActive: true, role: "Editor" },
  { key: 5, name: "Neha", email: "neha@example.com", username: "neha", isActive: false, role: "User" },
  { key: 6, name: "Deepika", email: "deepika@example.com", username: "deepika", isActive: true, role: "Editor" },
  { key: 7, name: "Vikas", email: "vikas@example.com", username: "vikas", isActive: false, role: "Viewer" },
  { key: 8, name: "Sita", email: "sita@example.com", username: "sita", isActive: true, role: "Editor" },
  { key: 9, name: "Rajesh", email: "rajesh@example.com", username: "rajesh", isActive: false, role: "User" },
  { key: 10, name: "Mohit", email: "mohit@example.com", username: "mohit", isActive: true, role: "Editor" },
  { key: 13, name: "Rina", email: "rina@example.com", username: "rina", isActive: false, role: "Editor", permissions: ["read", "edit"] },
  { key: 14, name: "Arvind", email: "arvind@example.com", username: "arvind", isActive: true, role: "User", permissions: ["read", "write"] },
  { key: 15, name: "Maya", email: "maya@example.com", username: "maya", isActive: false, role: "Viewer", permissions: ["read"] },
  { key: 16, name: "Nikhil", email: "nikhil@example.com", username: "nikhil", isActive: true, role: "User", permissions: ["read", "write"] },
  { key: 17, name: "Vivek", email: "vivek@example.com", username: "vivek", isActive: true, role: "Editor", permissions: ["read", "edit"] },
  { key: 18, name: "Aarti", email: "aarti@example.com", username: "aarti", isActive: false, role: "Viewer", permissions: ["read"] },
  { key: 19, name: "Sandeep", email: "sandeep@example.com", username: "sandeep", isActive: true, role: "Editor", permissions: ["read", "edit"] },
  { key: 20, name: "Neelam", email: "neelam@example.com", username: "neelam", isActive: false, role: "User", permissions: ["read", "write"] },
  { key: 21, name: "Manoj", email: "manoj@example.com", username: "manoj", isActive: true, role: "Viewer", permissions: ["read"] },
  { key: 22, name: "Shalini", email: "shalini@example.com", username: "shalini", isActive: false, role: "Editor", permissions: ["read", "edit"] },
  { key: 23, name: "Geeta", email: "geeta@example.com", username: "geeta", isActive: true, role: "User", permissions: ["read", "write"] },
  { key: 24, name: "Amit", email: "amit@example.com", username: "amit", isActive: true, role: "Editor", permissions: ["read", "edit"] },
  { key: 25, name: "Suman", email: "suman@example.com", username: "suman", isActive: false, role: "Viewer", permissions: ["read"] },
  { key: 26, name: "Siddharth", email: "siddharth@example.com", username: "siddharth", isActive: true, role: "User", permissions: ["read", "write"] },
  { key: 27, name: "Tanvi", email: "tanvi@example.com", username: "tanvi", isActive: true, role: "Editor", permissions: ["read", "edit"] },
  { key: 28, name: "Rahul", email: "rahul@example.com", username: "rahul", isActive: false, role: "User", permissions: ["read", "write"] }
];

// Simulate an API call delay
const simulateApiCall = (data, delay = 500) => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

// CRUD operations simulation

export const getUsers = async () => {
  return await simulateApiCall(usersData);
};

export const createUser = async (user) => {
  const newKey = usersData.length ? Math.max(...usersData.map(u => u.key)) + 1 : 1;
  
  const newUser = { ...user, key: newKey }; 
  usersData.push(newUser);
  return await simulateApiCall(newUser); 
}

export const updateUser = async (updatedUser) => {
  usersData = usersData.map((user) =>
    user.key === updatedUser.key ? { ...user, ...updatedUser } : user
  );
  const updatedUserData = usersData.find(user => user.key === updatedUser.key);
  return await simulateApiCall(updatedUserData);
};
export const deleteUser = async (key) => {
  usersData = usersData.filter((user) => user.key !== key);
  return await simulateApiCall(key);
};
