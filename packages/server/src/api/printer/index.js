// The all queue dictionary
const queue = {};

class Queue {
  constructor(type) {
    this.type = type;
    this.items = [];
    this.serial = 1;
    this.printer = null;
  }

  registerPrinter(printer) {
    this.printer = printer;

    // As soon as the printer is registered, print if there is anything to print
    if (this.items.length > 0) {
      this.print();
    }
  }

  unregisterPrinter(printer) {
    if (this.printer === printer) {
      this.printer = null;
    }
  }

  append(data) {
    // First push the data into array
    this.items.push(data);
    // If this is the first packet, send the data for printing
    if (this.items.length === 1 && this.printer) {
      this.print();
    }
  }

  printComplete(serial) {
    if (this.serial !== serial) {
      // Invalid print complete signal, ignore
      return;
    }

    // Remove the item that has been printed
    this.items.shift();
    this.serial += 1;

    // If there is something else in the queue, continue with the printing
    if (this.items.length > 0 && this.printer) {
      this.print();
    }
  }

  print() {
    if (this.items.length > 0 && this.printer) {
      this.printer.emit(`${this.type}_PRINT`, { data: this.items[0], serial: this.serial });
    }
  }
}

function getQueue(type) {
  const q = queue[type];
  if (q) {
    return q;
  }

  const nq = new Queue(type);
  queue[type] = nq;
  return nq;
}

export function printed(type, serial) {
  getQueue(type).printComplete(serial);
}

export default {
  queue: (type, data) => {
    getQueue(type).append(data);
  },

  register: (type, session) => {
    getQueue(type).registerPrinter(session);
  },

  unregister: (type, session) => {
    getQueue(type).unregisterPrinter(session);
  },
};
