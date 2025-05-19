var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _account_match = require("./account_match");
var _account_sector = require("./account_sector");
var _admin = require("./admin");
var _chat = require("./chat");
var _commission = require("./commission");
var _language = require("./language");
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
  var Account = _account(sequelize, DataTypes);
  var AccountMatch = _account_match(sequelize, DataTypes);
  var AccountSector = _account_sector(sequelize, DataTypes);
  var Admin = _admin(sequelize, DataTypes);
  var Chat = _chat(sequelize, DataTypes);
  var Commission = _commission(sequelize, DataTypes);
  var Language = _language(sequelize, DataTypes);
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

  Account.belongsToMany(Sector, { as: 'sector_sectors', through: AccountSector, foreignKey: "id", otherKey: "sector" });
  Language.belongsToMany(Student, { as: 'id_students', through: LanguageStudent, foreignKey: "lang", otherKey: "id" });
  Sector.belongsToMany(Account, { as: 'id_accounts', through: AccountSector, foreignKey: "sector", otherKey: "id" });
  Student.belongsToMany(Language, { as: 'lang_languages', through: LanguageStudent, foreignKey: "id", otherKey: "lang" });
  AccountSector.belongsTo(Account, { as: "id_account", foreignKey: "id"});
  Account.hasMany(AccountSector, { as: "account_sectors", foreignKey: "id"});
  Chat.belongsTo(Account, { as: "id_account_2_account", foreignKey: "id_account_2"});
  Account.hasMany(Chat, { as: "chats", foreignKey: "id_account_2"});
  Chat.belongsTo(Account, { as: "id_account_1_account", foreignKey: "id_account_1"});
  Account.hasMany(Chat, { as: "id_account_1_chats", foreignKey: "id_account_1"});
  Message.belongsTo(Account, { as: "id_account_account", foreignKey: "id_account"});
  Account.hasMany(Message, { as: "messages", foreignKey: "id_account"});
  StartUp.belongsTo(Account, { as: "id_account_account", foreignKey: "id_account"});
  Account.hasOne(StartUp, { as: "startup", foreignKey: "id_account"});
  Student.belongsTo(Account, { as: "id_account_account", foreignKey: "id_account"});
  Account.hasOne(Student, { as: "student", foreignKey: "id_account"});
  Message.belongsTo(Chat, { as: "id_chat_chat", foreignKey: "id_chat"});
  Chat.hasMany(Message, { as: "messages", foreignKey: "id_chat"});
  Offer.belongsTo(Commission, { as: "commission_offer_commission_commission", foreignKey: "commission_offer_commission"});
  Commission.hasMany(Offer, { as: "offers", foreignKey: "commission_offer_commission"});
  LanguageStudent.belongsTo(Language, { as: "lang_language", foreignKey: "lang"});
  Language.hasMany(LanguageStudent, { as: "language_students", foreignKey: "lang"});
  OfferDoc.belongsTo(Offer, { as: "id_offer_offer", foreignKey: "id_offer"});
  Offer.hasMany(OfferDoc, { as: "offer_docs", foreignKey: "id_offer"});
  OfferStudent.belongsTo(Offer, { as: "id_offer_offer", foreignKey: "id_offer"});
  Offer.hasMany(OfferStudent, { as: "offer_students", foreignKey: "id_offer"});
  OfferStudent.belongsTo(OfferState, { as: "state_offer_state", foreignKey: "state"});
  OfferState.hasMany(OfferStudent, { as: "offer_students", foreignKey: "state"});
  Account.belongsTo(Region, { as: "region_region", foreignKey: "region"});
  Region.hasMany(Account, { as: "accounts", foreignKey: "region"});
  Student.belongsTo(School, { as: "school_school", foreignKey: "school"});
  School.hasMany(Student, { as: "students", foreignKey: "school"});
  AccountSector.belongsTo(Sector, { as: "sector_sector", foreignKey: "sector"});
  Sector.hasMany(AccountSector, { as: "account_sectors", foreignKey: "sector"});
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
  Offer.belongsTo(WorkMode, { as: "work_mode_work_mode", foreignKey: "work_mode"});
  WorkMode.hasMany(Offer, { as: "offers", foreignKey: "work_mode"});
  
  return {
    Account,
    AccountMatch,
    AccountSector,
    Admin,
    Chat,
    Commission,
    Language,
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
