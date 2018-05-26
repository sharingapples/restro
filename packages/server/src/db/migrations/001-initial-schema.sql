-- Up


CREATE TABLE Restaurant (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  VAT REAL NOT NULL,
  serviceCharge REAL NOT NULL
);
-- Create vat and service charge by default for one restaurant
INSERT INTO Restaurant (id,name,VAT,serviceCharge) VALUES (1,'Fudo Cafe',0.13,0.1);

CREATE TABLE RestaurantUser (
  id INTEGER PRIMARY KEY,
  restaurantId INTEGER NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  -- Constraints
  CONSTRAINT users_fk_restaurantId FOREIGN KEY (restaurantId)
  REFERENCES Restaurant(id),
  CONSTRAINT User_ck_role CHECK (role IN ('Waiter', 'Cashier', 'Admin')),
  CONSTRAINT User_uk_username UNIQUE (username)
);

-- Create a super user by default
INSERT INTO RestaurantUser (id, restaurantId, username, password, name, role)
  VALUES (1, 1,'bhagyasah4u@gmail.com', '$2a$10$DD6zda4qajdMwB/QrDn9QuW.WllpsCowOScMVmZOyqxXw1/1xBfK2', 'Administrator', 'Admin');

CREATE TABLE ItemType(
  id INTEGER PRIMARY KEY,
  restaurantId INTEGER NOT NULL,
  name TEXT NOT NULL,

  --Constraints
CONSTRAINT itemType_fk_restaurantId FOREIGN KEY (restaurantId)
REFERENCES Restaurant(id)
);



--Use predefined set of item types
INSERT INTO ItemType(id, restaurantId, name) VALUES (1, 1, 'Kitchen');
INSERT INTO ItemType(id, restaurantId, name) VALUES (2, 1,  'Bar');
INSERT INTO ItemType(id, restaurantId ,name) VALUES (3, 1, 'Kitchen');

CREATE TABLE Item(
  id INTEGER PRIMARY KEY,
  restaurantId INTEGER NOT NULL,
  name TEXT NOT NULL,
  unit TEXT NOT NULL,
  itemTypeId INTEGER NOT NULL,
  threshold REAL,

  --Constraints
  CONSTRAINT Item_fk_itemTypeId  FOREIGN KEY (itemTypeId)
  REFERENCES itemType(id),
  CONSTRAINT Item_fk_restaurantId FOREIGN KEY (restaurantId)
  REFERENCES Restaurant(id)
);

CREATE INDEX Item_ix_itemTypeId ON Item(itemTypeId);

--keep track of the latest stock qty for each item avoiding traversing throgh
--all the purchase and orders for finding out current stock balance

CREATE TABLE ItemStock (
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  itemId INTEGER NOT NULL,
  timestamp INTEGER NOT NULL,
  stock REAL NOT NULL,

  --Constraints
  CONSTRAINT itemStock_fk_userId FOREIGN KEY (userId)
  REFERENCES RestaurantUser(id),
  CONSTRAINT itemStock_fk_itemId FOREIGN KEY (itemId)
  REFERENCES item(id)
);

CREATE INDEX itemStock_ix_userID ON ItemStock(userId);
CREATE INDEX itemStock_ix_itemId ON ItemStock(itemId, timestamp);

CREATE TABLE MenuItem (
  id INTEGER PRIMARY KEY,
  itemId INTEGER NULL,
  itemTypeId INTEGER NULL,
  name TEXT NOT NULL,
  qty REAL NOT NULL,
  price REAL NOT NULL,

  --Constraints
  CONSTRAINT MenuItem_fk_itemId FOREIGN KEY (itemId)
  REFERENCES ItemType(id)
);

CREATE INDEX MenuItem_ix_itemId ON MenuItem(itemId);
CREATE INDEX MenuItem_ix_itemTypeId ON MenuItem(itemTypeId);

CREATE TABLE Purchase (
  id INTEGER PRIMARY KEY,
  userId INTEGER NOt NULL,
  itemId INTEGER NULL,
  timestamp INTEGER NOT NULL,
  qty REAL NOT NULL,

--Constraints
CONSTRAINT purchase_fk_userId FOREIGN KEY (userId)
REFERENCES RestaurantUser(id),
CONSTRAINT puschase_fk_iemId FOREIGN KEY (itemId)
REFERENCES Item(id)
);

CREATE TABLE Tables (
  id INTEGER PRIMARY KEY,
  restaurantId INTEGER NOT NULL,
  name TEXT NOT NULL,
  top INTEGER NOT NULL,
  left INTEGER NOT NULL,
  angle INTEGER NOT NULL,

  CONSTRAINT Table_uk_name UNIQUE(name),
  CONSTRAINT Table_fk_restaurantId FOREIGN KEY (restaurantId)
  REFERENCES Restaurant(id)
);

CREATE TABLE Orders (
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  timestamp INTEGER NOT NULL,
  tableId INTEGER NOT NULL,
  complete  BOOLEAN NOT NULL ,
  status TEXT NOT NULL,
  discount REAL NOT NULL,
  serviceCharge REAL NOT NULL,
  vat REAL NOT NULL,
  remark TEXT,

  --Constraints

  CONSTRAINT Order_userId FOREIGN KEY (userId) REFERENCES RestaurantUser(id),
  CONSTRAINT oder_fk_tableId FOREIGN KEY (tableId) REFERENCES Tables(id)

);

CREATE INDEX order_ix_userId ON Orders(userId);
CREATE INDEX order_ix_talbeId ON Orders(tableId);

CREATE TABLE OrderItem (
  id INTEGER PRIMARY KEY,
  orderId INTEGER NOT NULL,
  menuItemId INTEGER NOT NULL,
  qty REAL NOT NULL, -- The number of units ordered like 1 or 2 (Using real for some scenario  of ordering half)
  rate REAL NOT NULL,-- The rate at which the item was billed (by default the one  provided in menu item)

  --Contraints
CONSTRAINT orderItem_fk_orderId FOREIGN KEY (orderId)
REFERENCES Orders(id),
CONSTRAINT orderItem_fk_menuItemId FOREIGN KEY (menuItemId)
REFERENCES MenuItem(id)
);

CREATE INDEX orderItem_ix_orderId ON orderItem(orderId);
CREATE INDEX orderItem_ix_menuItemId ON orderItem(menuItemId);



-- Down





