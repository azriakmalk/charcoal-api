const m_users = require("../models/m_users");
const m_level = require("../models/m_level");
const m_item = require("../models/m_item");
const storage = require("../models/storage");
const sequelize = require("../config/database");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.SECRET_KEY;
const { Op } = require("sequelize");
const { raw } = require("body-parser");

module.exports = {
  getDashboard: async (req, res) => {
    try {
      const dataItem = await m_item.findAll({ raw: true });
      const dataStorage = await storage.findAll({ raw: true });

      //restructure
      let raw_materials = [];
      let production_goods = [];
      let total_production_goods = 0;
      let notif;

      dataItem.forEach((item) => {
        let itemStorage = dataStorage.find((data) => data.id_item === item.id);
        if (item.id_category === 1) {
          raw_materials.push({
            ...item,
            weight: itemStorage.total_weight,
          });
        } else {
          total_production_goods += itemStorage.total_weight;
          production_goods.push({
            ...item,
            weight: itemStorage.total_weight,
          });
        }
      });

      res.status(200).json({
        message: "Berhasil Get Dashboard",
        raw_materials,
        production_goods,
        total_production_goods,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error Get Dashboard",
        error,
      });
    }
  },
};
