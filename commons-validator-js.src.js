var CommonsValidator =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EmailValidator = exports.DomainValidator = undefined;

	var _DomainValidator = __webpack_require__(1);

	var _EmailValidator = __webpack_require__(5);

	exports.DomainValidator = _DomainValidator.DomainValidator;
	exports.EmailValidator = _EmailValidator.EmailValidator;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DomainValidator = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Domains = __webpack_require__(2);

	var Domains = _interopRequireWildcard(_Domains);

	var _lodash = __webpack_require__(3);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _punycode = __webpack_require__(4);

	var punycode = _interopRequireWildcard(_punycode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DomainValidator = exports.DomainValidator = function () {
		/**
	  * @param allowLocal   Should local addresses be considered valid?
	  */
		function DomainValidator() {
			var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			var _ref$allowLocal = _ref.allowLocal;
			var allowLocal = _ref$allowLocal === undefined ? false : _ref$allowLocal;

			_classCallCheck(this, DomainValidator);

			var domainLabelRegex = "[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?";
			var topLabelRegex = "[a-zA-Z](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?";
			var domainNameRegex = "^(?:" + domainLabelRegex + "\\.)*(" + topLabelRegex + ")\\.?$";
			this._domainRegex = new RegExp(domainNameRegex);
		}

		_createClass(DomainValidator, [{
			key: "_chompLeadingDot",
			value: function _chompLeadingDot(str) {
				if (str[0] === ".") {
					return str.substring(1);
				}
				return str;
			}
		}, {
			key: "_unicodeToASCII",
			value: function _unicodeToASCII(input) {
				return punycode.toASCII(input);
			}
		}, {
			key: "_arrayContains",
			value: function _arrayContains(sortedArray, key) {
				// TODO: use binary search
				return _lodash2.default.includes(sortedArray, key);
			}
		}, {
			key: "isValidCountryCodeTld",
			value: function isValidCountryCodeTld(ccTld) {
				var key = this._chompLeadingDot(this._unicodeToASCII(ccTld).toLowerCase());
				return this._arrayContains(Domains.countryCodeTlds, key);
			}
		}, {
			key: "isValidGenericTld",
			value: function isValidGenericTld(gTld) {
				var key = this._chompLeadingDot(this._unicodeToASCII(gTld).toLowerCase());
				return this._arrayContains(Domains.genericTlds, key);
			}
		}, {
			key: "isValidInfrastructureTld",
			value: function isValidInfrastructureTld(iTld) {
				var key = this._chompLeadingDot(this._unicodeToASCII(iTld).toLowerCase());
				return this._arrayContains(Domains.infrastructureTlds, key);
			}
		}, {
			key: "isValidTld",
			value: function isValidTld(tld) {
				tld = this._unicodeToASCII(tld);
				return this.isValidInfrastructureTld(tld) || this.isValidGenericTld(tld) || this.isValidCountryCodeTld(tld);
			}
		}, {
			key: "extractTld",
			value: function extractTld(domain) {
				if (!domain) {
					return false;
				}

				domain = this._unicodeToASCII(domain);
				if (domain.length > 253) {
					return false;
				}
				var groups = domain.match(this._domainRegex);
				if (groups) {
					return groups[1];
				}
				return null;
			}
		}, {
			key: "isValid",
			value: function isValid(domain) {
				if (!domain) {
					return false;
				}

				domain = this._unicodeToASCII(domain);
				if (domain.length > 253) {
					return false;
				}
				var groups = domain.match(this._domainRegex);
				if (groups) {}
				if (groups && groups.length > 1) {
					return this.isValidTld(groups[1]) && groups[0] !== groups[1];
				}
				return false;
			}
		}]);

		return DomainValidator;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	/** Ported from org.apache.commons.validator.routines.DomainValidator */

	// WARNING: this array MUST be sorted, otherwise it cannot be searched reliably using binary search

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var infrastructureTlds = exports.infrastructureTlds = ["arpa"];

	// WARNING: this array MUST be sorted, otherwise it cannot be searched reliably using binary search
	var genericTlds = exports.genericTlds = ["aaa", // aaa American Automobile Association, Inc.
	"aarp", // aarp AARP
	"abb", // abb ABB Ltd
	"abbott", // abbott Abbott Laboratories, Inc.
	"abogado", // abogado Top Level Domain Holdings Limited
	"academy", // academy Half Oaks, LLC
	"accenture", // accenture Accenture plc
	"accountant", // accountant dot Accountant Limited
	"accountants", // accountants Knob Town, LLC
	"aco", // aco ACO Severin Ahlmann GmbH &amp; Co. KG
	"active", // active The Active Network, Inc
	"actor", // actor United TLD Holdco Ltd.
	"ads", // ads Charleston Road Registry Inc.
	"adult", // adult ICM Registry AD LLC
	"aeg", // aeg Aktiebolaget Electrolux
	"aero", // aero Societe Internationale de Telecommunications Aeronautique (SITA INC USA)
	"afl", // afl Australian Football League
	"agency", // agency Steel Falls, LLC
	"aig", // aig American International Group, Inc.
	"airforce", // airforce United TLD Holdco Ltd.
	"airtel", // airtel Bharti Airtel Limited
	"allfinanz", // allfinanz Allfinanz Deutsche Vermögensberatung Aktiengesellschaft
	"alsace", // alsace REGION D ALSACE
	"amica", // amica Amica Mutual Insurance Company
	"amsterdam", // amsterdam Gemeente Amsterdam
	"android", // android Charleston Road Registry Inc.
	"apartments", // apartments June Maple, LLC
	"app", // app Charleston Road Registry Inc.
	"apple", // apple Apple Inc.
	"aquarelle", // aquarelle Aquarelle.com
	"aramco", // aramco Aramco Services Company
	"archi", // archi STARTING DOT LIMITED
	"army", // army United TLD Holdco Ltd.
	"arte", // arte Association Relative à la Télévision Européenne G.E.I.E.
	"asia", // asia DotAsia Organisation Ltd.
	"associates", // associates Baxter Hill, LLC
	"attorney", // attorney United TLD Holdco, Ltd
	"auction", // auction United TLD HoldCo, Ltd.
	"audio", // audio Uniregistry, Corp.
	"auto", // auto Uniregistry, Corp.
	"autos", // autos DERAutos, LLC
	"axa", // axa AXA SA
	"azure", // azure Microsoft Corporation
	"band", // band United TLD Holdco, Ltd
	"bank", // bank fTLD Registry Services, LLC
	"bar", // bar Punto 2012 Sociedad Anonima Promotora de Inversion de Capital Variable
	"barcelona", // barcelona Municipi de Barcelona
	"barclaycard", // barclaycard Barclays Bank PLC
	"barclays", // barclays Barclays Bank PLC
	"bargains", // bargains Half Hallow, LLC
	"bauhaus", // bauhaus Werkhaus GmbH
	"bayern", // bayern Bayern Connect GmbH
	"bbc", // bbc British Broadcasting Corporation
	"bbva", // bbva BANCO BILBAO VIZCAYA ARGENTARIA, S.A.
	"bcn", // bcn Municipi de Barcelona
	"beats", // beats Beats Electronics, LLC
	"beer", // beer Top Level Domain Holdings Limited
	"bentley", // bentley Bentley Motors Limited
	"berlin", // berlin dotBERLIN GmbH &amp; Co. KG
	"best", // best BestTLD Pty Ltd
	"bet", // bet Afilias plc
	"bharti", // bharti Bharti Enterprises (Holding) Private Limited
	"bible", // bible American Bible Society
	"bid", // bid dot Bid Limited
	"bike", // bike Grand Hollow, LLC
	"bing", // bing Microsoft Corporation
	"bingo", // bingo Sand Cedar, LLC
	"bio", // bio STARTING DOT LIMITED
	"biz", // biz Neustar, Inc.
	"black", // black Afilias Limited
	"blackfriday", // blackfriday Uniregistry, Corp.
	"bloomberg", // bloomberg Bloomberg IP Holdings LLC
	"blue", // blue Afilias Limited
	"bms", // bms Bristol-Myers Squibb Company
	"bmw", // bmw Bayerische Motoren Werke Aktiengesellschaft
	"bnl", // bnl Banca Nazionale del Lavoro
	"bnpparibas", // bnpparibas BNP Paribas
	"boats", // boats DERBoats, LLC
	"bom", // bom Núcleo de Informação e Coordenação do Ponto BR - NIC.br
	"bond", // bond Bond University Limited
	"boo", // boo Charleston Road Registry Inc.
	"boots", // boots THE BOOTS COMPANY PLC
	"boutique", // boutique Over Galley, LLC
	"bradesco", // bradesco Banco Bradesco S.A.
	"bridgestone", // bridgestone Bridgestone Corporation
	"broker", // broker DOTBROKER REGISTRY LTD
	"brother", // brother Brother Industries, Ltd.
	"brussels", // brussels DNS.be vzw
	"budapest", // budapest Top Level Domain Holdings Limited
	"build", // build Plan Bee LLC
	"builders", // builders Atomic Madison, LLC
	"business", // business Spring Cross, LLC
	"buzz", // buzz DOTSTRATEGY CO.
	"bzh", // bzh Association www.bzh
	"cab", // cab Half Sunset, LLC
	"cafe", // cafe Pioneer Canyon, LLC
	"cal", // cal Charleston Road Registry Inc.
	"camera", // camera Atomic Maple, LLC
	"camp", // camp Delta Dynamite, LLC
	"cancerresearch", // cancerresearch Australian Cancer Research Foundation
	"canon", // canon Canon Inc.
	"capetown", // capetown ZA Central Registry NPC trading as ZA Central Registry
	"capital", // capital Delta Mill, LLC
	"car", // car Cars Registry Limited
	"caravan", // caravan Caravan International, Inc.
	"cards", // cards Foggy Hollow, LLC
	"care", // care Goose Cross, LLC
	"career", // career dotCareer LLC
	"careers", // careers Wild Corner, LLC
	"cars", // cars Uniregistry, Corp.
	"cartier", // cartier Richemont DNS Inc.
	"casa", // casa Top Level Domain Holdings Limited
	"cash", // cash Delta Lake, LLC
	"casino", // casino Binky Sky, LLC
	"cat", // cat Fundacio puntCAT
	"catering", // catering New Falls. LLC
	"cba", // cba COMMONWEALTH BANK OF AUSTRALIA
	"cbn", // cbn The Christian Broadcasting Network, Inc.
	"ceb", // ceb The Corporate Executive Board Company
	"center", // center Tin Mill, LLC
	"ceo", // ceo CEOTLD Pty Ltd
	"cern", // cern European Organization for Nuclear Research (&quot;CERN&quot;)
	"cfa", // cfa CFA Institute
	"cfd", // cfd DOTCFD REGISTRY LTD
	"chanel", // chanel Chanel International B.V.
	"channel", // channel Charleston Road Registry Inc.
	"chat", // chat Sand Fields, LLC
	"cheap", // cheap Sand Cover, LLC
	"chloe", // chloe Richemont DNS Inc.
	"christmas", // christmas Uniregistry, Corp.
	"chrome", // chrome Charleston Road Registry Inc.
	"church", // church Holly Fileds, LLC
	"cipriani", // cipriani Hotel Cipriani Srl
	"cisco", // cisco Cisco Technology, Inc.
	"citic", // citic CITIC Group Corporation
	"city", // city Snow Sky, LLC
	"claims", // claims Black Corner, LLC
	"cleaning", // cleaning Fox Shadow, LLC
	"click", // click Uniregistry, Corp.
	"clinic", // clinic Goose Park, LLC
	"clothing", // clothing Steel Lake, LLC
	"cloud", // cloud ARUBA S.p.A.
	"club", // club .CLUB DOMAINS, LLC
	"clubmed", // clubmed Club Méditerranée S.A.
	"coach", // coach Koko Island, LLC
	"codes", // codes Puff Willow, LLC
	"coffee", // coffee Trixy Cover, LLC
	"college", // college XYZ.COM LLC
	"cologne", // cologne NetCologne Gesellschaft für Telekommunikation mbH
	"com", // com VeriSign Global Registry Services
	"commbank", // commbank COMMONWEALTH BANK OF AUSTRALIA
	"community", // community Fox Orchard, LLC
	"company", // company Silver Avenue, LLC
	"computer", // computer Pine Mill, LLC
	"condos", // condos Pine House, LLC
	"construction", // construction Fox Dynamite, LLC
	"consulting", // consulting United TLD Holdco, LTD.
	"contractors", // contractors Magic Woods, LLC
	"cooking", // cooking Top Level Domain Holdings Limited
	"cool", // cool Koko Lake, LLC
	"coop", // coop DotCooperation LLC
	"corsica", // corsica Collectivité Territoriale de Corse
	"country", // country Top Level Domain Holdings Limited
	"coupons", // coupons Black Island, LLC
	"courses", // courses OPEN UNIVERSITIES AUSTRALIA PTY LTD
	"credit", // credit Snow Shadow, LLC
	"creditcard", // creditcard Binky Frostbite, LLC
	"cricket", // cricket dot Cricket Limited
	"crown", // crown Crown Equipment Corporation
	"crs", // crs Federated Co-operatives Limited
	"cruises", // cruises Spring Way, LLC
	"csc", // csc Alliance-One Services, Inc.
	"cuisinella", // cuisinella SALM S.A.S.
	"cymru", // cymru Nominet UK
	"cyou", // cyou Beijing Gamease Age Digital Technology Co., Ltd.
	"dabur", // dabur Dabur India Limited
	"dad", // dad Charleston Road Registry Inc.
	"dance", // dance United TLD Holdco Ltd.
	"date", // date dot Date Limited
	"dating", // dating Pine Fest, LLC
	"datsun", // datsun NISSAN MOTOR CO., LTD.
	"day", // day Charleston Road Registry Inc.
	"dclk", // dclk Charleston Road Registry Inc.
	"deals", // deals Sand Sunset, LLC
	"degree", // degree United TLD Holdco, Ltd
	"delivery", // delivery Steel Station, LLC
	"dell", // dell Dell Inc.
	"delta", // delta Delta Air Lines, Inc.
	"democrat", // democrat United TLD Holdco Ltd.
	"dental", // dental Tin Birch, LLC
	"dentist", // dentist United TLD Holdco, Ltd
	"desi", // desi Desi Networks LLC
	"design", // design Top Level Design, LLC
	"dev", // dev Charleston Road Registry Inc.
	"diamonds", // diamonds John Edge, LLC
	"diet", // diet Uniregistry, Corp.
	"digital", // digital Dash Park, LLC
	"direct", // direct Half Trail, LLC
	"directory", // directory Extra Madison, LLC
	"discount", // discount Holly Hill, LLC
	"dnp", // dnp Dai Nippon Printing Co., Ltd.
	"docs", // docs Charleston Road Registry Inc.
	"dog", // dog Koko Mill, LLC
	"doha", // doha Communications Regulatory Authority (CRA)
	"domains", // domains Sugar Cross, LLC
	"doosan", // doosan Doosan Corporation
	"download", // download dot Support Limited
	"drive", // drive Charleston Road Registry Inc.
	"durban", // durban ZA Central Registry NPC trading as ZA Central Registry
	"dvag", // dvag Deutsche Vermögensberatung Aktiengesellschaft DVAG
	"earth", // earth Interlink Co., Ltd.
	"eat", // eat Charleston Road Registry Inc.
	"edu", // edu EDUCAUSE
	"education", // education Brice Way, LLC
	"email", // email Spring Madison, LLC
	"emerck", // emerck Merck KGaA
	"energy", // energy Binky Birch, LLC
	"engineer", // engineer United TLD Holdco Ltd.
	"engineering", // engineering Romeo Canyon
	"enterprises", // enterprises Snow Oaks, LLC
	"epson", // epson Seiko Epson Corporation
	"equipment", // equipment Corn Station, LLC
	"erni", // erni ERNI Group Holding AG
	"esq", // esq Charleston Road Registry Inc.
	"estate", // estate Trixy Park, LLC
	"eurovision", // eurovision European Broadcasting Union (EBU)
	"eus", // eus Puntueus Fundazioa
	"events", // events Pioneer Maple, LLC
	"everbank", // everbank EverBank
	"exchange", // exchange Spring Falls, LLC
	"expert", // expert Magic Pass, LLC
	"exposed", // exposed Victor Beach, LLC
	"express", // express Sea Sunset, LLC
	"fage", // fage Fage International S.A.
	"fail", // fail Atomic Pipe, LLC
	"faith", // faith dot Faith Limited
	"family", // family United TLD Holdco Ltd.
	"fan", // fan Asiamix Digital Ltd
	"fans", // fans Asiamix Digital Limited
	"farm", // farm Just Maple, LLC
	"fashion", // fashion Top Level Domain Holdings Limited
	"feedback", // feedback Top Level Spectrum, Inc.
	"ferrero", // ferrero Ferrero Trading Lux S.A.
	"film", // film Motion Picture Domain Registry Pty Ltd
	"final", // final Núcleo de Informação e Coordenação do Ponto BR - NIC.br
	"finance", // finance Cotton Cypress, LLC
	"financial", // financial Just Cover, LLC
	"firmdale", // firmdale Firmdale Holdings Limited
	"fish", // fish Fox Woods, LLC
	"fishing", // fishing Top Level Domain Holdings Limited
	"fit", // fit Minds + Machines Group Limited
	"fitness", // fitness Brice Orchard, LLC
	"flights", // flights Fox Station, LLC
	"florist", // florist Half Cypress, LLC
	"flowers", // flowers Uniregistry, Corp.
	"flsmidth", // flsmidth FLSmidth A/S
	"fly", // fly Charleston Road Registry Inc.
	"foo", // foo Charleston Road Registry Inc.
	"football", // football Foggy Farms, LLC
	"forex", // forex DOTFOREX REGISTRY LTD
	"forsale", // forsale United TLD Holdco, LLC
	"forum", // forum Fegistry, LLC
	"foundation", // foundation John Dale, LLC
	"frl", // frl FRLregistry B.V.
	"frogans", // frogans OP3FT
	"fund", // fund John Castle, LLC
	"furniture", // furniture Lone Fields, LLC
	"futbol", // futbol United TLD Holdco, Ltd.
	"fyi", // fyi Silver Tigers, LLC
	"gal", // gal Asociación puntoGAL
	"gallery", // gallery Sugar House, LLC
	"game", // game Uniregistry, Corp.
	"garden", // garden Top Level Domain Holdings Limited
	"gbiz", // gbiz Charleston Road Registry Inc.
	"gdn", // gdn Joint Stock Company "Navigation-information systems"
	"gea", // gea GEA Group Aktiengesellschaft
	"gent", // gent COMBELL GROUP NV/SA
	"genting", // genting Resorts World Inc. Pte. Ltd.
	"ggee", // ggee GMO Internet, Inc.
	"gift", // gift Uniregistry, Corp.
	"gifts", // gifts Goose Sky, LLC
	"gives", // gives United TLD Holdco Ltd.
	"giving", // giving Giving Limited
	"glass", // glass Black Cover, LLC
	"gle", // gle Charleston Road Registry Inc.
	"global", // global Dot Global Domain Registry Limited
	"globo", // globo Globo Comunicação e Participações S.A
	"gmail", // gmail Charleston Road Registry Inc.
	"gmo", // gmo GMO Internet, Inc.
	"gmx", // gmx 1&amp;1 Mail &amp; Media GmbH
	"gold", // gold June Edge, LLC
	"goldpoint", // goldpoint YODOBASHI CAMERA CO.,LTD.
	"golf", // golf Lone Falls, LLC
	"goo", // goo NTT Resonant Inc.
	"goog", // goog Charleston Road Registry Inc.
	"google", // google Charleston Road Registry Inc.
	"gop", // gop Republican State Leadership Committee, Inc.
	"gov", // gov General Services Administration Attn: QTDC, 2E08 (.gov Domain Registration)
	"graphics", // graphics Over Madison, LLC
	"gratis", // gratis Pioneer Tigers, LLC
	"green", // green Afilias Limited
	"gripe", // gripe Corn Sunset, LLC
	"group", // group Romeo Town, LLC
	"gucci", // gucci Guccio Gucci S.p.a.
	"guge", // guge Charleston Road Registry Inc.
	"guide", // guide Snow Moon, LLC
	"guitars", // guitars Uniregistry, Corp.
	"guru", // guru Pioneer Cypress, LLC
	"hamburg", // hamburg Hamburg Top-Level-Domain GmbH
	"hangout", // hangout Charleston Road Registry Inc.
	"haus", // haus United TLD Holdco, LTD.
	"healthcare", // healthcare Silver Glen, LLC
	"help", // help Uniregistry, Corp.
	"here", // here Charleston Road Registry Inc.
	"hermes", // hermes Hermes International
	"hiphop", // hiphop Uniregistry, Corp.
	"hitachi", // hitachi Hitachi, Ltd.
	"hiv", // hiv dotHIV gemeinnuetziger e.V.
	"hockey", // hockey Half Willow, LLC
	"holdings", // holdings John Madison, LLC
	"holiday", // holiday Goose Woods, LLC
	"homedepot", // homedepot Homer TLC, Inc.
	"homes", // homes DERHomes, LLC
	"honda", // honda Honda Motor Co., Ltd.
	"horse", // horse Top Level Domain Holdings Limited
	"host", // host DotHost Inc.
	"hosting", // hosting Uniregistry, Corp.
	"hoteles", // hoteles Travel Reservations SRL
	"hotmail", // hotmail Microsoft Corporation
	"house", // house Sugar Park, LLC
	"how", // how Charleston Road Registry Inc.
	"hsbc", // hsbc HSBC Holdings PLC
	"hyundai", // hyundai Hyundai Motor Company
	"ibm", // ibm International Business Machines Corporation
	"icbc", // icbc Industrial and Commercial Bank of China Limited
	"ice", // ice IntercontinentalExchange, Inc.
	"icu", // icu One.com A/S
	"ifm", // ifm ifm electronic gmbh
	"iinet", // iinet Connect West Pty. Ltd.
	"immo", // immo Auburn Bloom, LLC
	"immobilien", // immobilien United TLD Holdco Ltd.
	"industries", // industries Outer House, LLC
	"infiniti", // infiniti NISSAN MOTOR CO., LTD.
	"info", // info Afilias Limited
	"ing", // ing Charleston Road Registry Inc.
	"ink", // ink Top Level Design, LLC
	"institute", // institute Outer Maple, LLC
	"insure", // insure Pioneer Willow, LLC
	"int", // int Internet Assigned Numbers Authority
	"international", // international Wild Way, LLC
	"investments", // investments Holly Glen, LLC
	"ipiranga", // ipiranga Ipiranga Produtos de Petroleo S.A.
	"irish", // irish Dot-Irish LLC
	"ist", // ist Istanbul Metropolitan Municipality
	"istanbul", // istanbul Istanbul Metropolitan Municipality / Medya A.S.
	"itau", // itau Itau Unibanco Holding S.A.
	"iwc", // iwc Richemont DNS Inc.
	"jaguar", // jaguar Jaguar Land Rover Ltd
	"java", // java Oracle Corporation
	"jcb", // jcb JCB Co., Ltd.
	"jetzt", // jetzt New TLD Company AB
	"jewelry", // jewelry Wild Bloom, LLC
	"jlc", // jlc Richemont DNS Inc.
	"jll", // jll Jones Lang LaSalle Incorporated
	"jobs", // jobs Employ Media LLC
	"joburg", // joburg ZA Central Registry NPC trading as ZA Central Registry
	"jprs", // jprs Japan Registry Services Co., Ltd.
	"juegos", // juegos Uniregistry, Corp.
	"kaufen", // kaufen United TLD Holdco Ltd.
	"kddi", // kddi KDDI CORPORATION
	"kia", // kia KIA MOTORS CORPORATION
	"kim", // kim Afilias Limited
	"kinder", // kinder Ferrero Trading Lux S.A.
	"kitchen", // kitchen Just Goodbye, LLC
	"kiwi", // kiwi DOT KIWI LIMITED
	"koeln", // koeln NetCologne Gesellschaft für Telekommunikation mbH
	"komatsu", // komatsu Komatsu Ltd.
	"krd", // krd KRG Department of Information Technology
	"kred", // kred KredTLD Pty Ltd
	"kyoto", // kyoto Academic Institution: Kyoto Jyoho Gakuen
	"lacaixa", // lacaixa CAIXA D&#39;ESTALVIS I PENSIONS DE BARCELONA
	"lancaster", // lancaster LANCASTER
	"land", // land Pine Moon, LLC
	"landrover", // landrover Jaguar Land Rover Ltd
	"lasalle", // lasalle Jones Lang LaSalle Incorporated
	"lat", // lat ECOM-LAC Federación de Latinoamérica y el Caribe para Internet y el Comercio Electrónico
	"latrobe", // latrobe La Trobe University
	"law", // law Minds + Machines Group Limited
	"lawyer", // lawyer United TLD Holdco, Ltd
	"lds", // lds IRI Domain Management, LLC
	"lease", // lease Victor Trail, LLC
	"leclerc", // leclerc A.C.D. LEC Association des Centres Distributeurs Edouard Leclerc
	"legal", // legal Blue Falls, LLC
	"lexus", // lexus TOYOTA MOTOR CORPORATION
	"lgbt", // lgbt Afilias Limited
	"liaison", // liaison Liaison Technologies, Incorporated
	"lidl", // lidl Schwarz Domains und Services GmbH &amp; Co. KG
	"life", // life Trixy Oaks, LLC
	"lighting", // lighting John McCook, LLC
	"limited", // limited Big Fest, LLC
	"limo", // limo Hidden Frostbite, LLC
	"linde", // linde Linde Aktiengesellschaft
	"link", // link Uniregistry, Corp.
	"live", // live United TLD Holdco Ltd.
	"lixil", // lixil LIXIL Group Corporation
	"loan", // loan dot Loan Limited
	"loans", // loans June Woods, LLC
	"lol", // lol Uniregistry, Corp.
	"london", // london Dot London Domains Limited
	"lotte", // lotte Lotte Holdings Co., Ltd.
	"lotto", // lotto Afilias Limited
	"love", // love Merchant Law Group LLP
	"ltd", // ltd Over Corner, LLC
	"ltda", // ltda InterNetX Corp.
	"lupin", // lupin LUPIN LIMITED
	"luxe", // luxe Top Level Domain Holdings Limited
	"luxury", // luxury Luxury Partners LLC
	"madrid", // madrid Comunidad de Madrid
	"maif", // maif Mutuelle Assurance Instituteur France (MAIF)
	"maison", // maison Victor Frostbite, LLC
	"man", // man MAN SE
	"management", // management John Goodbye, LLC
	"mango", // mango PUNTO FA S.L.
	"market", // market Unitied TLD Holdco, Ltd
	"marketing", // marketing Fern Pass, LLC
	"markets", // markets DOTMARKETS REGISTRY LTD
	"marriott", // marriott Marriott Worldwide Corporation
	"mba", // mba Lone Hollow, LLC
	"media", // media Grand Glen, LLC
	"meet", // meet Afilias Limited
	"melbourne", // melbourne The Crown in right of the State of Victoria, represented by its Department of State Development, Business and Innovation
	"meme", // meme Charleston Road Registry Inc.
	"memorial", // memorial Dog Beach, LLC
	"men", // men Exclusive Registry Limited
	"menu", // menu Wedding TLD2, LLC
	"meo", // meo PT Comunicacoes S.A.
	"miami", // miami Top Level Domain Holdings Limited
	"microsoft", // microsoft Microsoft Corporation
	"mil", // mil DoD Network Information Center
	"mini", // mini Bayerische Motoren Werke Aktiengesellschaft
	"mma", // mma MMA IARD
	"mobi", // mobi Afilias Technologies Limited dba dotMobi
	"moda", // moda United TLD Holdco Ltd.
	"moe", // moe Interlink Co., Ltd.
	"moi", // moi Amazon Registry Services, Inc.
	"mom", // mom Uniregistry, Corp.
	"monash", // monash Monash University
	"money", // money Outer McCook, LLC
	"montblanc", // montblanc Richemont DNS Inc.
	"mormon", // mormon IRI Domain Management, LLC (&quot;Applicant&quot;)
	"mortgage", // mortgage United TLD Holdco, Ltd
	"moscow", // moscow Foundation for Assistance for Internet Technologies and Infrastructure Development (FAITID)
	"motorcycles", // motorcycles DERMotorcycles, LLC
	"mov", // mov Charleston Road Registry Inc.
	"movie", // movie New Frostbite, LLC
	"movistar", // movistar Telefónica S.A.
	"mtn", // mtn MTN Dubai Limited
	"mtpc", // mtpc Mitsubishi Tanabe Pharma Corporation
	"mtr", // mtr MTR Corporation Limited
	"museum", // museum Museum Domain Management Association
	"mutuelle", // mutuelle Fédération Nationale de la Mutualité Française
	"nadex", // nadex Nadex Domains, Inc
	"nagoya", // nagoya GMO Registry, Inc.
	"name", // name VeriSign Information Services, Inc.
	"navy", // navy United TLD Holdco Ltd.
	"nec", // nec NEC Corporation
	"net", // net VeriSign Global Registry Services
	"netbank", // netbank COMMONWEALTH BANK OF AUSTRALIA
	"network", // network Trixy Manor, LLC
	"neustar", // neustar NeuStar, Inc.
	"new", // new Charleston Road Registry Inc.
	"news", // news United TLD Holdco Ltd.
	"nexus", // nexus Charleston Road Registry Inc.
	"ngo", // ngo Public Interest Registry
	"nhk", // nhk Japan Broadcasting Corporation (NHK)
	"nico", // nico DWANGO Co., Ltd.
	"ninja", // ninja United TLD Holdco Ltd.
	"nissan", // nissan NISSAN MOTOR CO., LTD.
	"nokia", // nokia Nokia Corporation
	"nra", // nra NRA Holdings Company, INC.
	"nrw", // nrw Minds + Machines GmbH
	"ntt", // ntt NIPPON TELEGRAPH AND TELEPHONE CORPORATION
	"nyc", // nyc The City of New York by and through the New York City Department of Information Technology &amp; Telecommunications
	"obi", // obi OBI Group Holding SE &amp; Co. KGaA
	"office", // office Microsoft Corporation
	"okinawa", // okinawa BusinessRalliart inc.
	"omega", // omega The Swatch Group Ltd
	"one", // one One.com A/S
	"ong", // ong Public Interest Registry
	"onl", // onl I-REGISTRY Ltd., Niederlassung Deutschland
	"online", // online DotOnline Inc.
	"ooo", // ooo INFIBEAM INCORPORATION LIMITED
	"oracle", // oracle Oracle Corporation
	"orange", // orange Orange Brand Services Limited
	"org", // org Public Interest Registry (PIR)
	"organic", // organic Afilias Limited
	"osaka", // osaka Interlink Co., Ltd.
	"otsuka", // otsuka Otsuka Holdings Co., Ltd.
	"ovh", // ovh OVH SAS
	"page", // page Charleston Road Registry Inc.
	"panerai", // panerai Richemont DNS Inc.
	"paris", // paris City of Paris
	"partners", // partners Magic Glen, LLC
	"parts", // parts Sea Goodbye, LLC
	"party", // party Blue Sky Registry Limited
	"pet", // pet Afilias plc
	"pharmacy", // pharmacy National Association of Boards of Pharmacy
	"philips", // philips Koninklijke Philips N.V.
	"photo", // photo Uniregistry, Corp.
	"photography", // photography Sugar Glen, LLC
	"photos", // photos Sea Corner, LLC
	"physio", // physio PhysBiz Pty Ltd
	"piaget", // piaget Richemont DNS Inc.
	"pics", // pics Uniregistry, Corp.
	"pictet", // pictet Pictet Europe S.A.
	"pictures", // pictures Foggy Sky, LLC
	"ping", // ping Ping Registry Provider, Inc.
	"pink", // pink Afilias Limited
	"pizza", // pizza Foggy Moon, LLC
	"place", // place Snow Galley, LLC
	"play", // play Charleston Road Registry Inc.
	"playstation", // playstation Sony Computer Entertainment Inc.
	"plumbing", // plumbing Spring Tigers, LLC
	"plus", // plus Sugar Mill, LLC
	"pohl", // pohl Deutsche Vermögensberatung Aktiengesellschaft DVAG
	"poker", // poker Afilias Domains No. 5 Limited
	"porn", // porn ICM Registry PN LLC
	"post", // post Universal Postal Union
	"praxi", // praxi Praxi S.p.A.
	"press", // press DotPress Inc.
	"pro", // pro Registry Services Corporation dba RegistryPro
	"prod", // prod Charleston Road Registry Inc.
	"productions", // productions Magic Birch, LLC
	"prof", // prof Charleston Road Registry Inc.
	"properties", // properties Big Pass, LLC
	"property", // property Uniregistry, Corp.
	"protection", // protection XYZ.COM LLC
	"pub", // pub United TLD Holdco Ltd.
	"qpon", // qpon dotCOOL, Inc.
	"quebec", // quebec PointQuébec Inc
	"racing", // racing Premier Registry Limited
	"realtor", // realtor Real Estate Domains LLC
	"realty", // realty Fegistry, LLC
	"recipes", // recipes Grand Island, LLC
	"red", // red Afilias Limited
	"redstone", // redstone Redstone Haute Couture Co., Ltd.
	"rehab", // rehab United TLD Holdco Ltd.
	"reise", // reise Foggy Way, LLC
	"reisen", // reisen New Cypress, LLC
	"reit", // reit National Association of Real Estate Investment Trusts, Inc.
	"ren", // ren Beijing Qianxiang Wangjing Technology Development Co., Ltd.
	"rent", // rent XYZ.COM LLC
	"rentals", // rentals Big Hollow,LLC
	"repair", // repair Lone Sunset, LLC
	"report", // report Binky Glen, LLC
	"republican", // republican United TLD Holdco Ltd.
	"rest", // rest Punto 2012 Sociedad Anonima Promotora de Inversion de Capital Variable
	"restaurant", // restaurant Snow Avenue, LLC
	"review", // review dot Review Limited
	"reviews", // reviews United TLD Holdco, Ltd.
	"rich", // rich I-REGISTRY Ltd., Niederlassung Deutschland
	"ricoh", // ricoh Ricoh Company, Ltd.
	"rio", // rio Empresa Municipal de Informática SA - IPLANRIO
	"rip", // rip United TLD Holdco Ltd.
	"rocher", // rocher Ferrero Trading Lux S.A.
	"rocks", // rocks United TLD Holdco, LTD.
	"rodeo", // rodeo Top Level Domain Holdings Limited
	"rsvp", // rsvp Charleston Road Registry Inc.
	"ruhr", // ruhr regiodot GmbH &amp; Co. KG
	"run", // run Snow Park, LLC
	"rwe", // rwe RWE AG
	"ryukyu", // ryukyu BusinessRalliart inc.
	"saarland", // saarland dotSaarland GmbH
	"sakura", // sakura SAKURA Internet Inc.
	"sale", // sale United TLD Holdco, Ltd
	"samsung", // samsung SAMSUNG SDS CO., LTD
	"sandvik", // sandvik Sandvik AB
	"sandvikcoromant", // sandvikcoromant Sandvik AB
	"sanofi", // sanofi Sanofi
	"sap", // sap SAP AG
	"sapo", // sapo PT Comunicacoes S.A.
	"sarl", // sarl Delta Orchard, LLC
	"saxo", // saxo Saxo Bank A/S
	"sbs", // sbs SPECIAL BROADCASTING SERVICE CORPORATION
	"sca", // sca SVENSKA CELLULOSA AKTIEBOLAGET SCA (publ)
	"scb", // scb The Siam Commercial Bank Public Company Limited (&quot;SCB&quot;)
	"schmidt", // schmidt SALM S.A.S.
	"scholarships", // scholarships Scholarships.com, LLC
	"school", // school Little Galley, LLC
	"schule", // schule Outer Moon, LLC
	"schwarz", // schwarz Schwarz Domains und Services GmbH &amp; Co. KG
	"science", // science dot Science Limited
	"scor", // scor SCOR SE
	"scot", // scot Dot Scot Registry Limited
	"seat", // seat SEAT, S.A. (Sociedad Unipersonal)
	"security", // security XYZ.COM LLC
	"seek", // seek Seek Limited
	"sener", // sener Sener Ingeniería y Sistemas, S.A.
	"services", // services Fox Castle, LLC
	"seven", // seven Seven West Media Ltd
	"sew", // sew SEW-EURODRIVE GmbH &amp; Co KG
	"sex", // sex ICM Registry SX LLC
	"sexy", // sexy Uniregistry, Corp.
	"shiksha", // shiksha Afilias Limited
	"shoes", // shoes Binky Galley, LLC
	"show", // show Snow Beach, LLC
	"shriram", // shriram Shriram Capital Ltd.
	"singles", // singles Fern Madison, LLC
	"site", // site DotSite Inc.
	"ski", // ski STARTING DOT LIMITED
	"sky", // sky Sky International AG
	"skype", // skype Microsoft Corporation
	"sncf", // sncf SNCF (Société Nationale des Chemins de fer Francais)
	"soccer", // soccer Foggy Shadow, LLC
	"social", // social United TLD Holdco Ltd.
	"software", // software United TLD Holdco, Ltd
	"sohu", // sohu Sohu.com Limited
	"solar", // solar Ruby Town, LLC
	"solutions", // solutions Silver Cover, LLC
	"sony", // sony Sony Corporation
	"soy", // soy Charleston Road Registry Inc.
	"space", // space DotSpace Inc.
	"spiegel", // spiegel SPIEGEL-Verlag Rudolf Augstein GmbH &amp; Co. KG
	"spreadbetting", // spreadbetting DOTSPREADBETTING REGISTRY LTD
	"srl", // srl InterNetX Corp.
	"stada", // stada STADA Arzneimittel AG
	"starhub", // starhub StarHub Limited
	"statoil", // statoil Statoil ASA
	"stc", // stc Saudi Telecom Company
	"stcgroup", // stcgroup Saudi Telecom Company
	"stockholm", // stockholm Stockholms kommun
	"studio", // studio United TLD Holdco Ltd.
	"study", // study OPEN UNIVERSITIES AUSTRALIA PTY LTD
	"style", // style Binky Moon, LLC
	"sucks", // sucks Vox Populi Registry Ltd.
	"supplies", // supplies Atomic Fields, LLC
	"supply", // supply Half Falls, LLC
	"support", // support Grand Orchard, LLC
	"surf", // surf Top Level Domain Holdings Limited
	"surgery", // surgery Tin Avenue, LLC
	"suzuki", // suzuki SUZUKI MOTOR CORPORATION
	"swatch", // swatch The Swatch Group Ltd
	"swiss", // swiss Swiss Confederation
	"sydney", // sydney State of New South Wales, Department of Premier and Cabinet
	"systems", // systems Dash Cypress, LLC
	"taipei", // taipei Taipei City Government
	"tatamotors", // tatamotors Tata Motors Ltd
	"tatar", // tatar Limited Liability Company &quot;Coordination Center of Regional Domain of Tatarstan Republic&quot;
	"tattoo", // tattoo Uniregistry, Corp.
	"tax", // tax Storm Orchard, LLC
	"taxi", // taxi Pine Falls, LLC
	"team", // team Atomic Lake, LLC
	"tech", // tech Dot Tech LLC
	"technology", // technology Auburn Falls, LLC
	"tel", // tel Telnic Ltd.
	"telefonica", // telefonica Telefónica S.A.
	"temasek", // temasek Temasek Holdings (Private) Limited
	"tennis", // tennis Cotton Bloom, LLC
	"thd", // thd Homer TLC, Inc.
	"theater", // theater Blue Tigers, LLC
	"theatre", // theatre XYZ.COM LLC
	"tickets", // tickets Accent Media Limited
	"tienda", // tienda Victor Manor, LLC
	"tips", // tips Corn Willow, LLC
	"tires", // tires Dog Edge, LLC
	"tirol", // tirol punkt Tirol GmbH
	"today", // today Pearl Woods, LLC
	"tokyo", // tokyo GMO Registry, Inc.
	"tools", // tools Pioneer North, LLC
	"top", // top Jiangsu Bangning Science &amp; Technology Co.,Ltd.
	"toray", // toray Toray Industries, Inc.
	"toshiba", // toshiba TOSHIBA Corporation
	"tours", // tours Sugar Station, LLC
	"town", // town Koko Moon, LLC
	"toyota", // toyota TOYOTA MOTOR CORPORATION
	"toys", // toys Pioneer Orchard, LLC
	"trade", // trade Elite Registry Limited
	"trading", // trading DOTTRADING REGISTRY LTD
	"training", // training Wild Willow, LLC
	"travel", // travel Tralliance Registry Management Company, LLC.
	"trust", // trust Artemis Internet Inc
	"tui", // tui TUI AG
	"ubs", // ubs UBS AG
	"university", // university Little Station, LLC
	"uno", // uno Dot Latin LLC
	"uol", // uol UBN INTERNET LTDA.
	"vacations", // vacations Atomic Tigers, LLC
	"vegas", // vegas Dot Vegas, Inc.
	"ventures", // ventures Binky Lake, LLC
	"versicherung", // versicherung dotversicherung-registry GmbH
	"vet", // vet United TLD Holdco, Ltd
	"viajes", // viajes Black Madison, LLC
	"video", // video United TLD Holdco, Ltd
	"villas", // villas New Sky, LLC
	"vin", // vin Holly Shadow, LLC
	"virgin", // virgin Virgin Enterprises Limited
	"vision", // vision Koko Station, LLC
	"vista", // vista Vistaprint Limited
	"vistaprint", // vistaprint Vistaprint Limited
	"viva", // viva Saudi Telecom Company
	"vlaanderen", // vlaanderen DNS.be vzw
	"vodka", // vodka Top Level Domain Holdings Limited
	"vote", // vote Monolith Registry LLC
	"voting", // voting Valuetainment Corp.
	"voto", // voto Monolith Registry LLC
	"voyage", // voyage Ruby House, LLC
	"wales", // wales Nominet UK
	"walter", // walter Sandvik AB
	"wang", // wang Zodiac Registry Limited
	"watch", // watch Sand Shadow, LLC
	"webcam", // webcam dot Webcam Limited
	"website", // website DotWebsite Inc.
	"wed", // wed Atgron, Inc.
	"wedding", // wedding Top Level Domain Holdings Limited
	"weir", // weir Weir Group IP Limited
	"whoswho", // whoswho Who&#39;s Who Registry
	"wien", // wien punkt.wien GmbH
	"wiki", // wiki Top Level Design, LLC
	"williamhill", // williamhill William Hill Organization Limited
	"win", // win First Registry Limited
	"windows", // windows Microsoft Corporation
	"wine", // wine June Station, LLC
	"wme", // wme William Morris Endeavor Entertainment, LLC
	"work", // work Top Level Domain Holdings Limited
	"works", // works Little Dynamite, LLC
	"world", // world Bitter Fields, LLC
	"wtc", // wtc World Trade Centers Association, Inc.
	"wtf", // wtf Hidden Way, LLC
	"xbox", // xbox Microsoft Corporation
	"xerox", // xerox Xerox DNHC LLC
	"xin", // xin Elegant Leader Limited
	"xn--11b4c3d", // कॉम VeriSign Sarl
	"xn--1qqw23a", // 佛山 Guangzhou YU Wei Information Technology Co., Ltd.
	"xn--30rr7y", // 慈善 Excellent First Limited
	"xn--3bst00m", // 集团 Eagle Horizon Limited
	"xn--3ds443g", // 在线 TLD REGISTRY LIMITED
	"xn--3pxu8k", // 点看 VeriSign Sarl
	"xn--42c2d9a", // คอม VeriSign Sarl
	"xn--45q11c", // 八卦 Zodiac Scorpio Limited
	"xn--4gbrim", // موقع Suhub Electronic Establishment
	"xn--55qw42g", // 公益 China Organizational Name Administration Center
	"xn--55qx5d", // 公司 Computer Network Information Center of Chinese Academy of Sciences （China Internet Network Information Center）
	"xn--6frz82g", // 移动 Afilias Limited
	"xn--6qq986b3xl", // 我爱你 Tycoon Treasure Limited
	"xn--80adxhks", // москва Foundation for Assistance for Internet Technologies and Infrastructure Development (FAITID)
	"xn--80asehdb", // онлайн CORE Association
	"xn--80aswg", // сайт CORE Association
	"xn--9dbq2a", // קום VeriSign Sarl
	"xn--9et52u", // 时尚 RISE VICTORY LIMITED
	"xn--b4w605ferd", // 淡马锡 Temasek Holdings (Private) Limited
	"xn--c1avg", // орг Public Interest Registry
	"xn--c2br7g", // नेट VeriSign Sarl
	"xn--cg4bki", // 삼성 SAMSUNG SDS CO., LTD
	"xn--czr694b", // 商标 HU YI GLOBAL INFORMATION RESOURCES(HOLDING) COMPANY.HONGKONG LIMITED
	"xn--czrs0t", // 商店 Wild Island, LLC
	"xn--czru2d", // 商城 Zodiac Aquarius Limited
	"xn--d1acj3b", // дети The Foundation for Network Initiatives “The Smart Internet”
	"xn--efvy88h", // 新闻 Xinhua News Agency Guangdong Branch 新华通讯社广东分社
	"xn--estv75g", // 工行 Industrial and Commercial Bank of China Limited
	"xn--fhbei", // كوم VeriSign Sarl
	"xn--fiq228c5hs", // 中文网 TLD REGISTRY LIMITED
	"xn--fiq64b", // 中信 CITIC Group Corporation
	"xn--fjq720a", // 娱乐 Will Bloom, LLC
	"xn--flw351e", // 谷歌 Charleston Road Registry Inc.
	"xn--hxt814e", // 网店 Zodiac Libra Limited
	"xn--i1b6b1a6a2e", // संगठन Public Interest Registry
	"xn--imr513n", // 餐厅 HU YI GLOBAL INFORMATION RESOURCES (HOLDING) COMPANY. HONGKONG LIMITED
	"xn--io0a7i", // 网络 Computer Network Information Center of Chinese Academy of Sciences （China Internet Network Information Center）
	"xn--j1aef", // ком VeriSign Sarl
	"xn--kcrx77d1x4a", // 飞利浦 Koninklijke Philips N.V.
	"xn--kput3i", // 手机 Beijing RITT-Net Technology Development Co., Ltd
	"xn--mgba3a3ejt", // ارامكو Aramco Services Company
	"xn--mgbab2bd", // بازار CORE Association
	"xn--mk1bu44c", // 닷컴 VeriSign Sarl
	"xn--mxtq1m", // 政府 Net-Chinese Co., Ltd.
	"xn--ngbc5azd", // شبكة International Domain Registry Pty. Ltd.
	"xn--nqv7f", // 机构 Public Interest Registry
	"xn--nqv7fs00ema", // 组织机构 Public Interest Registry
	"xn--nyqy26a", // 健康 Stable Tone Limited
	"xn--p1acf", // рус Rusnames Limited
	"xn--pssy2u", // 大拿 VeriSign Sarl
	"xn--q9jyb4c", // みんな Charleston Road Registry Inc.
	"xn--qcka1pmc", // グーグル Charleston Road Registry Inc.
	"xn--rhqv96g", // 世界 Stable Tone Limited
	"xn--ses554g", // 网址 KNET Co., Ltd
	"xn--t60b56a", // 닷넷 VeriSign Sarl
	"xn--tckwe", // コム VeriSign Sarl
	"xn--unup4y", // 游戏 Spring Fields, LLC
	"xn--vermgensberater-ctb", // VERMöGENSBERATER Deutsche Vermögensberatung Aktiengesellschaft DVAG
	"xn--vermgensberatung-pwb", // VERMöGENSBERATUNG Deutsche Vermögensberatung Aktiengesellschaft DVAG
	"xn--vhquv", // 企业 Dash McCook, LLC
	"xn--vuq861b", // 信息 Beijing Tele-info Network Technology Co., Ltd.
	"xn--xhq521b", // 广东 Guangzhou YU Wei Information Technology Co., Ltd.
	"xn--zfr164b", // 政务 China Organizational Name Administration Center
	"xperia", // xperia Sony Mobile Communications AB
	"xxx", // xxx ICM Registry LLC
	"xyz", // xyz XYZ.COM LLC
	"yachts", // yachts DERYachts, LLC
	"yamaxun", // yamaxun Amazon Registry Services, Inc.
	"yandex", // yandex YANDEX, LLC
	"yodobashi", // yodobashi YODOBASHI CAMERA CO.,LTD.
	"yoga", // yoga Top Level Domain Holdings Limited
	"yokohama", // yokohama GMO Registry, Inc.
	"youtube", // youtube Charleston Road Registry Inc.
	"zara", // zara Industria de Diseño Textil, S.A. (INDITEX, S.A.)
	"zip", // zip Charleston Road Registry Inc.
	"zone", // zone Outer Falls, LLC
	"zuerich"];

	// WARNING: this array MUST be sorted, otherwise it cannot be searched reliably using binary search
	var countryCodeTlds = exports.countryCodeTlds = ["ac", // Ascension Island
	"ad", // Andorra
	"ae", // United Arab Emirates
	"af", // Afghanistan
	"ag", // Antigua and Barbuda
	"ai", // Anguilla
	"al", // Albania
	"am", // Armenia
	//        "an",                 // Netherlands Antilles (retired)
	"ao", // Angola
	"aq", // Antarctica
	"ar", // Argentina
	"as", // American Samoa
	"at", // Austria
	"au", // Australia (includes Ashmore and Cartier Islands and Coral Sea Islands)
	"aw", // Aruba
	"ax", // Åland
	"az", // Azerbaijan
	"ba", // Bosnia and Herzegovina
	"bb", // Barbados
	"bd", // Bangladesh
	"be", // Belgium
	"bf", // Burkina Faso
	"bg", // Bulgaria
	"bh", // Bahrain
	"bi", // Burundi
	"bj", // Benin
	"bm", // Bermuda
	"bn", // Brunei Darussalam
	"bo", // Bolivia
	"br", // Brazil
	"bs", // Bahamas
	"bt", // Bhutan
	"bv", // Bouvet Island
	"bw", // Botswana
	"by", // Belarus
	"bz", // Belize
	"ca", // Canada
	"cc", // Cocos (Keeling) Islands
	"cd", // Democratic Republic of the Congo (formerly Zaire)
	"cf", // Central African Republic
	"cg", // Republic of the Congo
	"ch", // Switzerland
	"ci", // Côte d'Ivoire
	"ck", // Cook Islands
	"cl", // Chile
	"cm", // Cameroon
	"cn", // China, mainland
	"co", // Colombia
	"cr", // Costa Rica
	"cu", // Cuba
	"cv", // Cape Verde
	"cw", // Curaçao
	"cx", // Christmas Island
	"cy", // Cyprus
	"cz", // Czech Republic
	"de", // Germany
	"dj", // Djibouti
	"dk", // Denmark
	"dm", // Dominica
	"do", // Dominican Republic
	"dz", // Algeria
	"ec", // Ecuador
	"ee", // Estonia
	"eg", // Egypt
	"er", // Eritrea
	"es", // Spain
	"et", // Ethiopia
	"eu", // European Union
	"fi", // Finland
	"fj", // Fiji
	"fk", // Falkland Islands
	"fm", // Federated States of Micronesia
	"fo", // Faroe Islands
	"fr", // France
	"ga", // Gabon
	"gb", // Great Britain (United Kingdom)
	"gd", // Grenada
	"ge", // Georgia
	"gf", // French Guiana
	"gg", // Guernsey
	"gh", // Ghana
	"gi", // Gibraltar
	"gl", // Greenland
	"gm", // The Gambia
	"gn", // Guinea
	"gp", // Guadeloupe
	"gq", // Equatorial Guinea
	"gr", // Greece
	"gs", // South Georgia and the South Sandwich Islands
	"gt", // Guatemala
	"gu", // Guam
	"gw", // Guinea-Bissau
	"gy", // Guyana
	"hk", // Hong Kong
	"hm", // Heard Island and McDonald Islands
	"hn", // Honduras
	"hr", // Croatia (Hrvatska)
	"ht", // Haiti
	"hu", // Hungary
	"id", // Indonesia
	"ie", // Ireland (Éire)
	"il", // Israel
	"im", // Isle of Man
	"in", // India
	"io", // British Indian Ocean Territory
	"iq", // Iraq
	"ir", // Iran
	"is", // Iceland
	"it", // Italy
	"je", // Jersey
	"jm", // Jamaica
	"jo", // Jordan
	"jp", // Japan
	"ke", // Kenya
	"kg", // Kyrgyzstan
	"kh", // Cambodia (Khmer)
	"ki", // Kiribati
	"km", // Comoros
	"kn", // Saint Kitts and Nevis
	"kp", // North Korea
	"kr", // South Korea
	"kw", // Kuwait
	"ky", // Cayman Islands
	"kz", // Kazakhstan
	"la", // Laos (currently being marketed as the official domain for Los Angeles)
	"lb", // Lebanon
	"lc", // Saint Lucia
	"li", // Liechtenstein
	"lk", // Sri Lanka
	"lr", // Liberia
	"ls", // Lesotho
	"lt", // Lithuania
	"lu", // Luxembourg
	"lv", // Latvia
	"ly", // Libya
	"ma", // Morocco
	"mc", // Monaco
	"md", // Moldova
	"me", // Montenegro
	"mg", // Madagascar
	"mh", // Marshall Islands
	"mk", // Republic of Macedonia
	"ml", // Mali
	"mm", // Myanmar
	"mn", // Mongolia
	"mo", // Macau
	"mp", // Northern Mariana Islands
	"mq", // Martinique
	"mr", // Mauritania
	"ms", // Montserrat
	"mt", // Malta
	"mu", // Mauritius
	"mv", // Maldives
	"mw", // Malawi
	"mx", // Mexico
	"my", // Malaysia
	"mz", // Mozambique
	"na", // Namibia
	"nc", // New Caledonia
	"ne", // Niger
	"nf", // Norfolk Island
	"ng", // Nigeria
	"ni", // Nicaragua
	"nl", // Netherlands
	"no", // Norway
	"np", // Nepal
	"nr", // Nauru
	"nu", // Niue
	"nz", // New Zealand
	"om", // Oman
	"pa", // Panama
	"pe", // Peru
	"pf", // French Polynesia With Clipperton Island
	"pg", // Papua New Guinea
	"ph", // Philippines
	"pk", // Pakistan
	"pl", // Poland
	"pm", // Saint-Pierre and Miquelon
	"pn", // Pitcairn Islands
	"pr", // Puerto Rico
	"ps", // Palestinian territories (PA-controlled West Bank and Gaza Strip)
	"pt", // Portugal
	"pw", // Palau
	"py", // Paraguay
	"qa", // Qatar
	"re", // Réunion
	"ro", // Romania
	"rs", // Serbia
	"ru", // Russia
	"rw", // Rwanda
	"sa", // Saudi Arabia
	"sb", // Solomon Islands
	"sc", // Seychelles
	"sd", // Sudan
	"se", // Sweden
	"sg", // Singapore
	"sh", // Saint Helena
	"si", // Slovenia
	"sj", // Svalbard and Jan Mayen Islands Not in use (Norwegian dependencies; see .no)
	"sk", // Slovakia
	"sl", // Sierra Leone
	"sm", // San Marino
	"sn", // Senegal
	"so", // Somalia
	"sr", // Suriname
	"st", // São Tomé and Príncipe
	"su", // Soviet Union (deprecated)
	"sv", // El Salvador
	"sx", // Sint Maarten
	"sy", // Syria
	"sz", // Swaziland
	"tc", // Turks and Caicos Islands
	"td", // Chad
	"tf", // French Southern and Antarctic Lands
	"tg", // Togo
	"th", // Thailand
	"tj", // Tajikistan
	"tk", // Tokelau
	"tl", // East Timor (deprecated old code)
	"tm", // Turkmenistan
	"tn", // Tunisia
	"to", // Tonga
	//        "tp",                 // East Timor (Retired)
	"tr", // Turkey
	"tt", // Trinidad and Tobago
	"tv", // Tuvalu
	"tw", // Taiwan, Republic of China
	"tz", // Tanzania
	"ua", // Ukraine
	"ug", // Uganda
	"uk", // United Kingdom
	"us", // United States of America
	"uy", // Uruguay
	"uz", // Uzbekistan
	"va", // Vatican City State
	"vc", // Saint Vincent and the Grenadines
	"ve", // Venezuela
	"vg", // British Virgin Islands
	"vi", // U.S. Virgin Islands
	"vn", // Vietnam
	"vu", // Vanuatu
	"wf", // Wallis and Futuna
	"ws", // Samoa (formerly Western Samoa)
	"xn--3e0b707e", // 한국 KISA (Korea Internet &amp; Security Agency)
	"xn--45brj9c", // ভারত National Internet Exchange of India
	"xn--80ao21a", // қаз Association of IT Companies of Kazakhstan
	"xn--90a3ac", // срб Serbian National Internet Domain Registry (RNIDS)
	"xn--90ais", // ??? Reliable Software Inc.
	"xn--clchc0ea0b2g2a9gcd", // சிங்கப்பூர் Singapore Network Information Centre (SGNIC) Pte Ltd
	"xn--d1alf", // мкд Macedonian Academic Research Network Skopje
	"xn--fiqs8s", // 中国 China Internet Network Information Center
	"xn--fiqz9s", // 中國 China Internet Network Information Center
	"xn--fpcrj9c3d", // భారత్ National Internet Exchange of India
	"xn--fzc2c9e2c", // ලංකා LK Domain Registry
	"xn--gecrj9c", // ભારત National Internet Exchange of India
	"xn--h2brj9c", // भारत National Internet Exchange of India
	"xn--j1amh", // укр Ukrainian Network Information Centre (UANIC), Inc.
	"xn--j6w193g", // 香港 Hong Kong Internet Registration Corporation Ltd.
	"xn--kprw13d", // 台湾 Taiwan Network Information Center (TWNIC)
	"xn--kpry57d", // 台灣 Taiwan Network Information Center (TWNIC)
	"xn--l1acc", // мон Datacom Co.,Ltd
	"xn--lgbbat1ad8j", // الجزائر CERIST
	"xn--mgb9awbf", // عمان Telecommunications Regulatory Authority (TRA)
	"xn--mgba3a4f16a", // ایران Institute for Research in Fundamental Sciences (IPM)
	"xn--mgbaam7a8h", // امارات Telecommunications Regulatory Authority (TRA)
	"xn--mgbayh7gpa", // الاردن National Information Technology Center (NITC)
	"xn--mgbbh1a71e", // بھارت National Internet Exchange of India
	"xn--mgbc0a9azcg", // المغرب Agence Nationale de Réglementation des Télécommunications (ANRT)
	"xn--mgberp4a5d4ar", // السعودية Communications and Information Technology Commission
	"xn--mgbpl2fh", // ????? Sudan Internet Society
	"xn--mgbtx2b", // عراق Communications and Media Commission (CMC)
	"xn--mgbx4cd0ab", // مليسيا MYNIC Berhad
	"xn--node", // გე Information Technologies Development Center (ITDC)
	"xn--o3cw4h", // ไทย Thai Network Information Center Foundation
	"xn--ogbpf8fl", // سورية National Agency for Network Services (NANS)
	"xn--p1ai", // рф Coordination Center for TLD RU
	"xn--pgbs0dh", // تونس Agence Tunisienne d&#39;Internet
	"xn--qxam", // ελ ICS-FORTH GR
	"xn--s9brj9c", // ਭਾਰਤ National Internet Exchange of India
	"xn--wgbh1c", // مصر National Telecommunication Regulatory Authority - NTRA
	"xn--wgbl6a", // قطر Communications Regulatory Authority
	"xn--xkc2al3hye2a", // இலங்கை LK Domain Registry
	"xn--xkc2dl3a5ee0h", // இந்தியா National Internet Exchange of India
	"xn--y9a3aq", // ??? Internet Society
	"xn--yfro4i67o", // 新加坡 Singapore Network Information Centre (SGNIC) Pte Ltd
	"xn--ygbi2ammx", // فلسطين Ministry of Telecom &amp; Information Technology (MTIT)
	"ye", // Yemen
	"yt", // Mayotte
	"za", // South Africa
	"zm", // Zambia
	"zw"];

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	/** Highest positive signed 32-bit float value */
	const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	const base = 36;
	const tMin = 1;
	const tMax = 26;
	const skew = 38;
	const damp = 700;
	const initialBias = 72;
	const initialN = 128; // 0x80
	const delimiter = '-'; // '\x2D'

	/** Regular expressions */
	const regexPunycode = /^xn--/;
	const regexNonASCII = /[^\x20-\x7E]/; // unprintable ASCII chars + non-ASCII chars
	const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

	/** Error messages */
	const errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	};

	/** Convenience shortcuts */
	const baseMinusTMin = base - tMin;
	const floor = Math.floor;
	const stringFromCharCode = String.fromCharCode;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		const result = [];
		let length = array.length;
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		const parts = string.split('@');
		let result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		const labels = string.split('.');
		const encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		const output = [];
		let counter = 0;
		const length = string.length;
		while (counter < length) {
			const value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// It's a high surrogate, and there is a next character.
				const extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// It's an unmatched surrogate; only append this code unit, in case the
					// next code unit is the high surrogate of a surrogate pair.
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	const ucs2encode = array => String.fromCodePoint(...array);

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	const basicToDigit = function(codePoint) {
		if (codePoint - 0x30 < 0x0A) {
			return codePoint - 0x16;
		}
		if (codePoint - 0x41 < 0x1A) {
			return codePoint - 0x41;
		}
		if (codePoint - 0x61 < 0x1A) {
			return codePoint - 0x61;
		}
		return base;
	};

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	const digitToBasic = function(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	};

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	const adapt = function(delta, numPoints, firstTime) {
		let k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	};

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	const decode = function(input) {
		// Don't use UCS-2.
		const output = [];
		const inputLength = input.length;
		let i = 0;
		let n = initialN;
		let bias = initialBias;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		let basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (let j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			let oldi = i;
			for (let w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				const digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				const baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			const out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output.
			output.splice(i++, 0, n);

		}

		return String.fromCodePoint(...output);
	};

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	const encode = function(input) {
		const output = [];

		// Convert the input in UCS-2 to an array of Unicode code points.
		input = ucs2decode(input);

		// Cache the length.
		let inputLength = input.length;

		// Initialize the state.
		let n = initialN;
		let delta = 0;
		let bias = initialBias;

		// Handle the basic code points.
		for (const currentValue of input) {
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		let basicLength = output.length;
		let handledCPCount = basicLength;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string with a delimiter unless it's empty.
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			let m = maxInt;
			for (const currentValue of input) {
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow.
			const handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (const currentValue of input) {
				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}
				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer.
					let q = delta;
					for (let k = base; /* no condition */; k += base) {
						const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						const qMinusT = q - t;
						const baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	};

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	const toUnicode = function(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	};

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	const toASCII = function(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	};

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	const punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '2.0.0',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	module.exports = punycode;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.EmailValidator = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DomainValidator = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EmailValidator = exports.EmailValidator = function () {
		/**
	  * @param allowLocal   Should local addresses be considered valid?
	  * @param allowTld     Should TLDs be allowed?
	  */
		function EmailValidator() {
			var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			var _ref$allowLocal = _ref.allowLocal;
			var allowLocal = _ref$allowLocal === undefined ? false : _ref$allowLocal;
			var _ref$allowTld = _ref.allowTld;
			var allowTld = _ref$allowTld === undefined ? false : _ref$allowTld;

			_classCallCheck(this, EmailValidator);

			//const specialChars = "\\p{Cntrl}\\(\\)<>@,;:'\\\\\\\"\\.\\[\\]" // TODO: \\p{Cntrl}
			var specialChars = "\\(\\)<>@,;:'\\\\\\\"\\.\\[\\]";
			var validChars = "(\\\\.)|[^\\s" + specialChars + "]";
			var quotedUser = "(\"(\\\\\"|[^\"])*\")";
			var word = "((" + validChars + "|')+|" + quotedUser + ")";
			var userRegex = "^\\s*" + word + "(\\." + word + ")*$";
			this._userPattern = new RegExp(userRegex);

			var emailRegex = "^\\s*?(.+)@(.+?)\\s*$";
			this._emailPattern = new RegExp(emailRegex);

			this._domainValidator = new _DomainValidator.DomainValidator({ allowLocal: allowLocal });
			this._allowTld = allowTld;
		}

		_createClass(EmailValidator, [{
			key: "_isValidDomain",
			value: function _isValidDomain(domain) {
				if (this._allowTld) {
					return this._domainValidator.isValid(domain) || domain[0] !== "." && this._domainValidator.isValidTld(domain);
				} else {
					return this._domainValidator.isValid(domain);
				}
			}
		}, {
			key: "_isValidUser",
			value: function _isValidUser(user) {
				if (!user || user.length > 64) {
					return false;
				}

				return user.match(this._userPattern);
			}
		}, {
			key: "isValid",
			value: function isValid(email) {
				if (!email) {
					return false;
				}

				if (email[email.length - 1] === ".") {
					return false;
				}

				var groups = email.match(this._emailPattern);
				if (!groups) {
					return false;
				}

				if (!this._isValidUser(groups[1])) {
					return false;
				}

				if (!this._isValidDomain(groups[2])) {
					return false;
				}

				return true;
			}
		}]);

		return EmailValidator;
	}();

/***/ }
/******/ ]);