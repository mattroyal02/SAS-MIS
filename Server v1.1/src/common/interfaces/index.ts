import { Model } from "sequelize";

//User
interface UserCreationAttributes {
  id: number;
  email: string;
  password: string;
  title: string;
  firstName: string;
  surname: string;
  phoneNumber: string;
  employeeId: string;
  role: string;
}
interface UserAttributes extends UserCreationAttributes {
  reports?: ReportAttributes[];
}
type UserModel = Model<UserAttributes, UserCreationAttributes>;

//Product

interface ProductCreationAttributes {
  id: number;
  name: string;
}
interface ProductAttributes extends ProductCreationAttributes {}
type ProductModel = Model<ProductAttributes, ProductCreationAttributes>;

//Bin Multiplier
interface BinMultiplierCreationAttributes {
  id: number;
  name: string;
  multiplier: number;
}
interface BinMultiplierAttributes extends BinMultiplierCreationAttributes {}
type BinMultiplierModel = Model<
  ProductAttributes,
  BinMultiplierCreationAttributes
>;

//Report
interface ReportCreationAttributes {
  id: number;
  referenceNumber: string;
  employeeEmail: string;
  employeeFirstName: string;
  employeeSurname: string;
  employeePhoneNumber: string;
  employeeId: string;
  shift: string;
  startShiftTime: string;
  endShiftTime: string;

  //BIN1
  bin1: string;
  binStock1: number;
  metersMeasuredBin1: number;

  //BIN2
  bin2: string;
  binStock2: number;
  metersMeasuredBin2: number;

  //BIN3
  bin3: string;
  binStock3: number;
  metersMeasuredBin3: number;

  //BIN4
  bin4: string;
  binStock4: number;
  metersMeasuredBin4: number;

  //BIN5
  bin5: string;
  binStock5: number;
  metersMeasuredBin5: number;

  //BIN6
  bin6: string;
  binStock6: number;
  metersMeasuredBin6: number;

  //BIN7
  bin7: string;
  binStock7: number;
  metersMeasuredBin7: number;

  //BIN8
  bin8: string;
  binStock8: number;
  metersMeasuredBin8: number;

  //BIN9
  bin9: string;
  binStock9: number;
  metersMeasuredBin9: number;

  //BIN10
  bin10: string;
  binStock10: number;
  metersMeasuredBin10: number;

  //BIN11
  bin11: string;
  binStock11: number;
  metersMeasuredBin11: number;

  //BIN12
  bin12: string;
  binStock12: number;
  metersMeasuredBin12: number;

  //BIN13
  bin13: string;
  binStock13: number;
  metersMeasuredBin13: number;

  //BIN14
  bin14: string;
  binStock14: number;
  metersMeasuredBin14: number;

  //BIN15
  bin15: string;
  binStock15: number;
  metersMeasuredBin15: number;

  //BIN16
  bin16: string;
  binStock16: number;
  metersMeasuredBin16: number;

  //BIN17
  bin17: string;
  binStock17: number;
  metersMeasuredBin17: number;

  //BIN18
  bin18: string;
  binStock18: number;
  metersMeasuredBin18: number;

  //BIN19
  bin19: string;
  binStock19: number;
  metersMeasuredBin19: number;

  //BIN20
  bin20: string;
  binStock20: number;
  metersMeasuredBin20: number;

  //BIN21
  bin21: string;
  binStock21: number;
  metersMeasuredBin21: number;

  //BIN22
  bin22: string;
  binStock22: number;
  metersMeasuredBin22: number;

  //BIN23
  bin23: string;
  binStock23: number;
  metersMeasuredBin23: number;

  //Conditioning BIN A1
  binA1: string;
  binStockA1: number;
  metersMeasuredBinA1: number;

  //Conditioning BIN A2
  binA2: string;
  binStockA2: number;
  metersMeasuredBinA2: number;

  //Conditioning BIN A3
  binA3: string;
  binStockA3: number;
  metersMeasuredBinA3: number;

  //Conditioning BIN A4
  binA4: string;
  binStockA4: number;
  metersMeasuredBinA4: number;

  //Conditioning BIN B1
  binB1: string;
  binStockB1: number;
  metersMeasuredBinB1: number;

  //Conditioning BIN B2
  binB2: string;
  binStockB2: number;
  metersMeasuredBinB2: number;

  //Conditioning BIN B3
  binB3: string;
  binStockB3: number;
  metersMeasuredBinB3: number;

  //Conditioning BIN B4
  binB4: string;
  binStockB4: number;
  metersMeasuredBinB4: number;

  //Section A : 1,2,3,4,6,7,8,9,12
  sectionTotalA: number;

  //Section B : 10 & 11
  sectionTotalB: number;

  //Section C : 5,15,13,14,16,17,18
  sectionTotalC: number;

  //Section D : 19,20,21,22,23
  sectionTotalD: number;

  //Section E : A1,A2,A3,A4
  sectionTotalE: number;

  //Section F : B1,B2,B3,B4
  sectionTotalF: number;

  //Section E & F Total
  sectionTotalEF: number;

  //Vitamins

  //In Cage
  bagInCage: number;
  totalWeightInCage: number;

  //Received
  bagReceived: number;
  totalWeightReceived: number;

  //Super in Mill A
  superVitaminUsedMillA: number;
  totalWeightSuperMillA: number;

  //Braai Pap in Mill A
  braaiPapVitaminUsedMillA: number;
  totalWeightBraaiPapMillA: number;

  //Super in Mill B
  superVitaminUsedMillB: number;
  totalWeightSuperMillB: number;

  //Braai Pap in Mill B
  braaiPapVitaminUsedMillB: number;
  totalWeightBraaiPapMillB: number;

  //Mill A Totals Section

  //Intake
  intakeScada: number;
  intakeTotal: number;

  //Screening
  screeningScada: number;
  screeningTotal: number;
  screeningPercentage: number;
  //dirtyMaize
  dirtyMaize: number;
}
interface ReportAttributes extends ReportCreationAttributes {
  userReport?: UserReportAttributes;
}
type ReportModel = Model<ReportAttributes, ReportCreationAttributes>;
//MIll A
interface MillaCreationAttributes {
  id: number;
  Timestamp: string;
  WS2008_TH: number;
  WS2008_TT: number;
  WS2012_TH: number;
  WS2012_TT: number;
  WS4615_TH: number;
  WS4615_TT: number;
  MC2039_TH: number;
  MC2039_TT: number;
  MC2039_LC_LH: number;
  MC2039_LC_TT: number;
  WS2021_TH: number;
  WS2021_TT: number;
  WS4407_TH: number;
  WS4407_TT: number;
  WS4420_TH: number;
  WS4420_TT: number;
  WS4442_TH: number;
  WS4442_TT: number;
  WS4465_TH: number;
  WS4465_TT: number;
  WS4487_TH: number;
  WS4487_TT: number;
  WS4497_TH: number;
  WS4497_TT: number;
  WS4578_TH: number;
  WS4578_TT: number;
  WS4596_TH: number;
  WS4596_TT: number;
  WS6002_TH: number;
  WS6002_TT: number;
  FB117_TH: number;
  FB117_TT: number;
  FB118_TH: number;
  FB118_TT: number;
  FB4605_TH: number;
  FB4605_TT: number;
  FB4606_TH: number;
  FB4606_TT: number;
  FB4007_TH: number;
  FB4007_TT: number;
  FB4008_TH: number;
  FB4008_TT: number;
}
interface MillaAttributes extends MillaCreationAttributes {}
type MillaModel = Model<MillaAttributes, MillaCreationAttributes>;

//Will Repeat this for MIll B

//User-Report
interface UserReportCreationAttributes {
  userId: number;
  ReportId: number;
}
interface UserReportAttributes extends UserReportCreationAttributes {}
type UserReportModel = Model<
  UserReportAttributes,
  UserReportCreationAttributes
>;

export {
  BinMultiplierAttributes,
  BinMultiplierCreationAttributes,
  BinMultiplierModel,
  MillaAttributes,
  MillaCreationAttributes,
  MillaModel,
  //Bin Dips Products
  ProductAttributes,
  ProductCreationAttributes,
  ProductModel,
  //Report
  ReportAttributes,
  ReportCreationAttributes,
  ReportModel,
  //User
  UserAttributes,
  UserCreationAttributes,
  UserModel,
  //UserReport
  UserReportAttributes,
  UserReportCreationAttributes,
  UserReportModel,
};
