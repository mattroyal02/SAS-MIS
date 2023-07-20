import { DataTypes, Sequelize } from "sequelize";
import { Models, modelNames } from "./config";

const getReportModel = (sequelize: Sequelize) => {
  const Report: Models[modelNames.report] = sequelize.define(
    modelNames.report,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      referenceNumber: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      employeeEmail: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      employeeFirstName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      employeeSurname: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      employeePhoneNumber: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      employeeId: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "PMC1",
      },
      shift: { type: DataTypes.TEXT, allowNull: false },
      startShiftTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endShiftTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      //Bin 1
      bin1: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock1: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin1: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 2
      bin2: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock2: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin2: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 3
      bin3: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock3: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin3: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 4
      bin4: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock4: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin4: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 5
      bin5: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock5: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin5: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      // Bin 6
      bin6: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock6: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin6: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 7
      bin7: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock7: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin7: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 8
      bin8: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock8: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin8: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 9
      bin9: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock9: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin9: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 10
      bin10: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock10: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin10: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 11
      bin11: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock11: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin11: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 12
      bin12: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock12: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin12: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 13
      bin13: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock13: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin13: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 14
      bin14: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock14: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin14: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 15
      bin15: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock15: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin15: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 16
      bin16: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock16: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin16: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 17
      bin17: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock17: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin17: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 18
      bin18: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock18: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin18: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 19
      bin19: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock19: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin19: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 20
      bin20: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock20: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin20: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 21
      bin21: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock21: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin21: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 22
      bin22: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock22: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin22: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Bin 23
      bin23: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStock23: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBin23: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Conditioning BIN A1
      binA1: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStockA1: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBinA1: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Conditioning BIN A2
      binA2: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStockA2: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBinA2: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Conditioning BIN A3
      binA3: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStockA3: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBinA3: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Conditioning BIN A4
      binA4: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStockA4: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBinA4: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Conditioning BIN B1
      binB1: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStockB1: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBinB1: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Conditioning BIN B2
      binB2: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStockB2: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBinB2: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Conditioning BIN B3
      binB3: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStockB3: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBinB3: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Conditioning BIN B4
      binB4: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      binStockB4: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metersMeasuredBinB4: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Section Totals
      //Section A
      sectionTotalA: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Section B
      sectionTotalB: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Section C
      sectionTotalC: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Section D
      sectionTotalD: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Section E
      sectionTotalE: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Section F
      sectionTotalF: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      //Section E + F
      sectionTotalEF: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      //Vitamins

      //In Cage
      bagInCage: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalWeightInCage: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      //Received
      bagReceived: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalWeightReceived: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      //Super in Mill A
      superVitaminUsedMillA: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalWeightSuperMillA: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      //Braai Pap in Mill A
      braaiPapVitaminUsedMillA: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalWeightBraaiPapMillA: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      //Super in Mill B
      superVitaminUsedMillB: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalWeightSuperMillB: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      //Braai Pap in Mill B
      braaiPapVitaminUsedMillB: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalWeightBraaiPapMillB: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      //MILL A Totals

      ////Intake
      intakeScada: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      intakeTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      //Screening
      screeningScada: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      screeningTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      screeningPercentage: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      //Dirty Maize
      dirtyMaize: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeValidate: (report) => {
          // Creating reference style YYYYDDMMS#
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, "0");
          const day = String(currentDate.getDate()).padStart(2, "0");

          let shiftSuffix = "";
          if (report.shift === "Shift 1") {
            shiftSuffix = "S1";
          } else if (report.shift === "Shift 2") {
            shiftSuffix = "S2";
          }

          const referenceNumber = `${year}${month}${day}${shiftSuffix}`;
          report.referenceNumber = referenceNumber;
        },
      },
    }
  );

  return Report;
};

export default getReportModel;
