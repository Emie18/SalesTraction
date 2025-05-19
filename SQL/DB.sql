#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: sector
#------------------------------------------------------------

CREATE TABLE sector(
        sector Varchar (255) NOT NULL
	,CONSTRAINT sector_PK PRIMARY KEY (sector)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: language
#------------------------------------------------------------

CREATE TABLE language(
        lang Varchar (255) NOT NULL
	,CONSTRAINT language_PK PRIMARY KEY (lang)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: school
#------------------------------------------------------------

CREATE TABLE school(
        school  Varchar (255) NOT NULL ,
        adresse Varchar (255) NOT NULL
	,CONSTRAINT school_PK PRIMARY KEY (school)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: work_mode
#------------------------------------------------------------

CREATE TABLE work_mode(
        work_mode Varchar (255) NOT NULL
	,CONSTRAINT work_mode_PK PRIMARY KEY (work_mode)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: region
#------------------------------------------------------------

CREATE TABLE region(
        region Varchar (255) NOT NULL
	,CONSTRAINT region_PK PRIMARY KEY (region)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: offer_state
#------------------------------------------------------------

CREATE TABLE offer_state(
        state Varchar (255) NOT NULL
	,CONSTRAINT offer_state_PK PRIMARY KEY (state)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: admin
#------------------------------------------------------------

CREATE TABLE admin(
        id       Int  Auto_increment  NOT NULL ,
        email    Varchar (255) NOT NULL ,
        password Varchar (255) NOT NULL
	,CONSTRAINT admin_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: account
#------------------------------------------------------------

CREATE TABLE account(
        id          Int  Auto_increment  NOT NULL ,
        type        Varchar (255) NOT NULL ,
        name        Varchar (255) NOT NULL ,
        email       Varchar (255) NOT NULL ,
        image       Varchar (255) ,
        password    Varchar (255) NOT NULL ,
        description Text NOT NULL ,
        linkedin    Varchar (255) ,
        region      Varchar (255) NOT NULL
	,CONSTRAINT account_PK PRIMARY KEY (id)

	,CONSTRAINT account_region_FK FOREIGN KEY (region) REFERENCES region(region)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: startup
#------------------------------------------------------------

CREATE TABLE startup(
        id         Int  Auto_increment  NOT NULL ,
        siret      Varchar (255) NOT NULL ,
        is_valid   Bool ,
        id_account Int NOT NULL
	,CONSTRAINT startup_PK PRIMARY KEY (id)

	,CONSTRAINT startup_account_FK FOREIGN KEY (id_account) REFERENCES account(id)
	,CONSTRAINT startup_account_AK UNIQUE (id_account)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: student
#------------------------------------------------------------

CREATE TABLE student(
        id            Int  Auto_increment  NOT NULL ,
        surname       Varchar (255) NOT NULL ,
        disponibility Varchar (255) NOT NULL ,
        school        Varchar (255) ,
        id_account    Int NOT NULL
	,CONSTRAINT student_PK PRIMARY KEY (id)

	,CONSTRAINT student_school_FK FOREIGN KEY (school) REFERENCES school(school)
	,CONSTRAINT student_account0_FK FOREIGN KEY (id_account) REFERENCES account(id)
	,CONSTRAINT student_account_AK UNIQUE (id_account)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: chat
#------------------------------------------------------------

CREATE TABLE chat(
        id                      Int  Auto_increment  NOT NULL ,
        id_account_1              Int NOT NULL ,
        id_account_2 Int NOT NULL
	,CONSTRAINT chat_PK PRIMARY KEY (id)

	,CONSTRAINT chat_account_FK FOREIGN KEY (id_account_1) REFERENCES account(id)
	,CONSTRAINT chat_account0_FK FOREIGN KEY (id_account_2) REFERENCES account(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: message
#------------------------------------------------------------

CREATE TABLE message(
        id         Int  Auto_increment  NOT NULL ,
        date       Datetime NOT NULL ,
        message    Varchar (255) NOT NULL ,
        id_chat    Int NOT NULL ,
        id_account Int NOT NULL
	,CONSTRAINT message_PK PRIMARY KEY (id)

	,CONSTRAINT message_chat_FK FOREIGN KEY (id_chat) REFERENCES chat(id)
	,CONSTRAINT message_account0_FK FOREIGN KEY (id_account) REFERENCES account(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: account_match
#------------------------------------------------------------

CREATE TABLE account_match(
        id         Int  Auto_increment  NOT NULL ,
        id_startup Int NOT NULL ,
        id_student Int NOT NULL
	,CONSTRAINT account_match_PK PRIMARY KEY (id)

	,CONSTRAINT account_match_startup_FK FOREIGN KEY (id_startup) REFERENCES startup(id)
	,CONSTRAINT account_match_student0_FK FOREIGN KEY (id_student) REFERENCES student(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: commission
#------------------------------------------------------------

CREATE TABLE commission(
        commission Varchar (255) NOT NULL
	,CONSTRAINT commission_PK PRIMARY KEY (commission)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: offer
#------------------------------------------------------------

CREATE TABLE offer(
        id                          Int  Auto_increment  NOT NULL ,
        name                        Varchar (255) NOT NULL ,
        product                     Varchar (255) NOT NULL ,
        pitch                       Varchar (255) NOT NULL ,
        range_offer                 Varchar (255) NOT NULL ,
        commission                  Varchar (255) NOT NULL ,
        client                      Varchar (255) NOT NULL ,
        work_mode                   Varchar (255) NOT NULL ,
        id_startup                  Int NOT NULL ,
        commission_offer_commission Varchar (255) NOT NULL
	,CONSTRAINT offer_PK PRIMARY KEY (id)

	,CONSTRAINT offer_work_mode_FK FOREIGN KEY (work_mode) REFERENCES work_mode(work_mode)
	,CONSTRAINT offer_startup0_FK FOREIGN KEY (id_startup) REFERENCES startup(id)
	,CONSTRAINT offer_commission1_FK FOREIGN KEY (commission_offer_commission) REFERENCES commission(commission)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: offer_doc
#------------------------------------------------------------

CREATE TABLE offer_doc(
        id       Int  Auto_increment  NOT NULL ,
        path     Varchar (255) NOT NULL ,
        name     Varchar (255) NOT NULL ,
        id_offer Int NOT NULL
	,CONSTRAINT offer_doc_PK PRIMARY KEY (id)

	,CONSTRAINT offer_doc_offer_FK FOREIGN KEY (id_offer) REFERENCES offer(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: language_student
#------------------------------------------------------------

CREATE TABLE language_student(
        id    Int NOT NULL ,
        lang  Varchar (255) NOT NULL ,
        natif Bool NOT NULL
	,CONSTRAINT language_student_PK PRIMARY KEY (id,lang)

	,CONSTRAINT language_student_student_FK FOREIGN KEY (id) REFERENCES student(id)
	,CONSTRAINT language_student_language0_FK FOREIGN KEY (lang) REFERENCES language(lang)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: offer_student
#------------------------------------------------------------

CREATE TABLE offer_student(
        id         Int NOT NULL ,
        id_offer   Int NOT NULL ,
        state      Varchar (255) NOT NULL ,
        motivation Varchar (255) NOT NULL
	,CONSTRAINT offer_student_PK PRIMARY KEY (id,id_offer,state)

	,CONSTRAINT offer_student_student_FK FOREIGN KEY (id) REFERENCES student(id)
	,CONSTRAINT offer_student_offer0_FK FOREIGN KEY (id_offer) REFERENCES offer(id)
	,CONSTRAINT offer_student_offer_state1_FK FOREIGN KEY (state) REFERENCES offer_state(state)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: account_sector
#------------------------------------------------------------

CREATE TABLE account_sector(
        id     Int NOT NULL ,
        sector Varchar (255) NOT NULL
	,CONSTRAINT account_sector_PK PRIMARY KEY (id,sector)

	,CONSTRAINT account_sector_account_FK FOREIGN KEY (id) REFERENCES account(id)
	,CONSTRAINT account_sector_sector0_FK FOREIGN KEY (sector) REFERENCES sector(sector)
)ENGINE=InnoDB;

