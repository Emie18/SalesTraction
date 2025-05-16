var DataTypes = require("sequelize").DataTypes;
var _Language = require("./Language");
var _account = require("./account");
var _account_match = require("./account_match");
var _account_sector = require("./account_sector");
var _admin = require("./admin");
var _chat = require("./chat");
var _language_student = require("./language_student");
var _message = require("./message");
var _offer = require("./offer");
var _offer_doc = require("./offer_doc");
var _offer_state = require("./offer_state");
var _offer_student = require("./offer_student");
var _region = require("./region");
var _school = require("./school");
var _sector = require("./sector");
var _startup = require("./startup");
var _student = require("./student");
var _work_mode = require("./work_mode");

function initModels(sequelize) {
  var Language = _Language(sequelize, DataTypes);
  var Account = _account(sequelize, DataTypes);
  var AccountMatch = _account_match(sequelize, DataTypes);
  var AccountSector = _account_sector(sequelize, DataTypes);
  var Admin = _admin(sequelize, DataTypes);
  var Chat = _chat(sequelize, DataTypes);
  var LanguageStudent = _language_student(sequelize, DataTypes);
  var Message = _message(sequelize, DataTypes);
  var Offer = _offer(sequelize, DataTypes);
  var OfferDoc = _offer_doc(sequelize, DataTypes);
  var OfferState = _offer_state(sequelize, DataTypes);
  var OfferStudent = _offer_student(sequelize, DataTypes);
  var Region = _region(sequelize, DataTypes);
  var School = _school(sequelize, DataTypes);
  var Sector = _sector(sequelize, DataTypes);
  var StartUp = _startup(sequelize, DataTypes);
  var Student = _student(sequelize, DataTypes);
  var WorkMode = _work_mode(sequelize, DataTypes);

  Language.belongsToMany(Student, { as: 'id_students', through: LanguageStudent, foreignKey: "name", otherKey: "id" });
  Account.belongsToMany(Sector, { as: 'name_sectors', through: AccountSector, foreignKey: "id", otherKey: "name" });
  Sector.belongsToMany(Account, { as: 'id_accounts', through: AccountSector, foreignKey: "name", otherKey: "id" });
  Student.belongsToMany(Language, { as: 'name_Languages', through: LanguageStudent, foreignKey: "id", otherKey: "name" });
  LanguageStudent.belongsTo(Language, { as: "name_Language", foreignKey: "name"});
  Language.hasMany(LanguageStudent, { as: "language_students", foreignKey: "name"});
  AccountSector.belongsTo(Account, { as: "id_account", foreignKey: "id"});
  Account.hasMany(AccountSector, { as: "account_sectors", foreignKey: "id"});
  Chat.belongsTo(Account, { as: "id_account_participant1_account", foreignKey: "id_account_participant1"});
  Account.hasMany(Chat, { as: "chats", foreignKey: "id_account_participant1"});
  Chat.belongsTo(Account, { as: "id_account_account", foreignKey: "id_account"});
  Account.hasMany(Chat, { as: "id_account_chats", foreignKey: "id_account"});
  Message.belongsTo(Account, { as: "id_account_account", foreignKey: "id_account"});
  Account.hasMany(Message, { as: "messages", foreignKey: "id_account"});
  StartUp.belongsTo(Account, { as: "id_account_account", foreignKey: "id_account"});
  Account.hasOne(StartUp, { as: "startup", foreignKey: "id_account"});
  Student.belongsTo(Account, { as: "id_account_account", foreignKey: "id_account"});
  Account.hasOne(Student, { as: "student", foreignKey: "id_account"});
  Message.belongsTo(Chat, { as: "id_chat_chat", foreignKey: "id_chat"});
  Chat.hasMany(Message, { as: "messages", foreignKey: "id_chat"});
  OfferDoc.belongsTo(Offer, { as: "id_offer_offer", foreignKey: "id_offer"});
  Offer.hasMany(OfferDoc, { as: "offer_docs", foreignKey: "id_offer"});
  OfferStudent.belongsTo(Offer, { as: "id_offer_offer", foreignKey: "id_offer"});
  Offer.hasMany(OfferStudent, { as: "offer_students", foreignKey: "id_offer"});
  OfferStudent.belongsTo(OfferState, { as: "name_offer_state", foreignKey: "name"});
  OfferState.hasMany(OfferStudent, { as: "offer_students", foreignKey: "name"});
  Account.belongsTo(Region, { as: "name_region_region", foreignKey: "name_region"});
  Region.hasMany(Account, { as: "accounts", foreignKey: "name_region"});
  Student.belongsTo(School, { as: "name_school", foreignKey: "name"});
  School.hasMany(Student, { as: "students", foreignKey: "name"});
  AccountSector.belongsTo(Sector, { as: "name_sector", foreignKey: "name"});
  Sector.hasMany(AccountSector, { as: "account_sectors", foreignKey: "name"});
  AccountMatch.belongsTo(StartUp, { as: "id_startup_startup", foreignKey: "id_startup"});
  StartUp.hasMany(AccountMatch, { as: "account_matches", foreignKey: "id_startup"});
  Offer.belongsTo(StartUp, { as: "id_startup_startup", foreignKey: "id_startup"});
  StartUp.hasMany(Offer, { as: "offers", foreignKey: "id_startup"});
  AccountMatch.belongsTo(Student, { as: "id_student_student", foreignKey: "id_student"});
  Student.hasMany(AccountMatch, { as: "account_matches", foreignKey: "id_student"});
  LanguageStudent.belongsTo(Student, { as: "id_student", foreignKey: "id"});
  Student.hasMany(LanguageStudent, { as: "language_students", foreignKey: "id"});
  OfferStudent.belongsTo(Student, { as: "id_student", foreignKey: "id"});
  Student.hasMany(OfferStudent, { as: "offer_students", foreignKey: "id"});
  Offer.belongsTo(WorkMode, { as: "nom_work_mode_work_mode", foreignKey: "nom_work_mode"});
  WorkMode.hasMany(Offer, { as: "offers", foreignKey: "nom_work_mode"});

  return {
    Language,
    Account,
    AccountMatch,
    AccountSector,
    Admin,
    Chat,
    LanguageStudent,
    Message,
    Offer,
    OfferDoc,
    OfferState,
    OfferStudent,
    Region,
    School,
    Sector,
    StartUp,
    Student,
    WorkMode,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
