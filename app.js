function doGet(e) {
  // var params = JSON.stringify(e);
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle("Pedidos")
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function onOpen() {
  const menu = [
    {name: 'dates', functionName: 'dates'}
  ];
  SpreadsheetApp.getActive().addMenu('More', menu);
}

function dates() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Employee');
  const employeeId = 1;
  const range = sheet.getDataRange();
  const employeeRecord = range.getValues().find(record => {
    return record[EMPLOYEE.id.columnId] == employeeId;
  })
  Browser.msgBox(JSON.stringify(employeeRecord));
  // cell.setValue(new Date());
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
      EventServiceProvider,
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
  nickname: {
    attribute: "nickname",
    target: "Nickname",
    columnId: 1
  },
  firstName: {
    attribute: "firstName",
    target: "First Name",
    columnId: 2
  },
  lastName: {
    attribute: "lastName",
    target: "Last Name",
    columnId: 3
  },
  job: {
    attribute: "job",
    target: "Job",
    columnId: 4
  },
  email: {
    attribute: "email",
    target: "Email",
    columnId: 5
  },
  slackUsername: {
    attribute: "slackUsername",
    target: "Slack Username",
    columnId: 6
  },
  createdAt: {
    attribute: "createdAt",
    target: "Created At",
    columnId: 7
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

const CURRENCY = {
  id: {
    attribute: "id",
    target: "Id",
    columnId: 0
  },
  symbol: {
    attribute: "symbol",
    target: "Symbol",
    columnId: 1
  }
};

const CLIENT = {
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
  type: {
    attribute: "type",
    target: "Client Id",
    columnId: 2
  },
  firstName: {
    attribute: "firstName",
    target: "First Name",
    columnId: 3
  },
  lastName: {
    attribute: "lastName",
    target: "Last Name",
    columnId: 4
  },
  phoneNumber: {
    attribute: "phoneNumber",
    target: "Phone Number",
    columnId: 5
  },
  email: {
    attribute: "email",
    target: "Email",
    columnId: 6
  },
  preferredDeliveryAddress: {
    attribute: "preferredDeliveryAddress",
    target: "Preferred Delivery Address",
    columnId: 7
  },
  documentType: {
    attribute: "documentType",
    target: "Document Type",
    columnId: 8
  },
  documentCode: {
    attribute: "documentCode",
    target: "Document Code",
    columnId: 9
  },
  createdAt: {
    attribute: "createdAt",
    target: "Created At",
    columnId: 10
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
  currency: {
    attribute: "currency",
    target: "Currency",
    columnId: 3
  },
  amount: {
    attribute: "amount",
    target: "Amount",
    columnId: 4
  },
  paymentId: {
    attribute: "paymentId",
    target: "Payment Id",
    columnId: 5
  },
  invoiceType: {
    attribute: "invoiceType",
    target: "Invoice Type",
    columnId: 6
  },
  deliveryAddress: {
    attribute: "deliveryAddress",
    target: "Delivery Address",
    columnId: 7
  },
  note: {
    attribute: "note",
    target: "Note",
    columnId: 8
  },
  lastEvent: {
    attribute: "lastEvent",
    target: "Last Event",
    columnId: 9
  },
  updatedAt: {
    attribute: "updatedAt",
    target: "Updated At",
    columnId: 10
  },
  createdAt: {
    attribute: "createdAt",
    target: "Created At",
    columnId: 11
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
  currency: {
    attribute: "currency",
    target: "Currency",
    columnId: 5
  },
  amount: {
    attribute: "amount",
    target: "Amount",
    columnId: 6
  },
  createdAt: {
    attribute: "createdAt",
    target: "Created At",
    columnId: 7
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
  get container() {
    return this.singleton('container', () => {
      return this;
    });
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
  get events() {
    return this.singleton('events', () => {
      return new EventHandler(
        this.container,
        this.logger
      );
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
      return new Router(this.container);
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

class EventHandler {
  constructor(container, logger) {
    this.container = container;
    this.logger = logger;
    this.listeners = new Map();
  }
  listen(EventDefinition, listenerDefinitions) {
    listenerDefinitions.forEach(ListenerDefinition => {
      this.on(EventDefinition, ListenerDefinition);
    });
    return this;
  }
  on(EventDefinition, ListenerDefinition) {
    const group = EventDefinition.name;
    if (!this.listeners.has(group)) {
      this.listeners.set(group, []);
    }
    this.listeners.get(group).push(ListenerDefinition);
    return this;
  }
  emit(event) {
    const group = event.constructor.name;
    if (!this.listeners.has(group)) {
      this.logger.error('No listeners for event [' + group + ']');
      return;
    }
    this.listeners.get(group).forEach((ListenerDefinition) => {
      new ListenerDefinition(this.container).handle(event);
    })
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
    return new RouteAction(
      this.container,
      this.container.events
    );
  }
}

/**
 * Application
 */

class Application {
  constructor(container) {
    this.container = container;
    // this.container.singleton('app', () => this);
    this.config = this.container.config;
    this.errors = this.container.errors;
    this.router = this.container.router;
    this.bootstrap();
  }
  bootstrap() {
    this.config.bootstrap.forEach((DependencyProvider) => {
      const provider = new DependencyProvider();
      provider.boot(this.container);
    });
  }
  run(request) {
    try {
      return this.process(this.parse(request));
    } catch (error) {
      return this.fail(error);
    }
  }
  parse(request) {
    return JSON.parse(request);
  }
  process(command) {
    return this.router.make(command.route).handle(command);
  }
  fail(error) {
    return {
      success: false,
      body: this.errors.handle(error)
    };
  }
}

/**
 * Events
 */

class OrderPurchasedEvent {
  /**
   * @param {OrderParser} order 
   */
  constructor(order) {
    this.order = order;
  }
  get orderId() {
    return this.order.id;
  }
  get orderEmployeeId() {
    return this.order.attributes.employeeId;
  }
  get orderClientId() {
    return this.order.client.id;
  }
  get orderClientCode() {
    return this.order.client.documentCode;
  }
  get orderItems() {
    return this.order.attributes.items;
  }
  get orderTotalAmount() {
    return this.order.totalAmount;
  }
}

/**
 * Listeners
 */

class PostOrderOnSlackListener {
  constructor(container) {
    this.logger = container.logger;
  }

  /**
   * @param {OrderPurchasedEvent} event
   */
  handle(event) {
    const body = {
      channel: '#orders',
      text: 'Nuevo pedido',
      blocks: [
        {
          type: "section",
          fields: [
            {
              type: 'mrkdwn',
              text: `*Rep*:\n${event.orderEmployeeId}`
            },
            {
              type: 'mrkdwn',
              text: `*Client*:\n${event.orderClientCode}`
            },
            {
              type: 'mrkdwn',
              text: `*Order*:\n${event.orderId}`
            }
          ]
        },
        {
          type: "section",
          fields: event.orderItems.map(item => {
            return {
                type: 'mrkdwn',
                text: `*${item.name}*: ${item.quantity}`
            };
          })
        },
      ],
      attachments: [
        {
            color: "#2eb886",
            text: 'Total: S/ ' + event.orderTotalAmount,
            ts: Math.floor(Date.now() / 1000)
        }
      ]
    };
    const params = {
      method: 'post',
      contentType: 'application/json; charset=utf-8',
      headers: {
        "accept": "application/json",
        "authorization": 'Bearer xoxb-1247060594992-1235859724593-xXKmEizMEplXZVRnFEbnaG5A',
        "dataformat": "json",
        "user-agent": "Reliese Bot"
      },
      payload: JSON.stringify(body),
      muteHttpExceptions: true
    };
    const url = 'https://slack.com/api/chat.postMessage';
    this.logger.debug('Calling ' + url);
    const response = UrlFetchApp.fetch(url, params);
    this.logger.info('Posting order ' + response.getContentText());
    const content = JSON.parse(response.getContentText());
    return content;
  }
}

/**
 * Actions
 */

class Action {
  constructor(container, events) {
    this.container = container;
    this.events = events;
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
        [EMPLOYEE.nickname.attribute]: record[EMPLOYEE.nickname.columnId],
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

class CurrencyListAction extends Action {
  handle() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Currency');
    const range = sheet.getDataRange();
    const values = range.getValues();
    let [headings, ...records] = values;
    const list = [];
    records.forEach((record) => {
      const item = {
        [CURRENCY.id.attribute]: record[CURRENCY.id.columnId],
        [CURRENCY.symbol.attribute]: record[CURRENCY.symbol.columnId]
      };
      list.push(item);
    });
    return list;
  }
}

class CheckoutAction extends Action {
  handle(request) {
    const order = new OrderParser(request.body);

    this.saveClient(order);
    this.saveOrder(order);
    this.saveOrderItems(order);

    this.events.emit(new OrderPurchasedEvent(order));
    
    return {
      orderId: order.id
    };
  }
  /**
   * @param {OrderParser} order 
   */
  saveClient(order) {
    const now = new Date();
    const client = {
      id: Utilities.getUuid(),
      employeeId: order.attributes.employeeId,
      type: order.attributes.client.type,
      firstName: order.attributes.client.firstName,
      lastName: order.attributes.client.lastName,
      phone: order.attributes.client.phone,
      email: order.attributes.client.email,
      preferredDeliveryAddress: order.attributes.deliveryAddress,
      documentType: order.attributes.documentType,
      documentCode: order.attributes.documentCode,
      createdAt: now
    };

    order.withClient(client);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Client');
    
    const values = [
      client.id,
      client.employeeId,
      client.type,
      client.firstName,
      client.lastName,
      client.phone,
      client.email,
      client.preferredDeliveryAddress,
      client.documentType,
      client.documentCode,
      client.createdAt
    ];
    
    sheet.appendRow(values);
  }
  /**
   * @param {OrderParser} order 
   */
  saveOrder(order) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Order');
    sheet.appendRow(order.asSheetsOrder());
  }
  /**
   * @param {OrderParser} order 
   */
  saveOrderItems(order) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Order Item');
    
    const createdAt = new Date();
    const values = [];

    order.attributes.items.forEach((item) => {
      values.push([
        Utilities.getUuid(),
        order.id,
        item.id,
        item.quantity,
        item.price,
        order.currency,
        item.quantity * item.price,
        createdAt
      ]);
    });

    if (values.length < 1) {
      return;
    }
    
    const lastRow = sheet.getLastRow();
    const lastColumn = sheet.getLastColumn();
    const range = sheet.getRange(lastRow + 1, 1, values.length, lastColumn);
    
    range.setValues(values);
  }
}

class OrderParser {
  constructor(attributes) {
    this.attributes = attributes;
    this._id = Utilities.getUuid();
  }
  withClient(client) {
    this._client = client;
  }
  get client() {
    return this._client;
  }
  get currency() {
    return this.attributes.currencyId;
  }
  get id() {
    return this._id;
  }
  get totalAmount() {
    return this.attributes.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  createClient() {
    return {
      id: 'client001'
    }
  }
  asSheetsOrder() {
    const now = new Date();
    return [
      this.id,
      this.attributes.employeeId,
      this._client.id,
      this.currency,
      this.totalAmount,
      this.attributes.paymentMethodId,
      this.attributes.invoiceTypeId,
      this.attributes.deliveryAddress,
      this.attributes.note,
      'created',
      now,
      now
    ]
  }
}

/**
 * Service Providers
 */

class EventServiceProvider {
  boot(container) {
    container.events.listen(OrderPurchasedEvent, [
      PostOrderOnSlackListener,
    ]);
  }
}

class RouteServiceProvider {
  boot(container) {
    container.router.add('employee.list', EmployeeListAction);
    container.router.add('product.list', ProductListAction);
    container.router.add('payment.list', PaymentListAction);
    container.router.add('currency.list', CurrencyListAction);
    container.router.add('checkout', CheckoutAction);
  }
}

const App = new Application(new Container());