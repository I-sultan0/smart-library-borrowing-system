import { getBorrowHistory } from "../services/HistoryService.js";

export const historyCtrl = async (req, res) => {
  try {
    const history = await getBorrowHistory(req.user._id);

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
