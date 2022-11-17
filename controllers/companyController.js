const companyService = require('../services/companyService');

const getCompanyPage = async (req, res) => {
  try {
    const companyId = req.params.id;
    const companyPage = await companyService.getCompanyPage(companyId);
    res.status(200).json(companyPage);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { getCompanyPage };
