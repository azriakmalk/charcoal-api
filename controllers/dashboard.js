const m_item = require("../models/m_item");
const storage = require("../models/storage");

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
          notif = itemStorage.total_weight > 56315 ? `Available stock is safe` : `Available stock (${item.name}) is not safe, make purchases of raw materials`;
          raw_materials.push({
            ...item,
            notif,
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
