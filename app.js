function onOpen() {
  const menu = [
    {name: 'test', functionName: 'Confirmar despacho'}
  ];
  SpreadsheetApp.getActive().addMenu('More', menu);
}

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle("Pedidos")
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function doServe(request) {
  return App.run(request);
}

function test() {
  const orders = App.container.orders;
  const slack = App.container.slack;
  const order = orders.current();
  const slackThread = JSON.parse(order.slackThread);

  const content = slack.chatPostMessage({
    channel: slackThread.channel,
    thread_ts: slackThread.ts,
    text: 'Despachado'
  });

  order.lastEvent = 'dispatched';
  order.updatedAt = new Date();
  orders.update(order);

  Browser.msgBox(JSON.stringify(content));
}

class Config {
  get bootstrap() {
    return [
      EventServiceProvider,
      RouteServiceProvider,
    ];
  }

  get slackToken() {
    return PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN');
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
  slackThread: {
    attribute: "slackThread",
    target: "Slack Thread",
    columnId: 9
  },
  lastEvent: {
    attribute: "lastEvent",
    target: "Last Event",
    columnId: 10
  },
  updatedAt: {
    attribute: "updatedAt",
    target: "Updated At",
    columnId: 11
  },
  createdAt: {
    attribute: "createdAt",
    target: "Created At",
    columnId: 12
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

  /**
   * @returns {Container}
   */
  get container() {
    return this.singleton('container', () => {
      return this;
    });
  }

  /**
   * @returns {Config}
   */
  get config() {
    return this.singleton('config', () => {
      return new Config();
    });
  }

  /**
   * @returns {ConsoleLogger}
   */
  get logger() {
    return this.singleton('logger', () => {
      return new ConsoleLogger();
    });
  }

  /**
   * @returns {EventHandler}
   */
  get events() {
    return this.singleton('events', () => {
      return new EventHandler(
        this.container,
        this.logger
      );
    });
  }

  /**
   * @returns {ErrorHandler}
   */
  get errors() {
    return this.singleton('errors', () => {
      return new ErrorHandler(
        this.logger
      );
    });
  }

  /**
   * @returns {Router}
   */
  get router() {
    return this.singleton('router', () => {
      return new Router(this.container);
    });
  }

  /**
   * @returns {Slack}
   */
  get slack() {
    return this.singleton('slack', () => {
      return new Slack(
        this.logger,
        this.config.slackToken
      );
    });
  }

  /**
   * @returns {EmployeeRepository}
   */
  get employees() {
    return this.singleton('employees', () => {
      return new EmployeeRepository(
        SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Employee')
      );
    });
  }

  /**
   * @returns {OrderRepository}
   */
  get orders() {
    return this.singleton('orders', () => {
      return new OrderRepository(
        SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Order')
      );
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
    this.logger.error(error);
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
  /**
   * @param {Container} container
   */
  constructor(container) {
    this.container = container;
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
 * Repositories
 */

class EmployeeRepository {
  constructor(sheet) {
    this.sheet = sheet;
    this.allRawCache = null;
  }

  findById(id) {
    const record = this.allRaw()
      .find(subject => {
        return subject[EMPLOYEE.id.columnId] == id;
      });

    if (!record) {
      throw new Error(`Employee with id [${id}] not found`);
    }

    const employee = {
      [EMPLOYEE.id.attribute]: record[EMPLOYEE.id.columnId],
      [EMPLOYEE.nickname.attribute]: record[EMPLOYEE.nickname.columnId],
      [EMPLOYEE.firstName.attribute]: record[EMPLOYEE.firstName.columnId],
      [EMPLOYEE.lastName.attribute]: record[EMPLOYEE.lastName.columnId],
      [EMPLOYEE.job.attribute]: record[EMPLOYEE.job.columnId],
      [EMPLOYEE.email.attribute]: record[EMPLOYEE.email.columnId],
      [EMPLOYEE.slackUsername.attribute]: record[EMPLOYEE.slackUsername.columnId],
      [EMPLOYEE.createdAt.attribute]: record[EMPLOYEE.createdAt.columnId]
    };

    return employee;
  }

  allRaw() {
    if (!this.allRawCache) {
      const range = this.sheet.getDataRange();
      this.allRawCache = range.getValues();
    }

    return this.allRawCache;
  }
}

class OrderRepository {
  constructor(sheet) {
    this.sheet = sheet;
    this.allRawCache = null;
  }

  findById(id) {
    let rowId = null;
    const record = this.allRaw()
      .find((subject, index) => {
        rowId = index + 1;
        return subject[ORDER.id.columnId] == id;
      });

    if (!record) {
      throw new Error(`Order with id [${id}] not found`);
    }

    return this.parse(rowId, record);
  }

  allRaw() {
    if (!this.allRawCache) {
      const range = this.sheet.getDataRange();
      this.allRawCache = range.getValues();
    }

    return this.allRawCache;
  }

  update(resource) {
    if (!resource.rowId) {
      throw new Error(`Order should be assinged a rowId before updating`);
    }

    this.allRawCache = null;

    const range = this.sheet.getRange(resource.rowId, 1, 1, Object.keys(ORDER).length);

    return range.setValues([
      [
        resource[ORDER.id.attribute],
        resource[ORDER.employeeId.attribute],
        resource[ORDER.clientId.attribute],
        resource[ORDER.currency.attribute],
        resource[ORDER.amount.attribute],
        resource[ORDER.paymentId.attribute],
        resource[ORDER.invoiceType.attribute],
        resource[ORDER.deliveryAddress.attribute],
        resource[ORDER.note.attribute],
        resource[ORDER.slackThread.attribute],
        resource[ORDER.lastEvent.attribute],
        resource[ORDER.updatedAt.attribute],
        resource[ORDER.createdAt.attribute]
      ]
    ])
  }

  current() {
    const rowId = this.sheet.getCurrentCell().getRow();

    if (rowId == 1) {
      throw new Error('Debes seleccionar una fila que contenga una orden');
    }

    const numberOfColumns = this.sheet.getLastColumn();
    const range = this.sheet.getRange(rowId, 1, 1, numberOfColumns);
    const record = range.getValues().shift();

    return this.parse(rowId, record);
  }

  parse(rowId, record) {
    return {
      rowId,
      [ORDER.id.attribute]: record[ORDER.id.columnId],
      [ORDER.employeeId.attribute]: record[ORDER.employeeId.columnId],
      [ORDER.clientId.attribute]: record[ORDER.clientId.columnId],
      [ORDER.currency.attribute]: record[ORDER.currency.columnId],
      [ORDER.amount.attribute]: record[ORDER.amount.columnId],
      [ORDER.paymentId.attribute]: record[ORDER.paymentId.columnId],
      [ORDER.invoiceType.attribute]: record[ORDER.invoiceType.columnId],
      [ORDER.deliveryAddress.attribute]: record[ORDER.deliveryAddress.columnId],
      [ORDER.note.attribute]: record[ORDER.note.columnId],
      [ORDER.slackThread.attribute]: record[ORDER.slackThread.columnId],
      [ORDER.lastEvent.attribute]: record[ORDER.lastEvent.columnId],
      [ORDER.updatedAt.attribute]: record[ORDER.updatedAt.columnId],
      [ORDER.createdAt.attribute]: record[ORDER.createdAt.columnId]
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
  /**
   * @param {Container} container
   */
  constructor(container) {
    this.logger = container.logger;
    this.employees = container.employees;
    this.orders = container.orders;
    this.slack = container.slack;
  }

  /**
   * @param {OrderPurchasedEvent} event
   */
  handle(event) {
    const employee = this.employees.findById(event.orderEmployeeId);
    const body = {
      channel: '#orders',
      text: `Nuevo pedido de @${employee.slackUsername}`,
      blocks: [
        {
          type: "section",
          fields: [
            {
              type: 'mrkdwn',
              text: `*Rep*:\n@${employee.slackUsername}`
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

    const message = this.slack.chatPostMessage(body);

    // Update order
    const order = this.orders.findById(event.orderId);

    order.slackThread = JSON.stringify({
      channel: message.channel,
      ts: message.ts
    });

    this.orders.update(order);

    return message;
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
      id: Utilities.getUuid().toUpperCase(),
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
        Utilities.getUuid().toUpperCase(),
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
    this._id = Utilities.getUuid().toUpperCase();
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
      '', // Slack Thread
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

/**
 * Third Party Integrations
 */

class Slack {
  /**
   *
   * @param {ConsoleLogger} logger
   * @param {String} token
   * @param {String} host
   */
  constructor(logger, token, host = 'https://slack.com') {
    this.logger = logger;
    this.token = token;
    this.host = host;
  }

  asUrl(path) {
    return `${this.host}/api/${path}`
  }

  asParams(payload) {
    return {
      method: 'post',
      contentType: 'application/json; charset=utf-8',
      headers: {
        "accept": "application/json",
        "authorization": `Bearer ${this.token}`,
        "dataformat": "json",
        "user-agent": "Reliese Bot"
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };
  }

  chatPostMessage(payload) {
    const url = this.asUrl('chat.postMessage');
    const params = this.asParams(payload);

    this.logger.debug('Calling ' + url);
    const response = UrlFetchApp.fetch(url, params);
    this.logger.debug('Posting ' + response.getContentText());

    return JSON.parse(response.getContentText());
  }
}

const App = new Application(new Container());