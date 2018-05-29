-- Up
CREATE TABLE User (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  -- Constraints
  CONSTRAINT User_ck_type CHECK (type IN ('Super', 'Restro', 'General')),
  CONSTRAINT User_uk_username UNIQUE (username)
);

-- Create a super user by default
INSERT OR REPLACE INTO User (id, username, password, name, type) VALUES
  (1, 'ranjan.newa@gmail.com', '$2a$10$DD6zda4qajdMwB/QrDn9QuW.WllpsCowOScMVmZOyqxXw1/1xBfK2', 'Ranjan Shrestha', 'Super'),
  (2, 'amitadhikari26@gmail.com', '$2a$10$DD6zda4qajdMwB/QrDn9QuW.WllpsCowOScMVmZOyqxXw1/1xBfK2', 'Amit Adhikari', 'Restro'),
  (3, 'fudocafeanil@gmail.com', '$2a$10$DD6zda4qajdMwB/QrDn9QuW.WllpsCowOScMVmZOyqxXw1/1xBfK2', 'Anil Shrestha', 'Restro'),
  (4, 'kushal@gmail.com', '$2a$10$DD6zda4qajdMwB/QrDn9QuW.WllpsCowOScMVmZOyqxXw1/1xBfK2', 'Kushal Adhikari', 'Restro'),
  (5, 'rojina.shrestha@gmail.com', '$2a$10$DD6zda4qajdMwB/QrDn9QuW.WllpsCowOScMVmZOyqxXw1/1xBfK2', 'Rojina Shrestha', 'Restro');


CREATE TABLE Restro (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  vat REAL NOT NULL,
  serviceCharge REAL NOT NULL,
  -- Constraints
  CONSTRAINT Restro_uk_name UNIQUE (name)
);

INSERT INTO Restro (id, name, vat, serviceCharge) VALUES (1, 'Fudo Cafe', 0.13, 0.1);

CREATE TABLE RestroUser (
  id INTEGER PRIMARY KEY,
  restroId INTEGER NOT NULL,
  userId INTEGER NOT NULL,
  role TEXT NOT NULL,
  -- Constraints
  CONSTRAINT Restro_fk_restroId FOREIGN KEY (restroId) REFERENCES Restro(id),
  CONSTRAINT User_fk_userId FOREIGN KEY (userId) REFERENCES User(id),
  CONSTRAINT RestroUser_ck_role CHECK (role IN ('Waiter', 'Cashier', 'Admin'))
);

CREATE INDEX RestroUser_ix_restroId ON RestroUser(restroId);
CREATE INDEX RestroUser_ix_userId ON RestroUser(userId);

INSERT OR REPLACE INTO RestroUser(id, restroId, userId, role) VALUES
  (1, 1, 1, 'Admin'),
  (2, 1, 2, 'Admin'),
  (3, 1, 3, 'Waiter'),
  (4, 1, 4, 'Waiter'),
  (5, 1, 5, 'Cashier');

CREATE TABLE Category (
  id INTEGER PRIMARY KEY,
  restroId INTEGER NOT NULL,
  name TEXT NOT NULL,
  -- Constraints
  CONSTRAINT Category_fk_restroId FOREIGN KEY (restroId) REFERENCES Restro(id)
);

CREATE INDEX Category_ix_restroId ON Category(restroId);

INSERT INTO Category(id, restroId, name)
  VALUES
    (1, 1, 'Kitchen'),
    (2, 1, 'Bar'),
    (3, 1, 'Cafe');

CREATE TABLE Item (
  id INTEGER PRIMARY KEY,
  categoryId INTEGER NOT NULL,
  name TEXT NOT NULL,
  unit TEXT NOT NULL,
  threshold REAL NULL,

  -- Constraints
  CONSTRAINT Item_fk_categoryId FOREIGN KEY (categoryId) REFERENCES Category(id)
);

CREATE INDEX Item_ix_categoryId ON Item(categoryId);

CREATE TABLE ItemStock (
  id INTEGER PRIMARY KEY,
  itemId INTEGER NOT NULL,
  userId INTEGER NOT NULL,
  timestamp INTEGER NOT NULL,
  stock REAL NOT NULL,

  -- Constraints
  CONSTRAINT ItemStock_fk_itemId FOREIGN KEY (itemId) REFERENCES Item(id),
  CONSTRAINT ItemStock_fk_userId FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE INDEX ItemStock_ix_userId ON ItemStock(userId);
CREATE INDEX ItemStock_ix_itemId ON ItemStock(itemId);
CREATE INDEX ItemStock_ix_itemIdTS ON ItemStock(itemId, timestamp);

CREATE TABLE MenuItem (
  id INTEGER PRIMARY KEY,
  itemId INTEGER NOT NULL,
  name TEXT NOT NULL,
  qty REAL NOT NULL,
  price REAL NOT NULL,

  -- Constraints
  CONSTRAINT MenuItem_fk_itemId FOREIGN KEY (itemId) REFERENCES Item(id)
);

CREATE INDEX MenuItem_ix_itemId ON MenuItem(itemId);

CREATE TABLE Purchase (
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  itemId INTEGER NULL,
  timestamp INTEGER NOT NULL,
  qty REAL NOT NULL,

  -- Constraints
  CONSTRAINT Purchase_fk_userId FOREIGN KEY (userId) REFERENCES Purchase(id),
  CONSTRAINT Purchase_fk_itemId FOREIGN KEY (itemId) REFERENCES Purchase(id)
);

CREATE INDEX Purchase_ix_userId ON Purchase(userId);
CREATE INDEX Purchase_ix_itemId ON Purchase(itemId);
CREATE INDEX Purchase_ix_itemIdTS ON Purchase(itemId, timestamp);

CREATE TABLE [Table] (
  id INTEGER PRIMARY KEY,
  restroId INTEGER NOT NULL,
  number TEXT NOT NULL,

  -- Constraints
  CONSTRAINT Table_uk_number UNIQUE(restroId, number),
  CONSTRAINT Table_fk_restroId FOREIGN KEY (restroId) REFERENCES Restro(id)
);

CREATE INDEX Table_ix_restroId ON [Table](restroId);

INSERT INTO [Table](id, restroId, number) VALUES
  (1, 1, '01'),
  (2, 1, '02'),
  (3, 1, '03'),
  (4, 1, '04'),
  (5, 1, '05');

CREATE TABLE [Order] (
  id INTEGER PRIMARY KEY,
  tableId INTEGER NOT NULL,
  -- timestamp is recorded only when the order is completed
  timestamp INTEGER NULL,
  status TEXT NOT NULL,
  userId INTEGER NULL,
  discount REAL NOT NULL,
  vat REAL NOT NULL,
  serviceCharge REAL NOT NULL,
  remark TEXT,

  -- Constraints
  CONSTRAINT Order_ck_status CHECK (status IN ('Active', 'Cancel', 'Complete')),
  CONSTRAINT Order_fk_tableId FOREIGN KEY (tableId) REFERENCES [Table](id),
  CONSTRAINT Order_fk_userId FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE INDEX Order_ix_tableId ON [Order](tableId);

CREATE TABLE OrderItem (
  id INTEGER PRIMARY KEY,
  orderId INTEGER NOT NULL,
  userId INTEGER NOT NULL,
  menuItemId INTEGER NOT NULL,
  qty REAL NOT NULL,
  rate REAL NOT NULL,
  status TEXT NULL,

  -- Constraints
  CONSTRAINT OrderItem_fk_userId FOREIGN KEY(userId) REFERENCES User(id),
  CONSTRAINT OrderItem_fk_orderId FOREIGN KEY(orderId) REFERENCES [Order](id),
  CONSTRAINT OrderItem_fk_menuItemId FOREIGN KEY(menuItemId) REFERENCES MenuItem(id)
);

CREATE INDEX OrderItem_ix_orderId ON OrderItem(orderId);
CREATE INDEX OrderItem_ix_userId ON OrderItem(userId);

-- Down
