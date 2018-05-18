-- Up
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  -- Constraints
  CONSTRAINT User_ck_role CHECK (role IN ('Waiter', 'Cashier', 'Admin')),
  CONSTRAINT User_uk_username UNIQUE (username)
);

-- Create a super user by default
INSERT INTO users (id, username, password, name, role)
  VALUES (1, 'bhagyasah4u@gmail.com', '$2a$10$DD6zda4qajdMwB/QrDn9QuW.WllpsCowOScMVmZOyqxXw1/1xBfK2', 'Administrator', 'Admin');


-- Down
