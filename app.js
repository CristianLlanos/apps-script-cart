function doGet(e) {
  // var params = JSON.stringify(e);
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle("Pedidos");
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function doServe(request) {
  return App.run(request);
}

class Config {
  get bootstrap() {
    return [
      RouteServiceProvider,
    ];
  }
}

const EMPLOYEE = {
  id: {
    attribute: "id",
    target: "Id",
    columnId: 0
  },
  firstName: {
    attribute: "firstName",
    target: "First Name",
    columnId: 1
  },
  lastName: {
    attribute: "lastName",
    target: "Last Name",
    columnId: 2
  },
  job: {
    attribute: "job",
    target: "Job",
    columnId: 3
  },
  email: {
    attribute: "email",
    target: "Email",
    columnId: 4
  },
  createdAt: {
    attribute: "createdAt",
    target: "Created At",
    columnId: 5
  }
};

const PRODUCT = {
  id: {
    attribute: "id",
    target: "Id",
    columnId: 0
  },
  name: {
    attribute: "name",
    target: "Name",
    columnId: 1
  },
  stock: {
    attribute: "stock",
    target: "Stock",
    columnId: 2
  },
  basePrice: {
    attribute: "basePrice",
    target: "Base Price",
    columnId: 3
  },
  baseCurrency: {
    attribute: "baseCurrency",
    target: "Base Currency",
    columnId: 4
  },
  createdAt: {
    attribute: "createdAt",
    target: "Created At",
    columnId: 5
  }
};

const PAYMENT = {
  id: {
    attribute: "id",
    target: "Id",
    columnId: 0
  },
  name: {
    attribute: "name",
    target: "Name",
    columnId: 1
  },
  createdAt: {
    attribute: "createdAt",
    target: "Created At",
    columnId: 2
  }
};

const ORDER = {
  id: {
    attribute: "id",
    target: "Id",
    columnId: 0
  },
  employeeId: {
    attribute: "employeeId",
    target: "Employee Id",
    columnId: 1
  },
  clientId: {
    attribute: "clientId",
    target: "Client Id",
    columnId: 2
  },
  amount: {
    attribute: "amount",
    target: "Amount",
    columnId: 3
  },
  paymentId: {
    attribute: "paymentId",
    target: "Payment Id",
    columnId: 4
  },
  invoiceType: {
    attribute: "invoiceType",
    target: "Invoice Type",
    columnId: 5
  },
  deliveryAddress: {
    attribute: "deliveryAddress",
    target: "Delivery Address",
    columnId: 6
  },
  note: {
    attribute: "note",
    target: "Note",
    columnId: 7
  },
  lastEvent: {
    attribute: "lastEvent",
    target: "Last Event",
    columnId: 8
  },
  updatedAt: {
    attribute: "updatedAt",
    target: "Updated At",
    columnId: 9
  },
  createdAt: {
    attribute: "createdAt",
    target: "Created At",
    columnId: 10
  }
};

const ORDER_ITEM = {
  id: {
    attribute: "id",
    target: "Id",
    columnId: 0
  },
  orderId: {
    attribute: "orderId",
    target: "Order Id",
    columnId: 1
  },
  productId: {
    attribute: "productId",
    target: "Product Id",
    columnId: 2
  },
  quantity: {
    attribute: "quantity",
    target: "Quantity",
    columnId: 3
  },
  sellingPrice: {
    attribute: "sellingPrice",
    target: "Selling Price",
    columnId: 4
  },
  amount: {
    attribute: "amount",
    target: "Amount",
    columnId: 5
  },
  createdAt: {
    attribute: "createdAt",
    target: "Created At",
    columnId: 6
  }
};

const ORDER_LOG = {
  id: {
    attribute: "id",
    target: "Id",
    columnId: 0
  },
  orderId: {
    attribute: "orderId",
    target: "Order Id",
    columnId: 1
  },
  event: {
    attribute: "event",
    target: "Event",
    columnId: 2
  },
  createdAt: {
    attribute: "createdAt",
    target: "Created At",
    columnId: 3
  }
};

class Container {
  constructor() {
    this._dependencies = [];
  }
  singleton(id, definition) {
    if (!this._dependencies[id]) {
      this._dependencies[id] = definition(this);
    }
    return this._dependencies[id];
  }
  get config() {
    return this.singleton('config', () => {
      return new Config();
    });
  }
  get logger() {
    return this.singleton('logger', () => {
      return new ConsoleLogger();
    });
  }
  get errors() {
    return this.singleton('errors', () => {
      return new ErrorHandler(
        this.logger
      );
    });
  }
  get router() {
    return this.singleton('router', () => {
      return new Router(this);
    });
  }
}

class BrowserLogger {
  info(message) {
    Browser.msgBox(message);
  }
  error(message) {
    Browser.msgBox(message);
  }
  debug(message) {
    Browser.msgBox(message);
  }
}

class ConsoleLogger {
  info(message) {
    console.log(message);
  }
  error(message) {
    console.error(message);
  }
  debug(message) {
    console.log(message);
  }
}

class ErrorHandler {
  constructor(logger) {
    this.logger = logger;
  }
  handle(error) {
    this.logger.error(error.message);
    return {
      message: error.message
    }
  }
}

class Router {
  constructor(container) {
    this.container = container;
    this.routes = new Map();
  }
  add(route, action) {
    this.routes.set(route, action);
  }
  make(route) {
    if (!this.routes.has(route)) {
      throw new Error(`Route [${route}] not registered`);
    }
    this.container.logger.info(`Route [${route}] accessed`);
    const RouteAction = this.routes.get(route);
    return new RouteAction(this.container);
  }
}

class Application {
  constructor(container) {
    this.container = container;
  }
  run(rowRequest) {
    try {
      this.bootstrap();
      const request = JSON.parse(rowRequest);
      const controller = this.container.router.make(request.route);
      return controller.handle(request);
    } catch (error) {
      return {
        success: false,
        body: this.container.errors.handle(error)
      };
    }
  }
  bootstrap() {
    this.container.config.bootstrap.forEach((DependencyProvider) => {
      const provider = new DependencyProvider();
      provider.boot(this.container);
    });
  }
}

const App = new Application(new Container());

/**
 * Service Providers
 */

class RouteServiceProvider {
  boot(container) {
    container.router.add('employee.list', EmployeeListAction);
    container.router.add('product.list', ProductListAction);
    container.router.add('payment.list', PaymentListAction);
    container.router.add('checkout', CheckoutAction);
  }
}

/**
 * Actions
 */

class Action {
  constructor(container) {
    this.container = container;
  }
  handle(request) {
    throw new Error(`Action [${request.route}] not implemented`);
  }
}

class ProductListAction extends Action {
  handle() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Product');
    const range = sheet.getDataRange();
    const values = range.getValues();
    let [headings, ...records] = values;
    const list = [];
    records.forEach((record) => {
      const item = {
        [PRODUCT.id.attribute]: record[PRODUCT.id.columnId],
        [PRODUCT.name.attribute]: record[PRODUCT.name.columnId],
        [PRODUCT.stock.attribute]: record[PRODUCT.stock.columnId],
        [PRODUCT.basePrice.attribute]: record[PRODUCT.basePrice.columnId],
        [PRODUCT.baseCurrency.attribute]: record[PRODUCT.baseCurrency.columnId],
      };
      list.push(item);
    });
    return list;
  }
}

class EmployeeListAction extends Action {
  handle() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Employee');
    const range = sheet.getDataRange();
    const values = range.getValues();
    let [headings, ...records] = values;
    const list = [];
    records.forEach((record) => {
      const item = {
        [EMPLOYEE.id.attribute]: record[EMPLOYEE.id.columnId],
        [EMPLOYEE.firstName.attribute]: record[EMPLOYEE.firstName.columnId],
        [EMPLOYEE.job.attribute]: record[EMPLOYEE.job.columnId]
      };
      list.push(item);
    });
    return list;
  }
}

class PaymentListAction extends Action {
  handle() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Payment');
    const range = sheet.getDataRange();
    const values = range.getValues();
    let [headings, ...records] = values;
    const list = [];
    records.forEach((record) => {
      const item = {
        [PAYMENT.id.attribute]: record[PAYMENT.id.columnId],
        [PAYMENT.name.attribute]: record[PAYMENT.name.columnId]
      };
      list.push(item);
    });
    return list;
  }
}

class CheckoutAction extends Action {
  handle(request) {
    const order = new OrderParser(request.body);

    this.saveOrder(order);
    this.saveOrderItems(order);
    
    return {
      orderId: order.id()
    };
  }
  saveOrder(order) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Order');
    
    const values = [];
    values.push(order.asSheetsOrder());
    
    const lastRow = sheet.getLastRow();
    const lastColumn = sheet.getLastColumn();
    const range = sheet.getRange(lastRow + 1, 1, 1, lastColumn);
    
    range.setValues(values);
  }
  saveOrderItems(order) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Order Items');
    
    const values = order.asSheetsOrderItems();

    if (values.length < 1) {
      return;
    }
    
    const lastRow = sheet.getLastRow();
    const lastColumn = sheet.getLastColumn();
    const range = sheet.getRange(lastRow + values.length, 1, 1, lastColumn);
    
    range.setValues(values);
  }
}

class OrderParser {
  constructor(attributes) {
    this.attributes = attributes;
  }
  id() {
    return 'order001';
  }
  totalAmount() {
    return this.attributes.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  createClient() {
    return {
      id: 'client001'
    }
  }
  asSheetsOrder() {
    const now = new Date().toISOString();
    return [
      this.id(),
      this.attributes.employeeId,
      this.createClient().id,
      this.totalAmount(),
      this.attributes.paymentMethodId,
      this.attributes.invoiceTypeId,
      this.attributes.deliveryAddress,
      this.attributes.note,
      'created',
      now,
      now
    ]
  }
  asSheetsOrderItems() {
    const items = [];
    return items;
  }
}