import { getDashboardData } from "../services/DashboardService.js";

export const dashboardCtrl = async (req, res) => {
  try {
    const data = await getDashboardData(req.user._id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
